"use client";

import { useEffect, useRef } from "react";

export default function ClickSpark({ sparkColor = "#22c55e", sparkCount = 12 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        // Explode outward in random directions
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 4 + 2;
        this.speedX = Math.cos(angle) * velocity;
        this.speedY = Math.sin(angle) * velocity;
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.02;
        // Optional gravity effect
        this.gravity = 0.1;
      }

      update() {
        this.x += this.speedX;
        this.speedY += this.gravity;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size = Math.max(0, this.size - 0.1);
      }

      draw() {
        ctx.fillStyle = sparkColor;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const createSparks = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      for (let i = 0; i < sparkCount; i++) {
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0 || particles[i].size <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    animate();

    // Listen on window to capture all clicks globally
    window.addEventListener("click", createSparks);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", createSparks);
    };
  }, [sparkColor, sparkCount]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
