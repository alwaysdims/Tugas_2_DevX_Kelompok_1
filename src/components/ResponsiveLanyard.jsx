/* eslint-disable react/no-unknown-property */
'use client';
import React, { lazy, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const Lanyard = lazy(() => import('./Lanyard'));

/**
 * ResponsiveLanyard — conditional rendering berdasarkan device type
 * - Mobile: CSS-only card (ringan, no 3D)
 * - Desktop: three.js 3D card (Lanyard component asli)
 */

function MobileLanyardCard({ frontImage, className = '', style = {} }) {
  return (
    <div className={`lanyard-mobile-card ${className}`} style={style}>
      <div className="lanyard-front">
        <img src={frontImage || '/lutfi.jpeg'} alt="Profile" className="lanyard-img" />
      </div>
    </div>
  );
}

export default function ResponsiveLanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = '/lutfi.jpeg',
  backImage = '/lutfi.jpeg',
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  className = '',
  style = {}
}) {
  const isMobile = useIsMobile();

  // Mobile: CSS-only card
  if (isMobile) {
    return <MobileLanyardCard frontImage={frontImage} className={className} style={style} />;
  }

  // Desktop: three.js 3D card (lazy loaded)
  return (
    <Suspense fallback={<MobileLanyardCard frontImage={frontImage} backImage={backImage} className={className} />}>
      <Lanyard
        position={position}
        gravity={gravity}
        fov={fov}
        transparent={transparent}
        frontImage={frontImage}
        backImage={backImage}
        imageFit={imageFit}
        lanyardImage={lanyardImage}
        lanyardWidth={lanyardWidth}
        className={className}
        style={style}
      />
    </Suspense>
  );
}
