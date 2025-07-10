<script lang="ts">
  import { rayTypes } from '$lib/utils/constants';
  import type { RaySelectorQuestion } from '../types/index';

  /**
   * RaySelector component
   * Props:
   * - question: RaySelectorQuestion (required)
   * - onAnswerChange: (answer: Record<string, string>) => void (required)
   * - showAnswer: boolean (optional, default false)
   * - disabled: boolean (optional, default false)
   * - width: number (optional, px, default 400)
   */
  export let question: RaySelectorQuestion;
  export let onAnswerChange: (answer: Record<string, string>) => void;
  export let showAnswer = false;
  export let disabled = false;
  export let width = 400; // Allow consumers to set width

  let selectedRay = '';
  let position = question.initialPosition ?? question.min;
  let isDragging = false;
  let numberLineRef: HTMLDivElement | null = null;

  // Fallbacks for question fields
  const min = question.min ?? -10;
  const max = question.max ?? 2;
  const interval = question.interval ?? 2;
  const ticks: number[] = [];
  for (let i = min; i <= max; i += interval) {
    ticks.push(i);
  }

  function handleRaySelect(type: string) {
    if (disabled) return;
    selectedRay = type;
    emitAnswer();
  }

  function handlePositionClick(pos: number) {
    if (disabled) return;
    position = pos;
    emitAnswer();
  }

  function emitAnswer() {
    if (onAnswerChange && typeof onAnswerChange === 'function') {
      onAnswerChange({
        rayType: selectedRay,
        position: position !== undefined && position !== null ? position.toString() : ''
      });
    }
  }

  // Dragging functionality (mouse)
  function handleMouseDown(event: MouseEvent) {
    if (disabled || !selectedRay) return;
    isDragging = true;
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging || !numberLineRef) return;
    const rect = numberLineRef.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    const snappedValue = ticks.reduce((prev, curr) =>
      Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
    );
    if (snappedValue !== position) {
      position = snappedValue;
      emitAnswer();
    }
  }

  function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  // Touch events for mobile
  function handleTouchStart(event: TouchEvent) {
    if (disabled || !selectedRay) return;
    isDragging = true;
    event.preventDefault();
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging || !numberLineRef) return;
    const touch = event.touches[0];
    const rect = numberLineRef.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    const snappedValue = ticks.reduce((prev, curr) =>
      Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
    );
    if (snappedValue !== position) {
      position = snappedValue;
      emitAnswer();
    }
  }

  function handleTouchEnd() {
    isDragging = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }

  // Keyboard accessibility for the slider
  function handleSliderKeydown(event: KeyboardEvent) {
    if (disabled || !selectedRay) return;
    let idx = ticks.indexOf(position ?? min);
    if (event.key === 'ArrowLeft' && idx > 0) {
      position = ticks[idx - 1];
      emitAnswer();
      event.preventDefault();
    }
    if (event.key === 'ArrowRight' && idx < ticks.length - 1) {
      position = ticks[idx + 1];
      emitAnswer();
      event.preventDefault();
    }
  }

  $: isCorrect =
    showAnswer &&
    selectedRay === question?.correctAnswer?.rayType &&
    position === question?.correctAnswer?.position;
</script>

<div
  class="mx-auto flex w-full flex-col items-center justify-center space-y-4"
  style="max-width: {width}px;"
>
  <!-- Number Line -->
  <div
    class="relative mx-auto h-20 w-full cursor-pointer select-none"
    bind:this={numberLineRef}
    style="max-width: {width}px;"
  >
    <!-- Axis Line -->
    <div
      class="absolute left-2 right-0 top-1/2 h-[2px] w-full -translate-y-1/2 transform bg-black"
    ></div>

    <!-- Ticks and Labels -->
    {#each ticks as tick}
      <div
        class="absolute top-1/2 transform text-center"
        style="left: {(100 * (tick - min)) / (max - min)}%;"
      >
        <div class="mx-auto h-[10px] w-[1px] bg-gray-700"></div>
        <div class="mt-1 text-sm text-gray-600">{tick}</div>
      </div>
    {/each}

    <!-- Ray Line -->
    {#if selectedRay && position !== null}
      <div
        class="pointer-events-none absolute top-1/2 z-[200] h-[3px] bg-blue-500"
        style="
          left: {selectedRay.startsWith('left')
          ? '0%'
          : `${(100 * ((position ?? min) - min)) / (max - min)}%`};
          width: {selectedRay.startsWith('left')
          ? `${(100 * ((position ?? min) - min)) / (max - min)}%`
          : `${(100 * (max - (position ?? min))) / (max - min)}%`};
          transform: translateY(-50%);
        "
      ></div>
    {/if}

    <!-- Arrowheads (left) -->
    {#if selectedRay === 'leftClosed' || selectedRay === 'leftOpen'}
      <div
        class="pointer-events-none absolute left-0 top-1/2 -ml-2 -translate-y-1/2 transform text-xl text-black"
      >
        ◄
      </div>
    {/if}

    <!-- Arrowheads (right) -->
    {#if selectedRay === 'rightClosed' || selectedRay === 'rightOpen'}
      <div
        class="pointer-events-none absolute right-0 top-1/2 -mr-2 -translate-y-1/2 transform text-xl text-black"
      >
        ►
      </div>
    {/if}

    <!-- Draggable Position Dot -->
    {#if position !== null && selectedRay}
      <div
        class="absolute top-1/2 z-[300] -translate-y-1/2 transform cursor-grab active:cursor-grabbing"
        style="left: {(100 * ((position ?? min) - min)) / (max - min)}%;"
        on:mousedown={handleMouseDown}
        on:touchstart={handleTouchStart}
        on:keydown={handleSliderKeydown}
        role="slider"
        tabindex="0"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={position}
        aria-label="Drag or use arrow keys to select position on number line"
      >
        <div
          class="border-3 h-4 w-4 rounded-full transition-transform hover:scale-110 active:scale-90
          {selectedRay.includes('Open')
            ? 'border-2 border-blue-500 bg-white shadow-lg'
            : 'border-blue-500 bg-blue-500 shadow-lg'}
          {isDragging ? 'scale-125 shadow-xl' : ''}"
        ></div>
      </div>
    {/if}

    <!-- Clickable areas for tick positions (fallback for non-dragging) -->
    {#each ticks as tick}
      <div
        class="absolute top-1/2 z-[100] -translate-x-1 -translate-y-1/2 transform"
        style="left: {(100 * (tick - min)) / (max - min)}%;"
      >
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
          class="h-4 w-4 rounded-full bg-transparent opacity-50 transition hover:border hover:border-blue-500 hover:bg-blue-100 hover:opacity-100
          {disabled ? 'cursor-not-allowed opacity-30' : ''}"
          on:click={() => handlePositionClick(tick)}
          {disabled}
          title="Click to select position {tick}"
        ></button>
      </div>
    {/each}
  </div>

  <!-- Ray Type Buttons -->
  <div class="w-full">
    <p class="mb-2 font-semibold">Select Ray Type:</p>
    <div class="flex w-full items-center gap-5">
      {#each rayTypes as ray}
        <button
          class="flex items-center justify-center rounded-lg border-2 px-4 py-3 text-xl font-semibold transition
            {selectedRay === ray.name
            ? 'border-blue-500 bg-white text-black'
            : 'border-black bg-black text-white'}
            {disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}"
          on:click={() => handleRaySelect(ray.name)}
          {disabled}
        >
          {ray.icon}
        </button>
      {/each}
    </div>
  </div>

  {#if showAnswer}
    <p class="mt-4 text-sm {isCorrect ? 'text-green-600' : 'text-red-600'}">
      {isCorrect ? 'Correct answer!' : 'Incorrect. Try again!'}
    </p>
  {/if}
</div>
