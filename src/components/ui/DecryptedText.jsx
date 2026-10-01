import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * DecryptedText - React Bits Component
 * Scrambles characters into random technical glyphs before decrypting to final string.
 */
export default function DecryptedText({
  text = '',
  speed = 36,
  maxIterations = 8,
  sequential = true,
  characters = '0123456789ABCDEF_<>~*#+-%',
  className = '',
  encryptedClassName = 'opacity-70 text-teal-600',
  animateOn = 'hover', // 'hover' | 'view'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  if (prevText !== text) {
    setPrevText(text);
    setDisplayText(text);
  }

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    let iteration = 0;
    const targetLength = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            // If sequential, resolve from left to right as iterations proceed
            if (sequential && index < Math.floor(iteration / 2)) {
              return text[index];
            }
            if (!sequential && iteration >= maxIterations) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration += 1;
      if (iteration > (sequential ? targetLength * 2 : maxIterations)) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  }, [text, speed, maxIterations, sequential, characters]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Observer for 'view' animation if requested
  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startScramble();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animateOn, startScramble]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      startScramble();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono select-none ${isScrambling ? encryptedClassName : ''} ${className}`}
      aria-label={text}
      {...props}
    >
      {displayText}
    </span>
  );
}
