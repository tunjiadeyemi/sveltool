<script lang="ts">
  import type { GraphSelectorQuestion } from '../types';

  /**
   * GraphSelector component
   * Props:
   * - question: GraphSelectorQuestion (required)
   * - onAnswerChange: (answer: Record<string, string>) => void (required)
   * - showAnswer: boolean (optional, default false)
   * - disabled: boolean (optional, default false)
   * - width: number (optional, px, default 400)
   * - height: number (optional, px, default 400)
   */
  export let question: GraphSelectorQuestion;
  export let onAnswerChange: (answer: Record<string, string>) => void;
  export let showAnswer = false;
  export let disabled = false;
  export let width = 400;
  export let height = 400;

  const xMin = question.x_min ?? -10;
  const xMax = question.x_max ?? 10;
  const yMin = question.y_min ?? -10;
  const yMax = question.y_max ?? 10;
  const gridInterval = parseFloat(question.grid_interval ?? '1');
  const isMultiple = question.selection_mode === 'multiple';

  // Internal state for selected points
  let selectedPoints: Array<{ x: number; y: number }> = [];

  // Set for quick lookup
  $: selectedPointsSet = new Set(selectedPoints.map((point) => `${point.x},${point.y}`));

  // Choices with selection state
  $: choicesWithSelection = question.choices.map((choice) => ({
    ...choice,
    isSelected: selectedPointsSet.has(`${choice.x},${choice.y}`)
  }));

  function toggleSelection(point: { x: number; y: number }) {
    if (showAnswer || disabled) return;
    const pointKey = `${point.x},${point.y}`;
    const exists = selectedPointsSet.has(pointKey);
    let newSelectedPoints: typeof selectedPoints;

    if (isMultiple) {
      newSelectedPoints = exists
        ? selectedPoints.filter((p) => !(p.x === point.x && p.y === point.y))
        : [...selectedPoints, point];
    } else {
      newSelectedPoints = exists ? [] : [point];
    }

    selectedPoints = newSelectedPoints;
    onAnswerChange({ value: JSON.stringify(newSelectedPoints) });
  }

  // Keyboard accessibility for points
  function handlePointKeydown(event: KeyboardEvent, choice: { x: number; y: number }) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggleSelection(choice);
    }
  }
</script>

<div class="flex flex-col items-center">
  <p class="mb-2 text-lg font-semibold">{question.graph_instruction}</p>
  <div
    class="relative rounded-md border bg-white shadow-md"
    style="width: {width}px; height: {height}px"
  >
    <svg viewBox={`0 0 ${width} ${height}`} class="absolute left-0 top-0 h-full w-full">
      <!-- Grid lines -->
      {#each Array.from({ length: Math.floor((xMax - xMin) / gridInterval) + 1 }, (_, i) => xMin + i * gridInterval) as x}
        <line
          x1={((x - xMin) / (xMax - xMin)) * width}
          y1={0}
          x2={((x - xMin) / (xMax - xMin)) * width}
          y2={height}
          stroke="#ccc"
          stroke-width="1"
        />
      {/each}
      {#each Array.from({ length: Math.floor((yMax - yMin) / gridInterval) + 1 }, (_, i) => yMin + i * gridInterval) as y}
        <line
          x1={0}
          y1={(1 - (y - yMin) / (yMax - yMin)) * height}
          x2={width}
          y2={(1 - (y - yMin) / (yMax - yMin)) * height}
          stroke="#ccc"
          stroke-width="1"
        />
      {/each}

      <!-- Axes -->
      {#if question.show_axes}
        <line
          x1={((0 - xMin) / (xMax - xMin)) * width}
          y1={0}
          x2={((0 - xMin) / (xMax - xMin)) * width}
          y2={height}
          stroke="#1e293b"
          stroke-width="2"
          marker-end="url(#arrow)"
          marker-start="url(#arrow)"
        />
        <line
          x1={0}
          y1={(1 - (0 - yMin) / (yMax - yMin)) * height}
          x2={width}
          y2={(1 - (0 - yMin) / (yMax - yMin)) * height}
          stroke="#1e293b"
          stroke-width="2"
          marker-end="url(#arrow)"
          marker-start="url(#arrow)"
        />
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b" />
          </marker>
        </defs>
      {/if}

      <!-- Choice Points -->
      {#each choicesWithSelection as choice (choice.x + ',' + choice.y)}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <g
          on:click={() => toggleSelection(choice)}
          on:keydown={(e) => handlePointKeydown(e, choice)}
          tabindex={disabled ? undefined : 0}
          aria-label={`Select point (${choice.x}, ${choice.y})`}
          style="cursor: pointer"
        >
          <circle
            cx={((choice.x - xMin) / (xMax - xMin)) * width}
            cy={(1 - (choice.y - yMin) / (yMax - yMin)) * height}
            r={choice.isSelected ? 8 : 6}
            fill={choice.isSelected ? '#3b82f6' : '#ffffff'}
            stroke="#1e40af"
            stroke-width="2"
          />
        </g>
      {/each}
    </svg>
  </div>
</div>
