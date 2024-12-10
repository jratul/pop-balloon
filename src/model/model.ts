export interface Pos {
  y: number;
  x: number;
}

export interface Size {
  height: number;
  width: number;
}

export interface Balloon {
  [y: string]: {
    [x: string]: number;
  };
}
