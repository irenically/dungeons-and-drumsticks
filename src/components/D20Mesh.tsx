import { useEffect, useRef } from 'react';

type Vec = [number, number, number];
type Quaternion = [number, number, number, number];
const phi = (1 + Math.sqrt(5)) / 2;
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const subtract = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: Vec, b: Vec): Vec => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const normalize = (a: Vec): Vec => {
  const length = Math.hypot(...a);
  return a.map((n) => n / length) as Vec;
};
const vertices: Vec[] = [
  [-1, phi, 0],
  [1, phi, 0],
  [-1, -phi, 0],
  [1, -phi, 0],
  [0, -1, phi],
  [0, 1, phi],
  [0, -1, -phi],
  [0, 1, -phi],
  [phi, 0, -1],
  [phi, 0, 1],
  [-phi, 0, -1],
  [-phi, 0, 1],
].map((v) => normalize(v as Vec));
const faces = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1],
];
// A face's label never changes. Landing changes the mesh's orientation instead.
function orientation(value: number): Quaternion {
  const [a, b, c] = faces[value - 1].map((i) => vertices[i]);
  const front = normalize(cross(subtract(b, a), subtract(c, a)));
  const right = normalize(subtract(c, b));
  const up = cross(front, right);
  const matrix = [right, up, front];
  const trace = right[0] + up[1] + front[2];
  if (trace > 0) {
    const s = Math.sqrt(trace + 1) * 2;
    return [(front[1] - up[2]) / s, (right[2] - front[0]) / s, (up[0] - right[1]) / s, s / 4];
  }
  const i = right[0] > up[1] && right[0] > front[2] ? 0 : up[1] > front[2] ? 1 : 2;
  const j = (i + 1) % 3;
  const k = (i + 2) % 3;
  const s = Math.sqrt(1 + matrix[i][i] - matrix[j][j] - matrix[k][k]) * 2;
  const q: Quaternion = [0, 0, 0, 0];
  q[i] = s / 4;
  q[j] = (matrix[j][i] + matrix[i][j]) / s;
  q[k] = (matrix[k][i] + matrix[i][k]) / s;
  q[3] = (matrix[k][j] - matrix[j][k]) / s;
  return q;
}
function interpolate(a: Quaternion, b: Quaternion, t: number): Quaternion {
  let cosine = a.reduce((sum, n, i) => sum + n * b[i], 0);
  const target = cosine < 0 ? (b.map((n) => -n) as Quaternion) : b;
  cosine = Math.abs(cosine);
  if (cosine > 0.9995) {
    const q = a.map((n, i) => n + (target[i] - n) * t) as Quaternion;
    const length = Math.hypot(...q);
    return q.map((n) => n / length) as Quaternion;
  }
  const angle = Math.acos(Math.min(cosine, 1));
  return a.map(
    (n, i) => (n * Math.sin((1 - t) * angle) + target[i] * Math.sin(t * angle)) / Math.sin(angle),
  ) as Quaternion;
}
function applyOrientation(v: Vec, q: Quaternion): Vec {
  const axis: Vec = [q[0], q[1], q[2]];
  const uv = cross(axis, v);
  const uuv = cross(axis, uv);
  return v.map((n, i) => n + 2 * (q[3] * uv[i] + uuv[i])) as Vec;
}

const resinTextures = new Map<number, HTMLCanvasElement>();
function resinTexture(variant: number) {
  const cached = resinTextures.get(variant);
  if (cached) return cached;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(256, 256);
  const hash = (x: number, y: number) => {
    let n = Math.imul(x + variant * 101, 374761393) + Math.imul(y, 668265263);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  };
  const noise = (x: number, y: number) => {
    const ix = Math.floor(x),
      iy = Math.floor(y);
    const fx = x - ix,
      fy = y - iy;
    const u = fx * fx * (3 - 2 * fx),
      v = fy * fy * (3 - 2 * fy);
    const top = hash(ix, iy) * (1 - u) + hash(ix + 1, iy) * u;
    const bottom = hash(ix, iy + 1) * (1 - u) + hash(ix + 1, iy + 1) * u;
    return top * (1 - v) + bottom * v;
  };
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const grain = hash(x + 700, y + 900);
      const vein = noise(x / 60, y / 60);
      const warp = noise(x / 27 + 19, y / 27 + 31);
      const foil = noise(x / 3.5 + warp * 5, y / 2.3 + vein * 8);
      const inclusion =
        Math.pow(Math.max(0, (foil - 0.62) / 0.38), 1.4) * Math.max(0, (vein - 0.35) * 2);
      const tone = noise(x / 42 + 80, y / 42 + 40);
      const palette = tone < 0.38 ? [185, 83, 32] : tone < 0.66 ? [151, 30, 111] : [91, 58, 166];
      const dust = grain > 0.996 ? (grain - 0.996) * 4000 : 0;
      const pixel = (y * 256 + x) * 4;
      image.data[pixel] = 4 + grain * 3 + palette[0] * inclusion + dust;
      image.data[pixel + 1] = 4 + grain * 3 + palette[1] * inclusion + dust;
      image.data[pixel + 2] = 8 + grain * 4 + palette[2] * inclusion + dust;
      image.data[pixel + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  resinTextures.set(variant, canvas);
  return canvas;
}

function paintCosmos(
  ctx: CanvasRenderingContext2D,
  triangle: number[][],
  face: number,
  normal: Vec,
  brightness: number,
) {
  const [a, b, c] = triangle;
  ctx.save();
  ctx.clip();
  ctx.transform(b[0] - a[0], b[1] - a[1], c[0] - a[0], c[1] - a[1], a[0], a[1]);
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.65 + brightness * 0.35;
  const texture = resinTexture(face % 4);
  ctx.drawImage(texture, 0, 0, 1, 1);
  // A restrained resin reflection follows the face angle rather than pulsing.
  const reflection = Math.pow(Math.max(0, dot(normal, normalize([-0.3, 0.45, 1]))), 16);
  if (reflection > 0.005) {
    const sheen = ctx.createLinearGradient(0, 0, 0.8, 0.6);
    sheen.addColorStop(0, '#c6c1e800');
    sheen.addColorStop(0.45, '#c6c1e844');
    sheen.addColorStop(0.6, '#c6c1e800');
    ctx.globalAlpha = reflection * 0.25;
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, 1, 1);
  }
  ctx.restore();
}

function draw(canvas: HTMLCanvasElement, from: number, value: number, progress: number, time = 0) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 3);
  const width = 280;
  const height = 310;
  if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
    canvas.width = width * ratio;
    canvas.height = height * ratio;
  }
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const moving = progress < 1;
  const eased = 1 - Math.pow(1 - progress, 3);
  const wobble = progress > 0.75 ? Math.sin((progress - 0.75) * Math.PI * 12) * (1 - progress) : 0;
  const ax = moving ? eased * Math.PI * 4 + wobble : 0;
  const ay = moving ? eased * Math.PI * 2 : 0;
  const az = moving ? -eased * Math.PI * 2 + wobble * 0.5 : 0;
  const bounce = moving ? -Math.abs(Math.sin(progress * Math.PI * 3)) * 26 * (1 - progress) : 0;
  const lateral = moving ? Math.sin(progress * Math.PI * 3) * 12 * (1 - progress) : 0;
  const pose = interpolate(orientation(from), orientation(value), eased);
  const rotate = ([x, y, z]: Vec): Vec => {
    const y1 = y * Math.cos(ax) - z * Math.sin(ax);
    const z1 = y * Math.sin(ax) + z * Math.cos(ax);
    const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
    const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
    return [x2 * Math.cos(az) - y1 * Math.sin(az), x2 * Math.sin(az) + y1 * Math.cos(az), z2];
  };
  const project = ([x, y, z]: Vec) => {
    const scale = (124 * 7) / (7 - z);
    return [140 + lateral + x * scale, 164 + bounce - y * scale];
  };
  const points = vertices.map((v) => rotate(applyOrientation(v, pose)));
  const visible = faces
    .map((face, index) => {
      const [a, b, c] = face.map((i) => points[i]);
      const center = a.map((n, i) => (n + b[i] + c[i]) / 3) as Vec;
      const normal = normalize(cross(subtract(b, a), subtract(c, a)));
      return { a, b, c, center, normal, index };
    })
    .filter(({ center, normal }) => dot(normal, [-center[0], -center[1], 7 - center[2]]) > 0)
    .sort((a, b) => a.center[2] - b.center[2]);
  const light = normalize([-0.6, 0.8, 1]);
  for (const { a, b, c, center, normal, index } of visible) {
    const triangle = [a, b, c].map(project);
    const brightness = Math.max(0, dot(normal, light));
    ctx.beginPath();
    ctx.moveTo(triangle[0][0], triangle[0][1]);
    ctx.lineTo(triangle[1][0], triangle[1][1]);
    ctx.lineTo(triangle[2][0], triangle[2][1]);
    ctx.closePath();
    ctx.fillStyle = `rgb(${5 + brightness * 12}, ${7 + brightness * 13}, ${14 + brightness * 20})`;
    ctx.fill();
    paintCosmos(ctx, triangle, index, normal, brightness);

    // Project the face's own axes so each number follows its triangular surface.
    const faceRight = normalize(subtract(c, b));
    const faceUp = cross(normal, faceRight);
    const origin = project(center);
    const textRight = project(center.map((n, i) => n + faceRight[i] * 0.3) as Vec);
    const textDown = project(center.map((n, i) => n - faceUp[i] * 0.3) as Vec);
    ctx.save();
    ctx.transform(
      textRight[0] - origin[0],
      textRight[1] - origin[1],
      textDown[0] - origin[0],
      textDown[1] - origin[1],
      origin[0],
      origin[1],
    );
    ctx.font = '700 1px Cinzel, Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffe0a0';
    ctx.fillText(String(index + 1), 0, 0);
    ctx.restore();
  }
  // Stroke shared edges once, after the opaque faces, so their glow stays visible.
  const edges = new Set<string>();
  ctx.beginPath();
  for (const { index } of visible) {
    const face = faces[index];
    for (let i = 0; i < 3; i++) {
      const a = face[i];
      const b = face[(i + 1) % 3];
      const key = [Math.min(a, b), Math.max(a, b)].join(':');
      if (edges.has(key)) continue;
      edges.add(key);
      const start = project(points[a]);
      const end = project(points[b]);
      ctx.moveTo(...(start as [number, number]));
      ctx.lineTo(...(end as [number, number]));
    }
  }
  const gold = ctx.createLinearGradient(30, 20, 220, 280);
  gold.addColorStop(0, '#fff0a6');
  gold.addColorStop(0.44, '#bd7527');
  gold.addColorStop(0.73, '#ffe39a');
  gold.addColorStop(1, '#a76420');
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = gold;
  ctx.lineWidth = 3.5;
  ctx.stroke();
  // Moving light is painted only onto the edge path, like the original SVG mask.
  const phase = (time / 12000) * Math.PI * 2;
  const reflections = [
    { x: -40, y: -72, radius: 85, violet: false },
    { x: 60, y: 23, radius: 70, violet: true },
    { x: -40, y: 88, radius: 65, violet: false },
  ];
  ctx.save();
  for (const spot of reflections) {
    const x = 140 + lateral + (spot.x * Math.cos(phase) - spot.y * Math.sin(phase)) * 1.1;
    const y = 164 + bounce + (spot.x * Math.sin(phase) + spot.y * Math.cos(phase)) * 1.1;
    const reflection = ctx.createRadialGradient(x, y, 0, x, y, spot.radius * 1.1);
    if (spot.violet) {
      reflection.addColorStop(0, '#e8e1ff');
      reflection.addColorStop(0.4, 'rgba(188, 160, 255, 0.8)');
      reflection.addColorStop(1, 'rgba(128, 216, 239, 0)');
    } else {
      reflection.addColorStop(0, '#fffbed');
      reflection.addColorStop(0.35, 'rgba(255, 232, 154, 0.95)');
      reflection.addColorStop(1, 'rgba(255, 212, 108, 0)');
    }
    ctx.strokeStyle = reflection;
    ctx.lineWidth = 4.5;
    ctx.stroke();
  }
  ctx.restore();
}

export function D20Mesh({ value, rolling }: { value: number; rolling: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settledValue = useRef(value);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(canvas, value, value, 1);
      settledValue.current = value;
      return;
    }
    let frame = 0;
    const started = performance.now();
    const initialValue = settledValue.current;
    const animate = (now: number) => {
      const progress = rolling ? Math.min((now - started) / 1450, 1) : 1;
      draw(canvas, initialValue, value, progress, now);
      if (progress === 1) settledValue.current = value;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [rolling, value]);
  return <canvas ref={canvasRef} className="d20-mesh" aria-hidden="true" />;
}
