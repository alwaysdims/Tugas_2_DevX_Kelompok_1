import { useRef, useState, useCallback } from 'react';

/**
 * SpotlightCard - React Bits Component
 * Provides a dynamic radial spotlight beam following the cursor on hover.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(19, 78, 74, 0.16)',
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleFocus = useCallback(() => setIsHovered(true), []);
  const handleBlur = useCallback(() => setIsHovered(false), []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`spotlight-card relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="spotlight-layer pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(480px circle at ${position.x}px ${position.y}px, var(--spotlight-glow, ${spotlightColor}), transparent 68%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
