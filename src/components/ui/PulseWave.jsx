/* eslint-disable react/no-unknown-property */
'use client';
import React from 'react';

/**
 * PulseWave - CSS-only replacement untuk InteractiveWave
 * Fokus: ringan di mobile, tanpa canvas animation
 */
export default function PulseWave({ className = '' }) {
  return (
    <div 
      className={`pointer-events-none absolute inset-0 opacity-60 mix-blend-screen ${className}`}
      aria-hidden="true"
    >
      {/* CSS pulse effect - 3 gelombang concentric */}
      <div className="pulse-ring" />
      <div className="pulse-ring pulse-ring-2" />
      <div className="pulse-ring pulse-ring-3" />
    </div>
  );
}
