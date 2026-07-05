import { writeFileSync, mkdirSync } from "node:fs";
import { leafBlots, leafOutline, leafVeins, stemBundle, type LeafShapeParams } from "./leaf.js";
import { rotatePath } from "./geometry.js";
import { renderSvg } from "./svg.js";
import type { Layer, Path, Point } from "./types.js";

const WIDTH = 800;
const HEIGHT = 1150;
const HINGE: Point = [400, 780];

function buildLeafLayer(name: string, color: string, shape: LeafShapeParams, veinCount: number, rotation: number): Layer {
  const outline = rotatePath(leafOutline(shape), shape.hinge, rotation);
  const veins = leafVeins(shape, {
    count: veinCount,
    forkAt: 0.62,
    forkChance: 0.55,
    forkSpread: 0.18,
    curl: 0.045,
    seed: shape.seed,
  }).map((v: Path) => rotatePath(v, shape.hinge, rotation));
  const blots = leafBlots(shape, {
    count: Math.max(60, Math.round(shape.radius * 0.45)),
    seed: shape.seed + 97,
    length: Math.max(1.8, shape.radius * 0.012),
    lengthJitter: 0.75,
    angleJitter: 1.3,
    inwardBias: 0.7,
  }).map((b: Path) => rotatePath(b, shape.hinge, rotation));

  return {
    name,
    color,
    paths: [
      { points: outline, strokeWidth: 1.1 },
      ...blots.map((points) => ({ points, strokeWidth: 0.35 })),
      ...veins.map((points) => ({ points, strokeWidth: 0.55 })),
    ],
  };
}

// back leaf: warm tan, rotated to hang out lower-left, mostly independent of the front leaf
const backHinge: Point = [380, 790];
const backShape: LeafShapeParams = {
  hinge: backHinge,
  radius: 300,
  spread: 1.5,
  fanPower: 1.05,
  notchDepth: 0.1,
  notchWidth: 0.3,
  waveAmp: 0.06,
  waveFreq: 5,
  raggedness: 0.02,
  seed: 11,
};
const backLayer = buildLeafLayer("leaf-back", "#b08252", backShape, 24, -0.85);

// front leaf: larger, deep green, wide flat fan with a scalloped crown
const frontShape: LeafShapeParams = {
  hinge: HINGE,
  radius: 450,
  spread: 1.48,
  fanPower: 1.0,
  notchDepth: 0.12,
  notchWidth: 0.28,
  waveAmp: 0.1,
  waveFreq: 5.5,
  raggedness: 0.012,
  seed: 42,
};
const frontLayer = buildLeafLayer("leaf-front", "#49582f", frontShape, 50, 0.02);

const stems = stemBundle(HINGE, 4, 340, 60, 7);
const stemLayer: Layer = {
  name: "stems",
  color: "#2e2417",
  paths: stems.map((points) => ({ points, strokeWidth: 1.4 })),
};

const svg = renderSvg(WIDTH, HEIGHT, [backLayer, frontLayer, stemLayer]);

mkdirSync("output", { recursive: true });
writeFileSync("output/leaf.svg", svg);
console.log("Wrote output/leaf.svg");
