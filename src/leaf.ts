import type { Path, Point } from "./types.js";

export interface LeafShapeParams {
  hinge: Point;
  radius: number;
  spread: number;
  fanPower: number;
  notchDepth: number;
  notchWidth: number;
  waveAmp: number;
  waveFreq: number;
  raggedness: number;
  seed: number;
}

export interface VeinParams {
  count: number;
  forkAt: number;
  forkChance: number;
  forkSpread: number;
  curl: number;
  seed: number;
}

export interface BlotParams {
  count: number;
  seed: number;
  length: number;
  lengthJitter: number;
  angleJitter: number;
  inwardBias: number;
}

export function leafOutline(_p: LeafShapeParams, _segments = 120): Path {
  return [];
}

export function leafVeins(_p: LeafShapeParams, _v: VeinParams): Path[] {
  return [];
}

export function leafBlots(_p: LeafShapeParams, _b: BlotParams): Path[] {
  return [];
}

export function stemBundle(_hinge: Point, _count: number, _length: number, _spread: number, _seed: number): Path[] {
  return [];
}
