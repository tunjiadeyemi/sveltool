<script lang="ts">
  export let zoom: number = 2;
  export let lensSize: number = 250;
  export let borderRadius: number = 10;
  export let open: boolean = false;

  let container: HTMLDivElement;
  let visible = false;
  let lensX = 0;
  let lensY = 0;
  let contentX = 0;
  let contentY = 0;
  let dragging = false;
  let initialized = false;

  function getRelativeCoords(event: MouseEvent) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  }

  function startDrag(event: MouseEvent) {
    if (!container || !open) return;
    if (!(event.target as HTMLElement).classList.contains('magnifier-lens')) return;
    dragging = true;
    visible = true;
    moveLens(event);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
  }

  function onDrag(event: MouseEvent) {
    if (!dragging) return;
    moveLens(event);
  }

  function stopDrag() {
    dragging = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
  }

  function moveLens(event: MouseEvent) {
    const { x, y } = getRelativeCoords(event);
    const minX = lensSize / 2;
    const minY = lensSize / 2;
    const maxX = container.offsetWidth - lensSize / 2;
    const maxY = container.offsetHeight - lensSize / 2;
    const cx = Math.max(minX, Math.min(x, maxX));
    const cy = Math.max(minY, Math.min(y, maxY));
    lensX = cx - lensSize / 2;
    lensY = cy - lensSize / 2;
    contentX = -cx * zoom + lensSize / 2;
    contentY = -cy * zoom + lensSize / 2;
  }

  function handleMouseLeave() {
    dragging = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
  }

  // Initialize lens at center when enabled
  $: if (open && container && !initialized) {
    const cx = container.offsetWidth / 2;
    const cy = container.offsetHeight / 2;
    lensX = cx - lensSize / 2;
    lensY = cy - lensSize / 2;
    contentX = -cx * zoom + lensSize / 2;
    contentY = -cy * zoom + lensSize / 2;
    visible = true;
    initialized = true;
  }

  $: if (open) {
    visible = true;
    initialized = false;
  } else {
    visible = false;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={container}
  class="relative w-full"
  on:mousedown={startDrag}
  on:mouseleave={handleMouseLeave}
>
  <slot />

  {#if visible && open}
    <div
      class="magnifier-lens z-50"
      style="--lens-size: {lensSize}px; left: {lensX}px; top: {lensY}px; cursor: {dragging
        ? 'grabbing'
        : 'grab'}; border-radius: {borderRadius}%;"
    >
      <div
        class="magnified-content"
        style="transform: scale({zoom}); left: {contentX}px; top: {contentY}px; width: {container?.offsetWidth}px;"
      >
        <slot />
      </div>
    </div>
  {/if}
</div>

<style>
  .magnifier-lens {
    position: absolute;
    width: var(--lens-size);
    height: var(--lens-size);
    overflow: hidden;
    border-radius: var(--border-radius);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    pointer-events: auto;
    z-index: 100000;
    background-color: white;
    user-select: none;
  }

  .magnified-content {
    position: absolute;
    transform-origin: top left;
    user-select: none;
    pointer-events: none;
  }
</style>
