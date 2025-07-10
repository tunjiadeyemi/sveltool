<script lang="ts">
  import { notes } from '$lib/stores/notes';

  export let handleClose: () => void = () => {};
</script>

<section
  class="absolute left-[35%] top-[15%] z-[1000] mx-auto flex h-[40vh] w-[32vw] flex-col rounded-md border bg-white shadow-md"
>
  <div class="flex items-center justify-between border-b bg-[#f2f2f2] p-2.5">
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
