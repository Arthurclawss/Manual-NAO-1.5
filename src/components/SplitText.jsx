"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
};

export default function SplitText({
  text,
  className = "",
  tag = "p",
  splitBy = "words",
  delay = 30,
  duration = 0.65,
  from = { opacity: 0, y: 12, filter: "blur(4px)" },
  disabled = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = disabled || Boolean(prefersReducedMotion);
  const [ready, setReady] = useState(false);
  const MotionTag = motionTags[tag] || motion.p;
  const parts = splitBy === "chars" ? Array.from(text) : text.split(" ");

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const container = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: delay / 1000 },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : from,
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0 }
        : { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      className={`split-text ${className}`}
      variants={container}
      initial="hidden"
      animate={reduceMotion || ready ? "visible" : "hidden"}
      aria-label={text}
    >
      {parts.map((part, index) => (
        <motion.span
          key={`${part}-${index}`}
          variants={item}
          className="inline-block will-change-[transform,filter,opacity]"
          aria-hidden="true"
        >
          {part === " " ? "\u00A0" : part}
          {splitBy === "words" && index < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
