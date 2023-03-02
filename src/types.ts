export type Board = {
  [key: number]: string[];
};

export enum Player {
  O,
  X,
}

export enum GameStatus {
  NONE,
  OWIN,
  XWIN,
  DRAW,
  QUIT,
}

export type GameModel = {
  id: number;
  startAt: Date;
  endAt?: Date;
  status: GameStatus;
  duration?: number;
  board: Board;
  player: Player;
  updatedAt?: Date;
};
