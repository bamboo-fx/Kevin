export type Screen = 'home' | 'game-brownie' | 'game-achi' | 'game-rectangles' | 'game-switches' | 'game-sudoku' | 'game-cards' | 'game-waterwine';

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // in degrees
}

export interface Line {
  start: Point;
  end: Point;
}

export interface GameMetadata {
  id: Screen;
  title: string;
  description: string;
  players: string;
  icon?: string;
}



