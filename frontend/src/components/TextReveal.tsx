'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children?: string;
  text?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  wordClassName?: string;
  staggerMs?: number;
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * TextReveal: animación profesional de revelado cinético de texto palabra por palabra.
 * Cada palabra se desplaza suavemente hacia arriba desde una máscara oculta (clip/overflow)
 * con un ligero desenfoque y opacidad progresiva a medida que el usuario se desplaza.
 */
export default function TextReveal({
  children,
  text,
  as: Component = 'span',
  className = '',
  wordClassName = '',
  staggerMs = 35,
  delayMs = 0,
  durationMs = 800,
  threshold = 0.15,
  once = true,
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const rawText = text || children || '';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respetar preferencias de accesibilidad
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
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Dividir el texto en palabras conservando espacios
  const words = rawText.split(' ');

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block ${className}`}
      aria-label={rawText}
    >
      {words.map((word, index) => {
        const transitionDelay = `${delayMs + index * staggerMs}ms`;
        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-baseline mr-[0.28em] last:mr-0 py-0.5"
          >
            <span
              className={`inline-block will-change-[transform,opacity,filter] ${wordClassName}`}
              style={{
                transitionProperty: 'transform, opacity, filter',
                transitionDuration: `${durationMs}ms`,
                transitionDelay,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isVisible
                  ? 'translate3d(0, 0, 0)'
                  : 'translate3d(0, 115%, 0)',
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? 'blur(0px)' : 'blur(4px)',
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
