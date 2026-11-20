"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
};

export default function BlurText({
  text = "",
  className = "",
  tag = "p",
  delay = 45,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.45,
  disabled = false,
}) {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = disabled || Boolean(prefersReducedMotion);
  const MotionTag = motionTags[tag] || motion.p;
  const elements = useMemo(
    () => (animateBy === "characters" ? Array.from(text) : text.split(" ")),
    [animateBy, text]
  );

  useEffect(() => {
    if (reduceMotion) return;

    const element = rootRef.current;
    if (!element) return;

    let frameId = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frameId = requestAnimationFrame(() => setInView(true));
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [reduceMotion, rootMargin, threshold]);

  const initial = reduceMotion
    ? { opacity: 1, filter: "blur(0px)", y: 0 }
    : { opacity: 0, filter: "blur(6px)", y: direction === "top" ? -10 : 10 };
  const isVisible = reduceMotion || inView;

  return (
    <MotionTag
      ref={rootRef}
      className={`blur-text flex flex-wrap ${className}`}
      aria-label={text}
    >
      {elements.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={initial}
          animate={
            isVisible
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : initial
          }
          transition={{
            duration: reduceMotion ? 0 : stepDuration,
            delay: reduceMotion ? 0 : (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden="true"
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
