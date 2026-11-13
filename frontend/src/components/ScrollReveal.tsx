'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  once?: boolean;
  blur?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  durationMs = 950,
  direction = 'up',
  threshold = 0.1,
  once = true,
  blur = false,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 36px, 0)';
      case 'down':
        return 'translate3d(0, -36px, 0)';
      case 'left':
        return 'translate3d(36px, 0, 0)';
      case 'right':
        return 'translate3d(-36px, 0, 0)';
      case 'none':
        return 'translate3d(0, 0, 0)';
      default:
        return 'translate3d(0, 36px, 0)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`will-change-[transform,opacity,filter] ${className}`}
      style={{
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform(),
        filter: isVisible ? 'blur(0px)' : (blur ? 'blur(6px)' : 'none'),
      }}
    >
      {children}
    </div>
  );
}
