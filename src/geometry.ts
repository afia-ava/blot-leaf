import type { Path, Point } from "./types.js";

export function rotatePath(path: Path, pivot: Point, angle: number): Path {
  const [px, py] = pivot;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return path.map(([x, y]) => {
    const dx = x - px;
    const dy = y - py;
    return [px + dx * cos - dy * sin, py + dx * sin + dy * cos] as Point;
  });
}

export function scalePath(path: Path, pivot: Point, factor: number): Path {
  const [px, py] = pivot;
  return path.map(([x, y]) => [px + (x - px) * factor, py + (y - py) * factor] as Point);
}
