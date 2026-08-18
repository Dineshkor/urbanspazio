'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

export interface RoomBeats {
  ember: number;
  floor: number;
  walls: number;
  windows: number;
  light: number;
  materials: number;
  furniture: number;
  pendant: number;
  artwork: number;
  doorway: number;
  flood: number;
  blueprints: number;
  samples: number;
  styling: number;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Every layer: progress 0..total; a layer with beat b starts revealing
   when progress passes b, finishes one unit later, stays on. beat -1 = never. */
function useLayerProgress(progress: MotionValue<number>, beat: number) {
  return useTransform(progress, (p) => (beat < 0 ? 0 : clamp01(p - beat)));
}

export default function RoomScene({
  progress,
  beats,
}: {
  progress: MotionValue<number>;
  beats: RoomBeats;
}) {
  return (
    <svg
      viewBox="0 0 100 75"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full block"
    >
      <rect width="100" height="75" fill="#1E1C1A" />
      <BackWall progress={progress} beat={beats.walls} />
      <Ember progress={progress} beat={beats.ember} />
      <Floor progress={progress} beat={beats.floor} />
      <Windows progress={progress} beat={beats.windows} />
      <LightBeams progress={progress} beat={beats.light} />
      <Blueprints progress={progress} beat={beats.blueprints} />
      <Materials progress={progress} beat={beats.materials} />
      <Samples progress={progress} beat={beats.samples} />
      <Artwork progress={progress} beat={beats.artwork} />
      <Sofa progress={progress} beat={beats.furniture} />
      <Pendant progress={progress} beat={beats.pendant} />
      <Styling progress={progress} beat={beats.styling} />
      <Doorway progress={progress} beat={beats.doorway} />
      <Flood progress={progress} beat={beats.flood} />
      <rect width="100" height="75" fill="url(#vignetteGrad)" pointerEvents="none" />

      <defs>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9E7B35" />
          <stop offset="50%" stopColor="#E8CF94" />
          <stop offset="100%" stopColor="#C5A25D" />
        </linearGradient>
        <radialGradient id="glassGrad" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#E8CF94" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C5A25D" stopOpacity="0.12" />
        </radialGradient>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8CF94" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C5A25D" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE9DE" />
          <stop offset="100%" stopColor="#F6F2EC" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8CF94" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8CF94" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="floodGrad" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#E4C988" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E4C988" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Layers ── */

function BackWall({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: useTransform(lp, (v) => 0.25 + 0.75 * v) }}>
      <rect width="100" height="47" fill="#262320" />
      <motion.path
        d="M0 47 H100"
        stroke="#C5A25D"
        strokeWidth="0.3"
        fill="none"
        style={{ opacity: useTransform(lp, (v) => v * 0.2) }}
      />
    </motion.g>
  );
}

function Ember({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <circle cx="50" cy="38" r="3.5" fill="url(#glowGrad)" />
      <motion.circle
        cx="50"
        cy="38"
        r="1.4"
        fill="#E8CF94"
        animate={{ r: [1.2, 1.6, 1.2], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.g>
  );
}

function Floor({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g>
      <motion.rect y="47" width="100" height="28" fill="url(#floorGrad)" style={{ opacity: lp }} />
      <motion.path
        d="M0 47 H100"
        stroke="#C5A25D"
        strokeWidth="0.4"
        fill="none"
        style={{ pathLength: lp, opacity: useTransform(lp, (v) => 0.5 * v) }}
      />
      <motion.g style={{ opacity: useTransform(lp, (v) => v * 0.12) }}>
        <path d="M0 52 H100" stroke="#7A746D" strokeWidth="0.3" />
        <path d="M0 57 H100" stroke="#7A746D" strokeWidth="0.3" />
        <path d="M0 62 H100" stroke="#7A746D" strokeWidth="0.3" />
      </motion.g>
    </motion.g>
  );
}

function Windows({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const mullion = useTransform(lp, (v) => v * 0.6);
  return (
    <motion.g>
      <motion.path
        d="M18 34 L18 14 A6.5 6.5 0 0 1 31 14 L31 34 Z"
        fill="url(#glassGrad)"
        style={{ opacity: lp }}
      />
      <motion.path
        d="M18 34 L18 14 A6.5 6.5 0 0 1 31 14 L31 34 Z"
        stroke="#C5A25D"
        strokeWidth="0.45"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.path
        d="M40 34 L40 14 A6.5 6.5 0 0 1 53 14 L53 34 Z"
        fill="url(#glassGrad)"
        style={{ opacity: lp }}
      />
      <motion.path
        d="M40 34 L40 14 A6.5 6.5 0 0 1 53 14 L53 34 Z"
        stroke="#C5A25D"
        strokeWidth="0.45"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.g style={{ opacity: mullion }}>
        <path d="M24.5 14 V34" stroke="#C5A25D" strokeWidth="0.25" />
        <path d="M46.5 14 V34" stroke="#C5A25D" strokeWidth="0.25" />
      </motion.g>
    </motion.g>
  );
}

function LightBeams({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g
      style={{
        opacity: useTransform(lp, (v) => v * 0.4),
        translateY: useTransform(lp, (v) => (1 - v) * 6),
      }}
    >
      <path d="M18 34 L31 34 L38 58 L11 58 Z" fill="url(#beamGrad)" />
      <path d="M40 34 L53 34 L60 58 L33 58 Z" fill="url(#beamGrad)" />
    </motion.g>
  );
}

function Blueprints({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const outline = useTransform(lp, (v) => clamp01(v * 2));
  const lineA = useTransform(lp, (v) => clamp01(v * 2 - 0.28));
  const lineB = useTransform(lp, (v) => clamp01(v * 2 - 0.56));
  const lineC = useTransform(lp, (v) => clamp01(v * 2 - 0.84));
  const dims = useTransform(lp, (v) => clamp01(v * 2 - 1.12));
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path
        d="M28 52 H52 V62 H28 Z"
        stroke="#C5A25D"
        strokeWidth="0.35"
        fill="none"
        style={{ pathLength: outline }}
      />
      <motion.path d="M28 57 H52" stroke="#C5A25D" strokeWidth="0.25" style={{ pathLength: lineA }} />
      <motion.path d="M34 52 V62" stroke="#C5A25D" strokeWidth="0.25" style={{ pathLength: lineB }} />
      <motion.path d="M42 52 V62" stroke="#C5A25D" strokeWidth="0.25" style={{ pathLength: lineB }} />
      <motion.path d="M27.5 52 V47" stroke="#C5A25D" strokeWidth="0.2" style={{ pathLength: lineC }} />
      <motion.path d="M52.5 52 V47" stroke="#C5A25D" strokeWidth="0.2" style={{ pathLength: lineC }} />
      <motion.path d="M40 52.5 H44" stroke="#C5A25D" strokeWidth="0.2" style={{ pathLength: dims }} />
      <motion.path d="M42 52.5 V47.5" stroke="#C5A25D" strokeWidth="0.15" style={{ pathLength: dims }} />
    </motion.g>
  );
}

function Materials({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const panel = useTransform(lp, (v) => clamp01(v * 2));
  return (
    <motion.g style={{ filter: useTransform(lp, (v) => `blur(${(1 - v) * 2.5}px)`), opacity: lp }}>
      <motion.rect x="64" y="10" width="3" height="14" fill="#B9B2A6" style={{ opacity: panel }} />
      <motion.path
        d="M64.8 12 L65.6 14.5 L65 17.5 L66.2 22"
        stroke="#8B8478"
        strokeWidth="0.25"
        fill="none"
        style={{ pathLength: panel }}
      />
      <motion.rect x="68" y="10" width="3" height="14" fill="#8A6B4D" style={{ opacity: panel }} />
      <motion.path
        d="M69.5 11 V23"
        stroke="#6F5438"
        strokeWidth="0.3"
        fill="none"
        style={{ opacity: useTransform(panel, (v) => v * 0.6), pathLength: panel }}
      />
      <motion.rect x="72" y="10" width="3" height="14" fill="url(#brassGrad)" style={{ opacity: panel }} />
      <motion.rect x="76" y="10" width="3" height="14" fill="#CFC4B0" style={{ opacity: panel }} />
    </motion.g>
  );
}

function Samples({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const table = useTransform(lp, (v) => clamp01(v * 1.4));
  const swatchA = useTransform(lp, (v) => clamp01(v * 2 - 0.2));
  const swatchB = useTransform(lp, (v) => clamp01(v * 2 - 0.45));
  const swatchC = useTransform(lp, (v) => clamp01(v * 2 - 0.7));
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.rect x="36" y="42" width="18" height="1.5" fill="#2E2A25" style={{ opacity: table }} />
      <motion.rect x="37.5" y="43.5" width="1" height="3.5" fill="#2E2A25" style={{ opacity: table }} />
      <motion.rect x="51.5" y="43.5" width="1" height="3.5" fill="#2E2A25" style={{ opacity: table }} />
      <motion.rect x="37" y="37.8" width="3.4" height="3.4" fill="#B9B2A6" style={{ opacity: swatchA }} />
      <motion.path
        d="M37.8 38.6 L38.7 39.6 L38.3 40.4 L39.4 41"
        stroke="#8B8478"
        strokeWidth="0.2"
        fill="none"
        style={{ pathLength: swatchA }}
      />
      <motion.rect x="41" y="37.8" width="3.4" height="3.4" fill="#8A6B4D" style={{ opacity: swatchB }} />
      <motion.rect x="45" y="37.8" width="3.4" height="3.4" fill="url(#brassGrad)" style={{ opacity: swatchC }} />
    </motion.g>
  );
}

function Artwork({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path
        d="M6 8 H15 V20 H6 Z"
        stroke="#C5A25D"
        strokeWidth="0.35"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.rect
        x="7.2"
        y="9.2"
        width="6.6"
        height="9.6"
        fill="#3A362F"
        style={{ opacity: useTransform(lp, (v) => clamp01(v * 1.5)) }}
      />
    </motion.g>
  );
}

function Sofa({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const body = useTransform(lp, (v) => clamp01(v * 1.8));
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path
        d="M30 47 V37 H70 V47"
        stroke="#C5A25D"
        strokeWidth="0.35"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.rect x="30" y="37" width="40" height="4.2" rx="0.6" fill="#2E2A25" style={{ opacity: body }} />
      <motion.rect x="30" y="41.2" width="40" height="3.6" rx="0.6" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="30" y="38" width="3.4" height="7" rx="0.5" fill="#2E2A25" style={{ opacity: body }} />
      <motion.rect x="66.6" y="38" width="3.4" height="7" rx="0.5" fill="#2E2A25" style={{ opacity: body }} />
      <motion.path
        d="M30 44.8 H70"
        stroke="#C5A25D"
        strokeWidth="0.25"
        style={{ opacity: useTransform(body, (v) => v * 0.7) }}
      />
      <motion.rect x="31.5" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="38" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="61" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="67.5" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
    </motion.g>
  );
}

function Pendant({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path d="M50 0 V9" stroke="#C5A25D" strokeWidth="0.3" style={{ pathLength: lp }} />
      <motion.path
        d="M44 9 A6 6 0 0 1 56 9 Z"
        fill="url(#brassGrad)"
        style={{ opacity: useTransform(lp, (v) => clamp01(v * 1.5)) }}
      />
      <motion.circle
        cx="50"
        cy="13"
        r="4"
        fill="url(#glowGrad)"
        style={{ opacity: useTransform(lp, (v) => v * 0.6) }}
      />
    </motion.g>
  );
}

function Styling({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const riseA = useTransform(lp, (v) => (1 - v) * 4);
  const riseB = useTransform(lp, (v) => (1 - v) * 4);
  const riseC = useTransform(lp, (v) => (1 - v) * 4);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.g style={{ translateY: riseA }}>
        <motion.rect x="19.5" y="43.5" width="1.4" height="2" fill="#C5A25D" style={{ opacity: lp }} />
        <motion.circle cx="20.2" cy="43" r="1.7" fill="#C5A25D" style={{ opacity: lp }} />
      </motion.g>
      <motion.g style={{ translateY: riseB }}>
        <motion.rect x="45" y="43.6" width="5.5" height="3.2" rx="0.9" fill="#E4C988" style={{ opacity: lp }} />
      </motion.g>
      <motion.g style={{ translateY: riseC }}>
        <motion.rect x="74.5" y="42.8" width="3" height="3" fill="#7A746D" style={{ opacity: lp }} />
        <motion.ellipse cx="76" cy="41.8" rx="2.2" ry="1.4" fill="#7C7A52" style={{ opacity: lp }} />
      </motion.g>
    </motion.g>
  );
}

function Doorway({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.circle
        cx="87"
        cy="34"
        r="16"
        fill="url(#floodGrad)"
        style={{ opacity: useTransform(lp, (v) => v * 0.9) }}
      />
      <motion.path
        d="M80 47 L80 20 A7 7 0 0 1 94 20 L94 47 Z"
        stroke="#C5A25D"
        strokeWidth="0.45"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.path
        d="M81 47 L81 21 A6 6 0 0 1 93 21 L93 47 Z"
        fill="#262320"
        style={{
          transform: useTransform(lp, (v) => `scaleX(${1 - 0.92 * v})`),
          transformOrigin: '81px 47px',
          transformBox: 'view-box',
        }}
      />
    </motion.g>
  );
}

function Flood({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return <motion.rect width="100" height="75" fill="url(#floodGrad)" style={{ opacity: lp }} />;
}
