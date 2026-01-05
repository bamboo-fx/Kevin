
export interface GoalNode {
  id: string;
  index: number;
  text: string;
  title: string;
  x: number;
  y: number;
  radius: number;
  color?: string;
}

export interface GoalEdge {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface ViewState {
  x: number;
  y: number;
  zoom: number;
}
