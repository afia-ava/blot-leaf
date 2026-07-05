import type { Layer, Path } from "./types.js";

function pathToD(points: Path): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
}

export function renderSvg(width: number, height: number, layers: Layer[]): string {
  const groups = layers
    .map((layer) => {
      const paths = layer.paths
        .map(
          (p) =>
            `    <path d="${pathToD(p.points)}" fill="none" stroke="${layer.color}" stroke-width="${p.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`
        )
        .join("\n");
      return `  <g id="${layer.name}">\n${paths}\n  </g>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#f2ede1" />
${groups}
</svg>
`;
}
