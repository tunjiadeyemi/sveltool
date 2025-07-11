<script lang="ts">
  import { notes } from '../stores/notes';

  export let open: boolean = false;
  export let handleClose: () => void = () => {};

  let left = 0;
  let top = 0;
  let isDragging = false;
  let startX: number, startY: number;
  let initialLeft: number, initialTop: number;

  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    initialLeft = left;
    initialTop = top;
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
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
</script>

{#if open}
  <section
    class="absolute z-[1000] mx-auto flex h-[40vh] w-[32vw] flex-col rounded-md bg-white shadow-md"
    style="left: {left}px; top: {top}px;"
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="flex items-center justify-between border-b bg-[#f2f2f2] p-2.5 cursor-move"
      on:mousedown={handleMouseDown}
    >
      <p class="font-medium text-gray-600">Global Notepad</p>
      <button type="button" on:click={handleClose} class="text-2xl">&times;</button>
    </div>

    <section class="h-full p-2">
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <textarea
        bind:value={$notes}
        class="h-full w-full resize-none rounded-lg border border-black/30 p-2 outline-none"
      />
    </section>
  </section>
{/if}
