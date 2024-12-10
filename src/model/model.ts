export interface Pos {
  y: number;
  x: number;
}

export interface Size {
  height: number;
  width: number;
}

export interface Balloons {
  [y: string]: {
    [x: string]: number;
  };
}
