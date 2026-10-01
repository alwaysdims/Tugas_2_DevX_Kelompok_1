'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const MAX_PIXELS = 180;
const KEYFRAME_STEPS = 10;

const PATTERNS = {
  random: () => null,
  center: (x, y) => Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2,
  edges: (x, y) => Math.min(x, 1 - x, y, 1 - y) * 2,
  'left-to-right': x => x,
  'right-to-left': x => 1 - x,
  'top-to-bottom': (_x, y) => y,
  'bottom-to-top': (_x, y) => 1 - y,
  diagonal: (x, y) => (x + y) / 2,
  spiral: (x, y) => {
    const angle = (Math.atan2(y - 0.5, x - 0.5) + Math.PI) / (Math.PI * 2);
    const radius = Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2;
    return (angle + radius) % 1;
  }
};

const EASINGS = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const noise = seed => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

const makeEasing = value => {
  const match = /cubic-bezier\(([^)]+)\)/.exec(value);
  const points = match ? match[1].split(',').map(Number) : EASINGS[value];
  if (!points || points.length !== 4 || points.some(Number.isNaN)) return makeEasing('ease');

  const [x1, y1, x2, y2] = points;
  if (x1 === y1 && x2 === y2) return progress => progress;

  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  return progress => {
    let t = progress;
    for (let i = 0; i < 5; i += 1) {
      const slope = (3 * ax * t + 2 * bx) * t + cx;
      if (!slope) break;
      t -= (((ax * t + bx) * t + cx) * t - progress) / slope;
    }
    t = clamp(t, 0, 1);
    return ((ay * t + by) * t + cy) * t;
  };
};

const coverScale = (size, gap, radius) => {
  const p = clamp(radius, 0, 50) / 100;
  const corner = Math.SQRT1_2 / (Math.SQRT2 * (0.5 - p) + p);
  return ((size + gap) / size) * Math.max(1.02, corner);
};

const buildGrid = ({ width, height, pixelSize, gap, pattern, randomness }) => {
  let size = pixelSize;
  let columns = Math.max(1, Math.ceil((width + gap) / (size + gap)));
  let rows = Math.max(1, Math.ceil((height + gap) / (size + gap)));

  const maxLimit = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : MAX_PIXELS;
  if (columns * rows > maxLimit) {
    size = Math.ceil(size * Math.sqrt((columns * rows) / maxLimit));
    columns = Math.max(1, Math.ceil((width + gap) / (size + gap)));
    rows = Math.max(1, Math.ceil((height + gap) / (size + gap)));
  }

  const stride = size + gap;
  const originX = (width - (columns * stride - gap)) / 2;
  const originY = (height - (rows * stride - gap)) / 2;
  const order = PATTERNS[pattern] ?? PATTERNS.random;
  const mix = clamp(randomness, 0, 1);
  const pixels = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;
      const x = columns <= 1 ? 0.5 : column / (columns - 1);
      const y = rows <= 1 ? 0.5 : row / (rows - 1);
      const base = order(x, y);
      const random = noise(index + 1);

      pixels.push({
        id: index,
        left: originX + column * stride,
        top: originY + row * stride,
        offset: base === null ? random : base * (1 - mix) + random * mix
      });
    }
  }

  return { pixels, size, gap, width, height };
};

const buildKeyframes = ({ ease, startScale, endScale, spin, fade }) => {
  const window = [];

  for (let step = 0; step <= KEYFRAME_STEPS; step += 1) {
    const progress = step / KEYFRAME_STEPS;
    const eased = ease(progress);
    const scale = startScale + (endScale - startScale) * eased;
    const angle = spin * (1 - eased);

    window.push({
      offset: progress,
      opacity: fade ? Math.min(1, eased * 1.5) : 1,
      transform: spin ? `rotate(${angle}deg) scale(${scale})` : `scale(${scale})`
    });
  }

  return { window };
};

function PixelSwap({
  firstContent,
  secondContent,
  pixelSize = 64,
  gap = 0,
  pixelRadius = 0,
  pixelSpin = 0,
  pixelScale = 0.35,
  fade = true,
  duration = 1400,
  pixelDuration = 450,
  pattern = 'random',
  randomness = 0,
  easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
  trigger = 'scroll',
  initialActive = false,
  active,
  onActiveChange,
  onComplete,
  className = '',
  style
}) {
  const [internalActive, setInternalActive] = useState(initialActive);
  const [shownActive, setShownActive] = useState(active ?? initialActive);
  const [transition, setTransition] = useState(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  const pixelRefs = useRef([]);
  const animationsRef = useRef([]);
  const timerRef = useRef(0);

  const desiredActive = active ?? internalActive;
  const incomingIndex = transition?.to ? 1 : 0;

  const grid = useMemo(
    () =>
      buildGrid({
        width: box.width || (typeof window !== 'undefined' ? window.innerWidth : 1280),
        height: box.height || (typeof window !== 'undefined' ? window.innerHeight : 800),
        pixelSize: Math.max(8, Math.round(pixelSize)),
        gap: Math.max(0, Math.round(gap)),
        pattern,
        randomness
      }),
    [box.width, box.height, pixelSize, gap, pattern, randomness]
  );

  const config = { duration, pixelDuration, pixelSpin, pixelScale, pixelRadius, fade, easing, onComplete };
  const configRef = useRef(config);
  const gridRef = useRef(grid);

  useEffect(() => {
    configRef.current = config;
    gridRef.current = grid;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      if (!width || !height) return;
      setBox(current => (current.width === width && current.height === height ? current : { width, height }));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const stopAnimations = useCallback(() => {
    animationsRef.current.forEach(animation => animation.cancel());
    animationsRef.current = [];
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = 0;
  }, []);

  useEffect(() => {
    if (transition || desiredActive === shownActive) return;
    setTransition({ to: desiredActive, grid: gridRef.current });
  }, [desiredActive, shownActive, transition]);

  useEffect(() => {
    if (!transition) return;
    const settings = configRef.current;
    const { grid: frozenGrid, to } = transition;

    let isDone = false;
    const finish = () => {
      if (isDone) return;
      isDone = true;
      stopAnimations();
      setShownActive(to);
      setTransition(null);
      settings.onComplete?.(to);
    };

    if (!frozenGrid.pixels.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    const total = Math.max(200, settings.duration);
    const pixelMs = clamp(settings.pixelDuration, 60, total);
    const spread = Math.max(0, total - pixelMs);
    const endScale = coverScale(frozenGrid.size, frozenGrid.gap, settings.pixelRadius);
    const keyframes = buildKeyframes({
      ease: makeEasing(settings.easing),
      startScale: clamp(settings.pixelScale, 0.05, 1) * endScale,
      endScale,
      spin: settings.pixelSpin,
      fade: settings.fade
    });

    frozenGrid.pixels.forEach((pixel, index) => {
      const pixelElement = pixelRefs.current[index];
      if (!pixelElement) return;

      const timing = { duration: pixelMs, delay: pixel.offset * spread, easing: 'linear', fill: 'both' };
      const a = pixelElement.animate(keyframes.window, timing);
      animationsRef.current.push(a);
    });

    // Native Web Animations API finished promise + timeout fallback
    Promise.all(animationsRef.current.map(a => a.finished))
      .then(() => finish())
      .catch(() => finish());

    timerRef.current = window.setTimeout(finish, total + 50);

    return () => {
      isDone = true;
    };
  }, [stopAnimations, transition]);

  const requestActive = useCallback(
    next => {
      if (active === undefined) setInternalActive(next);
      onActiveChange?.(next);
    },
    [active, onActiveChange]
  );

  // Scroll trigger integration: when user scrolls down from hero, activate pixel swap
  useEffect(() => {
    if (trigger !== 'scroll') return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled && !desiredActive) {
        requestActive(true);
      } else if (!isScrolled && desiredActive) {
        requestActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [desiredActive, requestActive, trigger]);

  const interactionProps = useMemo(() => {
    if (trigger === 'hover') {
      return {
        onMouseEnter: () => requestActive(true),
        onMouseLeave: () => requestActive(false),
        onFocus: () => requestActive(true),
        onBlur: () => requestActive(false),
        tabIndex: 0
      };
    }

    if (trigger === 'click') {
      return {
        onClick: () => requestActive(!desiredActive),
        onKeyDown: event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            requestActive(!desiredActive);
          }
        },
        role: 'button',
        tabIndex: 0
      };
    }

    return {};
  }, [desiredActive, requestActive, trigger]);

  const renderLayer = (content, index) => {
    const isShown = index === (shownActive ? 1 : 0);
    const isVisible = isShown && !(transition && index === incomingIndex);
    return (
      <div
        key={index}
        ref={element => {
          layerRefs.current[index] = element;
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: isShown ? 2 : 1,
          visibility: isVisible ? 'visible' : 'hidden',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isShown ? 'auto' : 'none',
        }}
        aria-hidden={!isShown}
      >
        {content}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`pixel-swap-container ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        outline: 'none',
        ...style
      }}
      data-active={shownActive}
      data-transitioning={!!transition}
      {...interactionProps}
    >
      {renderLayer(firstContent, 0)}
      {renderLayer(secondContent, 1)}

      {transition && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {transition.grid.pixels.map((pixel, index) => (
            <div
              key={pixel.id}
              ref={element => {
                pixelRefs.current[index] = element;
              }}
              style={{
                position: 'absolute',
                overflow: 'hidden',
                opacity: 0,
                contain: 'strict',
                willChange: 'transform, opacity',
                left: `${pixel.left}px`,
                top: `${pixel.top}px`,
                width: `${transition.grid.size + 1}px`,
                height: `${transition.grid.size + 1}px`,
                borderRadius: `${clamp(pixelRadius, 0, 50)}%`,
                backgroundColor: transition.to ? '#000000' : 'var(--paper)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PixelSwap;
