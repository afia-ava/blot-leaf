export type Point = [number, number];
export type Path = Point[];

export interface LayerPath {
  points: Path;
  strokeWidth: number;
}

export interface Layer {
  name: string;
  color: string;
  paths: LayerPath[];
}
