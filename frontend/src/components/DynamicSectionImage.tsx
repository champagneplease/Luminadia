'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { useSiteConfig, SiteImagesConfig, DEFAULT_SITE_IMAGES } from '@/context/SiteConfigContext';
import { useVisualEditor } from '@/context/VisualEditorContext';

interface DynamicSectionImageProps extends Omit<ImageProps, 'src'> {
  section: keyof SiteImagesConfig;
  fallbackSrc?: string;
}

export default function DynamicSectionImage({
  section,
  fallbackSrc,
  alt,
  className = '',
  style,
  sizes,
  ...props
}: DynamicSectionImageProps) {
  const { images } = useSiteConfig();
  const visualEditor = useVisualEditor();

  const resolveSafeSrc = useCallback((): string => {
    // Si el editor visual tiene un cambio pendiente o draft
    const editorVal = visualEditor?.getEffectiveValue
      ? visualEditor.getEffectiveValue(section, images[section])
      : null;

    if (editorVal && typeof editorVal === 'string' && editorVal.trim() !== '') {
      return editorVal;
    }
    if (images[section] && typeof images[section] === 'string' && images[section].trim() !== '') {
      return images[section];
    }
    return fallbackSrc || DEFAULT_SITE_IMAGES[section] || `/images/${section}.jpg`;
  }, [visualEditor, section, images, fallbackSrc]);

  const [currentSrc, setCurrentSrc] = useState<string>(resolveSafeSrc);

  useEffect(() => {
    setCurrentSrc(resolveSafeSrc());
  }, [resolveSafeSrc]);

  const handleImageError = () => {
    const safeFallback = fallbackSrc || DEFAULT_SITE_IMAGES[section] || `/images/${section}.jpg`;
    if (currentSrc !== safeFallback) {
      console.warn(`[DynamicSectionImage] Error al cargar "${currentSrc}" para sección "${section}". Revertiendo a: "${safeFallback}".`);
      setCurrentSrc(safeFallback);
    }
  };

  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(currentSrc);

  if (isVideo) {
    return (
      <video
        src={currentSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={handleImageError}
        className={`w-full h-full object-cover object-center ${className}`}
        style={style}
        title={alt as string}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      sizes={sizes || (props.fill ? '(max-width: 1024px) 100vw, 50vw' : undefined)}
      onError={handleImageError}
      {...props}
    />
  );
}
