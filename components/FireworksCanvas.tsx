'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const BRAND_COLORS = [
  '#0a192f', // Navy
  '#f97316', // Orange
  '#ffffff', // White
];

export default function FireworksCanvas({ onDone }: { onDone?: () => void }) {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      // Launch from left edge
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
        zIndex: 9999,
      });
      // Launch from right edge
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        if (onDone) setTimeout(onDone, 1000); // 1s buffer for final particles to fall
      }
    };

    frame();

    return () => {
      confetti.reset();
    };
  }, [onDone]);

  // We don't render a physical DOM element since canvas-confetti dynamically mounts its own canvas at z-index 9999
  return null;
}
