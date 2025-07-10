// Common types used across the library
export interface RaySelectorQuestion {
  question: string;
  question_type_name: 'Ray Selector';
  min?: number;
  max?: number;
  interval?: number;
  initialPosition?: number;
  correctAnswer?: {
    rayType: string;
    position: number;
  };
}

export interface GraphSelectorQuestion {
  question_type_name: 'Graph Selector';
  x_min: number;
  x_max: number;
  y_min: number;
  y_max: number;
  grid_interval: string;
  selection_mode: string;
  question_id: string;
  choices: { x: number; y: number }[];
  show_axes: boolean;
  graph_instruction: string;
}
