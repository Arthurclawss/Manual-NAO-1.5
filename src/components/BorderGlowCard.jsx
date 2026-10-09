"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function BorderGlowCard({ children, className = "", onClick, ...props }) {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onClick={onClick}
      className={`relative group overflow-hidden ${className}`}
      {...props}
    >
      {/* 
        The glowing gradient layer (Spotlight). 
        It sits at the very back and follows the mouse. 
        It uses a very subtle opacity so it doesn't leak aggressively.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(14, 165, 233, 0.12), transparent 40%)",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.article>
  );
}

