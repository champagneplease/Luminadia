'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [transitionKey, setTransitionKey] = useState(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTransitionKey(pathname);
    // Smoothly scroll to top on route change if not anchored
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return (
    <div
      key={transitionKey}
      className={`page-transition-wrapper w-full max-w-full overflow-x-hidden ${mounted ? 'animate-page-enter' : ''}`}
    >
      {children}
    </div>
  );
}
