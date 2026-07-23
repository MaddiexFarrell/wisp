"use client";

import { motion, useReducedMotion } from "motion/react";

// Crisp-yet-soft amber "wind wisp" streaks that drift across the intro overlay.
// Each streak is a short bright segment traveling along a curved path (via
// Motion's pathOffset), with a soft amber glow — evoking the "Wisp" name.
const streaks = [
  { d: "M-200 330 C 250 270, 690 390, 1400 300", w: 0.5, seg: 0.36, dur: 3.3, delay: 0 },
  { d: "M-200 480 C 300 420, 720 550, 1400 450", w: 0.6, seg: 0.32, dur: 3.7, delay: 0.4 },
];

export function IntroWisps() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{
          filter: "drop-shadow(0 0 8px rgba(255,255,255,0.35))",
        }}
      >
        <defs>
          <linearGradient id="wispGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {streaks.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            fill="none"
            stroke="url(#wispGrad)"
            strokeWidth={s.w}
            strokeLinecap="round"
            initial={{ pathLength: s.seg, pathOffset: -s.seg, opacity: 0 }}
            animate={{ pathOffset: 1, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: s.dur,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
