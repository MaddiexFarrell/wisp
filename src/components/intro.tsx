"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IntroWisps } from "@/components/intro-wisps";

const IMAGES = [
  "/intro-1.png",
  "/intro-2.png",
  "/intro-3.png",
  "/intro-4.png",
  "/intro-5.png",
  "/intro-6.png",
];

const ease = [0.22, 1, 0.36, 1] as const;
const expoOut = [0.16, 1, 0.3, 1] as const;

// Timeline (ms)
const T_ICON = 300; // Wisp STUDIO -> Wisp ✦ STUDIO
// Hold the spinning sparkle on screen for ~1.15s (T_ICON -> T_BOX) so viewers
// can actually register the icon before the frame opens into the image.
const T_BOX = 1450; // split apart + framed box opens
const T_CYCLE = 1800; // start cycling images
const CYCLE_STEP = 200; // per-image
const T_ANTICIPATE = T_CYCLE + IMAGES.length * CYCLE_STEP + 120;
const T_EXPAND = T_ANTICIPATE + 200;
const T_DONE = T_EXPAND + 950;

// Hero background still (extracted from herobg2.mp4) — the intro's final
// frame lands on this exact image so the handoff into the hero is seamless.
const HERO_POSTER = "/hero-poster.jpg";

// --- Intro completion signal ---------------------------------------------
// Lets the hero (and anything else) hold its entrance animation until the
// intro overlay has finished, so content animates in smoothly on reveal
// instead of flashing in already-completed behind the overlay.
let introComplete = false;

function markIntroComplete() {
  if (introComplete) return;
  introComplete = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("intro:complete"));
  }
}

/** Subscribe to intro completion. Fires immediately if already complete. */
export function onIntroComplete(cb: () => void): () => void {
  if (introComplete) {
    cb();
    return () => {};
  }
  if (typeof window === "undefined") return () => {};
  window.addEventListener("intro:complete", cb);
  return () => window.removeEventListener("intro:complete", cb);
}

type Dims = { bw: number; bh: number; vw: number; vh: number };

export function Intro() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0); // 0 together, 1 icon, 2 box, 3 cycle, 4 anticipate, 5 expand
  const [img, setImg] = useState(0);
  const [dims, setDims] = useState<Dims | null>(null);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      markIntroComplete();
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bw = Math.min(360, vw * 0.82);
    const bh = Math.min(bw * 0.66, vh * 0.5);
    setDims({ bw, bh, vw, vh });

    document.body.style.overflow = "hidden";

    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));

    at(T_ICON, () => setStep(1));
    at(T_BOX, () => setStep(2));
    at(T_CYCLE, () => setStep(3));
    for (let i = 1; i < IMAGES.length; i++) {
      at(T_CYCLE + i * CYCLE_STEP, () => setImg(i));
    }
    at(T_ANTICIPATE, () => setStep(4));
    at(T_EXPAND, () => setStep(5));
    at(T_DONE, () => {
      setVisible(false);
      markIntroComplete();
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (reduced) return null;

  const slotW = dims
    ? step === 5
      ? dims.vw
      : step === 0
        ? 0
        : step === 1
          ? 48
          : dims.bw
    : 0;
  const slotH = dims
    ? step === 5
      ? dims.vh
      : step < 2
        ? step === 1
          ? 48
          : 28
        : dims.bh
    : 28;

  const sizeTransition =
    step === 5 ? { duration: 0.9, ease: expoOut } : { duration: 0.5, ease };

  // Corner-bracket metrics animate across the timeline so the frame reads as a
  // tight little viewfinder hugging the icon at first, then opens out into a
  // proportional frame on the larger image — never chunky at the small size.
  // Arm length + inset grow with the slot so the corners "fly apart" as the
  // box expands, landing exactly on the image corners.
  const frameSmall = step <= 1;
  const cornerLen = frameSmall ? 10 : 22;
  const cornerInset = frameSmall ? -3 : -8;
  const cornerBorder = frameSmall ? 1.5 : 2;
  // Visible from the icon step (1) through the framed-image steps, then fades
  // as the box expands full-screen (5).
  const frameVisible = step >= 1 && step < 5;
  const cornerScale = step === 4 ? 0.95 : 1;
  const cornerStyle = { borderColor: "#fff", borderStyle: "solid" } as const;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#1a1512]"
        >
          {/* warm radial glow so the brown isn't flat */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_40%,#241c15_0%,#1a1512_55%,#0f0b08_100%)]" />
          {/* film grain for texture */}
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light" />

          {/* Wind "wisps" drifting behind the wordmark */}
          <IntroWisps />

          <div className="flex w-full items-center justify-center gap-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: step < 5 ? 1 : 0 }}
              transition={{ duration: 0.6, ease }}
              className="min-w-0 flex-1 text-right font-sans text-4xl font-bold leading-none tracking-[-0.01em] whitespace-nowrap text-foreground sm:text-5xl"
            >
              Wisp
            </motion.span>

            {/* Center slot: holds the icon, then the framed box */}
            <motion.div
              animate={{ width: slotW, height: slotH }}
              transition={sizeTransition}
              className="relative flex shrink-0 items-center justify-center"
            >
              {/* ✦ icon */}
              <motion.span
                animate={{
                  opacity: step === 1 ? 1 : 0,
                  scale: step === 1 ? 1 : 0.3,
                }}
                transition={{ duration: 0.4, ease }}
                className="absolute text-foreground"
              >
                <motion.span
                  animate={{ rotate: 360, scale: [1, 1.18, 1] }}
                  transition={{
                    rotate: { duration: 2.3, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="block drop-shadow-[0_0_12px_rgba(255,240,220,0.9)]"
                >
                  {/* Custom 4-point sparkle: concave sides that meet in sharp
                      cusped points (lucide's Sparkle has soft, rounded tips). */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                    stroke="none"
                    aria-hidden="true"
                  >
                    <path d="M12 0 Q15 9 24 12 Q15 15 12 24 Q9 15 0 12 Q9 9 12 0 Z" />
                  </svg>
                </motion.span>
              </motion.span>

              {/* Framed image box */}
              <motion.div
                animate={{
                  opacity: step >= 2 ? 1 : 0,
                  scale: step === 4 ? 0.95 : step >= 2 ? 1 : 0.9,
                  borderRadius: step === 5 ? 0 : 10,
                }}
                transition={
                  step === 5
                    ? { duration: 0.9, ease: expoOut }
                    : { duration: step === 4 ? 0.2 : 0.5, ease }
                }
                className="absolute inset-0 overflow-hidden bg-surface"
              >
                {IMAGES.map((src, i) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt=""
                    animate={{ opacity: i === img ? 1 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ))}
                {/* Final frame = the hero's background still. Matches the
                    hero video's object-cover + scale so the intro resolves
                    directly into the hero with no visible cut. */}
                <motion.img
                  src={HERO_POSTER}
                  alt=""
                  animate={{ opacity: step >= 5 ? 1 : 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0 h-full w-full scale-[1.12] object-cover"
                />
              </motion.div>

              {/* Corner brackets — the four arms of the icon's frame. They're
                  visible from the icon step and, because this layer is
                  `inset-0` inside the resizing slot, they ride outward with the
                  box as it grows: the icon's tight little frame "opens up" into
                  the image's corner viewfinder. Arm length / inset / stroke all
                  scale with the slot so the corners never look chunky small. */}
              <motion.div
                animate={{ opacity: frameVisible ? 1 : 0, scale: cornerScale }}
                transition={{ duration: step === 4 ? 0.22 : 0.4, ease }}
                className="pointer-events-none absolute inset-0 drop-shadow-[0_0_4px_rgba(255,255,255,1)] drop-shadow-[0_0_12px_rgba(255,255,255,0.85)] drop-shadow-[0_0_26px_rgba(255,240,220,0.7)]"
              >
                <motion.span
                  className="absolute"
                  style={cornerStyle}
                  animate={{
                    top: cornerInset,
                    left: cornerInset,
                    width: cornerLen,
                    height: cornerLen,
                    borderTopWidth: cornerBorder,
                    borderLeftWidth: cornerBorder,
                  }}
                  transition={sizeTransition}
                />
                <motion.span
                  className="absolute"
                  style={cornerStyle}
                  animate={{
                    top: cornerInset,
                    right: cornerInset,
                    width: cornerLen,
                    height: cornerLen,
                    borderTopWidth: cornerBorder,
                    borderRightWidth: cornerBorder,
                  }}
                  transition={sizeTransition}
                />
                <motion.span
                  className="absolute"
                  style={cornerStyle}
                  animate={{
                    bottom: cornerInset,
                    left: cornerInset,
                    width: cornerLen,
                    height: cornerLen,
                    borderBottomWidth: cornerBorder,
                    borderLeftWidth: cornerBorder,
                  }}
                  transition={sizeTransition}
                />
                <motion.span
                  className="absolute"
                  style={cornerStyle}
                  animate={{
                    bottom: cornerInset,
                    right: cornerInset,
                    width: cornerLen,
                    height: cornerLen,
                    borderBottomWidth: cornerBorder,
                    borderRightWidth: cornerBorder,
                  }}
                  transition={sizeTransition}
                />
              </motion.div>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: step < 5 ? 1 : 0 }}
              transition={{ duration: 0.6, ease }}
              className="min-w-0 flex-1 text-left font-sans text-4xl font-light leading-none tracking-[-0.01em] whitespace-nowrap text-foreground sm:text-5xl"
            >
              Studio
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
