export type Direction = "up" | "down" | "left" | "right";

export type CellType = "empty" | "energy" | "blocked" | "goal";

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  robotPosition: Position;
  soulPosition: Position | null;
  grid: CellType[][];
  moves: number;
  isComplete: boolean;
}
