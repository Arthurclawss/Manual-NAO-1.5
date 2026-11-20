"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CountUp({
  to = 0,
  from = 0,
  duration = 0.9,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? to : from);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let frameId;
    const startTime = performance.now();
    const totalMs = Math.max(150, duration * 1000);

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / totalMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [from, to, duration, prefersReducedMotion]);

  const displayed = prefersReducedMotion ? to : value;

  return (
    <span className={className}>
      {prefix}
      {displayed}
      {suffix}
    </span>
  );
}

