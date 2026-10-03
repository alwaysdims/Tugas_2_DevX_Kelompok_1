import { useState, useEffect } from 'react';

/**
 * useIsMobile - detect touch device vs desktop
 * Menggunakan navigator.maxTouchPoints (bukan window.innerWidth)
 * karena ini detection berdasarkan capability, bukan screen size.
 */
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // navigator.maxTouchPoints > 0 berarti device punya touch capability
      setIsMobile(navigator.maxTouchPoints > 0);
    };

    // Check pertama
    checkMobile();

    // Listen untuk resize (tapi ini jarang terjadi perubahan capability)
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}
