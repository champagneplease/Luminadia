'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function InitialPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user already saw the intro in this session
    const hasSeenIntro = sessionStorage.getItem('luminadia_intro_shown');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setLoading(false);
      setShouldRender(false);
      return;
    }

    // Animate progress smoothly
    const start = performance.now();
    const duration = 750; // ms

    const frame = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('luminadia_intro_shown', 'true');
          // Unmount after curtain exit transition finishes
          setTimeout(() => setShouldRender(false), 900);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-[transform,opacity] duration-800 pointer-events-none select-none ${
        loading
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)]'
      }`}
      style={{
        transitionDuration: '750ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-sm w-full space-y-6">
        {/* Official LuminADia Solar Emblem */}
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
          <Image
            src="/images/luminadia-logo.png"
            alt="LuminADia"
            width={80}
            height={80}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Wordmark and Subtitle */}
        <div className="space-y-1">
          <span className="block text-2xl font-black tracking-tight text-[#1E242B]">
            LuminADia
          </span>
          <span className="block text-[11px] font-semibold tracking-wider text-[#6C7680]">
            LÁMINAS DE CONTROL SOLAR
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-48 h-1 bg-[#D8DADC] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#1E242B] rounded-full transition-[width] ease-out"
            style={{
              width: `${progress}%`,
              transitionDuration: '80ms',
            }}
          />
        </div>
      </div>
    </div>
  );
}
