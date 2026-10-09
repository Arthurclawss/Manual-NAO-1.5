"use client";

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
  duration = 0.8,
  from = { opacity: 0, y: 18, rotateX: -18, filter: "blur(3px)" },
  disabled = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = disabled || prefersReducedMotion;
  const MotionTag = motionTags[tag] || motion.p;
  const parts = splitBy === "chars" ? Array.from(text) : text.split(" ");

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
      rotateX: 0,
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
      animate="visible"
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
