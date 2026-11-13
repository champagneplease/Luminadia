'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Camera, Loader2, Edit3 } from 'lucide-react';
import { useVisualEditor } from '@/context/VisualEditorContext';
import { useSiteConfig, SiteImagesConfig, DEFAULT_SITE_IMAGES } from '@/context/SiteConfigContext';
import ImageCropModal from '@/components/ImageCropModal';

interface VisualEditableImageProps {
  imageKey: string;
  label: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export default function VisualEditableImage({
  imageKey,
  label,
  defaultSrc,
  alt,
  className = '',
  imageClassName = 'object-cover',
  fill = false,
  priority = false,
  sizes,
  width,
  height,
  borderRadius = 0,
}: VisualEditableImageProps) {
  const {
    isEditorActive,
    isAdmin,
    previewMode,
    activeFieldKey,
    selectField,
    setPendingChange,
    getEffectiveValue,
    registerField,
  } = useVisualEditor();
  const { uploadImageFile } = useSiteConfig();

  const isEnabled = isEditorActive && isAdmin && !previewMode;
  const isEditing = isEnabled && activeFieldKey === imageKey;

  // Resolución segura de la URL con triple capa de fallback
  const resolveSafeSrc = useCallback((): string => {
    const effective = getEffectiveValue ? getEffectiveValue(imageKey, defaultSrc) : defaultSrc;
    if (effective && typeof effective === 'string' && effective.trim() !== '') {
      if ((imageKey === 'hero' || imageKey === 'image_hero') && effective === '/images/hero.jpg') {
        return DEFAULT_SITE_IMAGES.hero;
      }
      return effective;
    }
    const cleanKey = (imageKey.startsWith('image_') ? imageKey.replace(/^image_/, '') : imageKey) as keyof SiteImagesConfig;
    return defaultSrc || DEFAULT_SITE_IMAGES[cleanKey] || `/images/${cleanKey}.jpg`;
  }, [getEffectiveValue, imageKey, defaultSrc]);

  const [mediaSrc, setMediaSrc] = useState<string>(resolveSafeSrc);

  useEffect(() => {
    setMediaSrc(resolveSafeSrc());
  }, [resolveSafeSrc]);

  // Registrar imagen en el catálogo del editor
  useEffect(() => {
    if (!isEnabled) return;
    return registerField({
      key: imageKey,
      label,
      type: 'image',
      currentValue: mediaSrc,
      defaultValue: defaultSrc,
    });
  }, [isEnabled, imageKey, label, mediaSrc, defaultSrc, registerField]);

  const handleImageError = () => {
    const cleanKey = (imageKey.startsWith('image_') ? imageKey.replace(/^image_/, '') : imageKey) as keyof SiteImagesConfig;
    const fallback = defaultSrc || DEFAULT_SITE_IMAGES[cleanKey] || `/images/${cleanKey}.jpg`;
    if (mediaSrc !== fallback) {
      console.warn(`[VisualEditableImage] Error al cargar "${mediaSrc}" para "${imageKey}". Revertiendo automáticamente al fallback: "${fallback}".`);
      setMediaSrc(fallback);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCropFile, setSelectedCropFile] = useState<File | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(mediaSrc);

  const handleClick = (e: React.MouseEvent) => {
    if (!isEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    selectField({
      key: imageKey,
      label,
      type: 'image',
      currentValue: mediaSrc,
      defaultValue: defaultSrc,
    });
  };

  const handleTriggerUpload = (e: React.MouseEvent) => {
    if (!isEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      handleUploadDirect(file);
    } else {
      setSelectedCropFile(file);
      setIsCropModalOpen(true);
    }
    e.target.value = '';
  };

  const handleUploadDirect = async (file: File) => {
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImageFile(file, imageKey);
      setPendingChange(imageKey, uploadedUrl);
      setMediaSrc(uploadedUrl);
    } catch (err) {
      console.error('Error uploading media:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCropComplete = async (croppedFile: File) => {
    setIsCropModalOpen(false);
    setSelectedCropFile(null);
    await handleUploadDirect(croppedFile);
  };

  const handleUseOriginal = async (originalFile: File) => {
    setIsCropModalOpen(false);
    setSelectedCropFile(null);
    await handleUploadDirect(originalFile);
  };

  // Prevenir conflicto entre position: relative y position: absolute
  const hasPosition = /\b(absolute|fixed|relative|sticky)\b/.test(className);
  const positionClass = hasPosition ? '' : 'relative';
  const hasDimensions = /\b(w-|h-|inset-)\b/.test(className);
  const dimensionClass = fill && !hasDimensions ? 'w-full h-full' : '';

  const wrapperClass = [
    positionClass,
    dimensionClass,
    className,
    isEnabled ? 'group/editable-img cursor-pointer' : '',
    isEditing ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black/20 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <div
      data-editable-key={imageKey}
      onClick={handleClick}
      className={wrapperClass}
      style={{ borderRadius: `${borderRadius}px` }}
      title={isEnabled ? (isEditing ? `Editando: ${label}` : `Clic para editar foto o video de: ${label}`) : undefined}
    >
      {/* Input de archivo oculto */}
      {isEnabled && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      {/* Contenido multimedia (video o imagen) */}
      {isVideo ? (
        <video
          src={mediaSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={handleImageError}
          className={`w-full h-full ${imageClassName}`}
        />
      ) : fill ? (
        <Image
          src={mediaSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || (fill ? '100vw' : undefined)}
          onError={handleImageError}
          className={imageClassName}
        />
      ) : (
        <Image
          src={mediaSrc}
          alt={alt}
          width={width || 600}
          height={height || 400}
          priority={priority}
          sizes={sizes}
          onError={handleImageError}
          className={imageClassName}
        />
      )}

      {/* Overlay visible al pasar el cursor o al estar activo */}
      {isEnabled && (
        <div
          data-ui="true"
          className={`absolute inset-0 bg-[#1E242B]/60 transition-opacity flex flex-col items-center justify-center gap-2 text-white z-30 p-4 text-center rounded-sm select-none ${
            isEditing ? 'opacity-100' : 'opacity-0 group-hover/editable-img:opacity-100'
          }`}
        >
          {isUploading ? (
            <div className="flex items-center gap-2 font-bold text-xs bg-[#1E242B]/90 px-3 py-1.5 rounded-full border border-blue-500/40">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span>Subiendo archivo...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-white text-[#1E242B] flex items-center justify-center shadow-lg transform transition-transform group-hover/editable-img:scale-105">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-black tracking-tight">{label}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerUpload}
                  className="text-[11px] px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-sm"
                >
                  Subir archivo
                </button>
                <button
                  type="button"
                  onClick={handleClick}
                  className="text-[11px] px-3 py-1 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors"
                >
                  Ajustes
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Badge flotante indicador */}
      {isEditing && (
        <span
          data-ui="true"
          className="pointer-events-none absolute -top-3.5 -right-2 flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg z-30 animate-pulse select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Editando Imagen</span>
        </span>
      )}

      {/* Modal de recorte y zoom interactivo */}
      {isCropModalOpen && selectedCropFile && (
        <ImageCropModal
          isOpen={isCropModalOpen}
          file={selectedCropFile}
          onClose={() => {
            setIsCropModalOpen(false);
            setSelectedCropFile(null);
          }}
          onCropComplete={handleCropComplete}
          onUseOriginal={handleUseOriginal}
          targetSectionName={label}
        />
      )}
    </div>
  );
}
