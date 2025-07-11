<script lang="ts">
  import { onMount } from 'svelte';

  export let backgroundColor: string = '';

  let section;
  let isDragging = false;
  let startX: number, startY: number;
  let initialLeft = 580,
    initialTop = 428;
  let left = initialLeft;
  let top = initialTop;

  // Inner cut-out (hole) state
  let isInnerDragging = false;
  let innerStartX: number, innerStartY: number;
  let innerInitialLeft = 20,
    innerInitialTop = 50;
  let innerLeft = innerInitialLeft;
  let innerTop = innerInitialTop;
  let innerWidth = 320;
  let innerHeight = 80;

  // SVG size and outer resize state
  let svgWidth = 500;
  let svgHeight = 300;
  let isOuterResizing = false;
  let outerResizeStartX: number,
    outerResizeStartY: number,
    outerInitialWidth: number,
    outerInitialHeight: number;

  // Inner hole resize state
  let isInnerResizing = false;
  let innerResizeStartX: number,
    innerResizeStartY: number,
    innerInitialWidth: number,
    innerInitialHeight: number;

  function handleMouseDown(event: MouseEvent) {
    // prevent dragging if user is interacting with hole drag area
    if ((event.target as HTMLElement).closest('#hole-drag')) return;

    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    left = initialLeft + (event.clientX - startX);
    top = initialTop + (event.clientY - startY);
  }

  function handleMouseUp() {
    isDragging = false;
    initialLeft = left;
    initialTop = top;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  // Inner hole drag handlers
  function handleInnerMouseDown(event: MouseEvent) {
    event.stopPropagation();
    isInnerDragging = true;
    innerStartX = event.clientX;
    innerStartY = event.clientY;
    document.addEventListener('mousemove', handleInnerMouseMove);
    document.addEventListener('mouseup', handleInnerMouseUp);
  }

  function handleInnerMouseMove(event: MouseEvent) {
    if (!isInnerDragging) return;
    let newLeft = innerInitialLeft + (event.clientX - innerStartX);
    let newTop = innerInitialTop + (event.clientY - innerStartY);
    // Constrain within section if needed (you can add bounds here)
    innerLeft = newLeft;
    innerTop = newTop;
  }

  function handleInnerMouseUp() {
    isInnerDragging = false;
    innerInitialLeft = innerLeft;
    innerInitialTop = innerTop;
    document.removeEventListener('mousemove', handleInnerMouseMove);
    document.removeEventListener('mouseup', handleInnerMouseUp);
  }

  // Outer resize handlers
  function startOuterResize(event: MouseEvent) {
    event.stopPropagation();
    isOuterResizing = true;
    outerResizeStartX = event.clientX;
    outerResizeStartY = event.clientY;
    outerInitialWidth = svgWidth;
    outerInitialHeight = svgHeight;
    document.addEventListener('mousemove', handleOuterResize);
    document.addEventListener('mouseup', stopOuterResize);
  }

  function handleOuterResize(event: MouseEvent) {
    if (!isOuterResizing) return;
    let newWidth = outerInitialWidth + (event.clientX - outerResizeStartX);
    let newHeight = outerInitialHeight + (event.clientY - outerResizeStartY);
    svgWidth = Math.max(100, newWidth);
    svgHeight = Math.max(100, newHeight);
    // Constrain inner hole if needed
    if (innerLeft + innerWidth > svgWidth) innerLeft = svgWidth - innerWidth;
    if (innerTop + innerHeight > svgHeight) innerTop = svgHeight - innerHeight;
    if (innerWidth > svgWidth) innerWidth = svgWidth;
    if (innerHeight > svgHeight) innerHeight = svgHeight;
  }

  function stopOuterResize() {
    isOuterResizing = false;
    document.removeEventListener('mousemove', handleOuterResize);
    document.removeEventListener('mouseup', stopOuterResize);
  }

  // Inner hole resize handlers
  function startInnerResize(event: MouseEvent) {
    event.stopPropagation();
    isInnerResizing = true;
    innerResizeStartX = event.clientX;
    innerResizeStartY = event.clientY;
    innerInitialWidth = innerWidth;
    innerInitialHeight = innerHeight;
    document.addEventListener('mousemove', handleInnerResize);
    document.addEventListener('mouseup', stopInnerResize);
  }

  function handleInnerResize(event: MouseEvent) {
    if (!isInnerResizing) return;
    let newWidth = innerInitialWidth + (event.clientX - innerResizeStartX);
    let newHeight = innerInitialHeight + (event.clientY - innerResizeStartY);
    // Constrain to outer bounds
    newWidth = Math.max(20, Math.min(newWidth, svgWidth - innerLeft));
    newHeight = Math.max(20, Math.min(newHeight, svgHeight - innerTop));
    innerWidth = newWidth;
    innerHeight = newHeight;
  }

  function stopInnerResize() {
    isInnerResizing = false;
    document.removeEventListener('mousemove', handleInnerResize);
    document.removeEventListener('mouseup', stopInnerResize);
  }

  onMount(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleInnerMouseMove);
      document.removeEventListener('mouseup', handleInnerMouseUp);
      document.removeEventListener('mousemove', handleOuterResize);
      document.removeEventListener('mouseup', stopOuterResize);
      document.removeEventListener('mousemove', handleInnerResize);
      document.removeEventListener('mouseup', stopInnerResize);
    };
  });
</script>

<!-- SVG container with mask applied -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
  bind:this={section}
  class="absolute rounded-md"
  style="left: {left}px; top: {top}px; width: {svgWidth}px; height: {svgHeight}px; z-index: 10;"
  on:mousedown={handleMouseDown}
>
  <defs>
    <mask id="cutout-mask">
      <rect width="100%" height="100%" fill="white" />
      <rect x={innerLeft} y={innerTop} width={innerWidth} height={innerHeight} fill="black" />
    </mask>
  </defs>

  <!-- Main section with mask -->
  <foreignObject x="0" y="0" width="100%" height="100%" mask="url(#cutout-mask)">
    <div class="h-full w-full" style="background-color: {backgroundColor}"></div>
  </foreignObject>

  <!-- Draggable hole outline (not rendered in mask) -->
  <foreignObject
    id="hole-drag"
    x={innerLeft}
    y={innerTop}
    width={innerWidth}
    height={innerHeight}
    on:mousedown={handleInnerMouseDown}
  >
    <div class="pointer-events-auto relative h-full w-full cursor-move rounded-md">
      <!-- Inner resize handle -->
      <div
        class="absolute bottom-0 right-0 h-5 w-full cursor-se-resize border border-gray-400 bg-white"
        style="border-radius: 2px; background-color: {backgroundColor}"
        on:mousedown={startInnerResize}
      ></div>
    </div>
  </foreignObject>

  <!-- Outer resize handle -->
  <foreignObject x={svgWidth - 16} y={svgHeight - 16} width={16} height={16}>
    <div
      class="pointer-events-auto z-20 h-4 w-4 cursor-se-resize border border-gray-400 bg-white"
      style="border-radius: 3px;"
      on:mousedown={startOuterResize}
    ></div>
  </foreignObject>
</svg>
