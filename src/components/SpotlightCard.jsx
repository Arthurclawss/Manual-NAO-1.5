"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(34, 197, 94, 0.18)",
  ...props
}) {
  const cardRef = useRef(null);

  function handlePointerMove(event) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    card.style.setProperty("--spotlight-color", spotlightColor);
  }

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`spotlight-card ${className}`}
      {...props}
    >
      <div className="spotlight-card-content">{children}</div>
    </motion.article>
  );
}
