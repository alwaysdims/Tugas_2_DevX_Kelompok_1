import { useEffect, useRef } from 'react';

/**
 * InteractiveWave - Lightweight GPU-friendly Math / Wave canvas
 * Simulates real-time trigonometric wave interference with cursor attraction.
 */
export default function InteractiveWave({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let step = 0;
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, w, h);

      step += 0.025;
      const numLines = 5;

      for (let l = 0; l < numLines; l++) {
        ctx.beginPath();
        const alpha = 0.15 + (l / numLines) * 0.35;
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.lineWidth = 1.2;

        const points = 40;
        for (let i = 0; i <= points; i++) {
          const x = (w / points) * i;
          const baseY = h * 0.5 + Math.sin(step + (i * 0.18) + (l * 0.6)) * 14;

          // Mouse dist distortion
          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 90;
          let offsetY = 0;
          if (dist < maxDist) {
            offsetY = (1 - dist / maxDist) * -22 * Math.cos(step * 2);
          }

          const y = baseY + offsetY;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-60 mix-blend-screen ${className}`}
      aria-hidden="true"
    />
  );
}
