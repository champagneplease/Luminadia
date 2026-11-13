'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Crop,
  Check,
  Move,
  CornerDownRight,
  Maximize2,
} from 'lucide-react';

interface ImageCropModalProps {
  isOpen: boolean;
  file: File | null;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
  onUseOriginal: (originalFile: File) => void;
  targetSectionName?: string;
}

type AspectRatio = '16:9' | '4:3' | '1:1' | 'free';

export default function ImageCropModal({
  isOpen,
  file,
  onClose,
  onCropComplete,
  onUseOriginal,
  targetSectionName = 'la sección',
}: ImageCropModalProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [borderRadius, setBorderRadius] = useState<number>(0);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar imagen cuando el archivo cambia
  useEffect(() => {
    if (!file) {
      setImageSrc(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    setBorderRadius(0);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // Manejo de arrastre (Pan)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calcular clases de relación de aspecto del marco
  const getAspectClasses = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square max-w-md';
      case 'free':
      default:
        return 'h-72 sm:h-96';
    }
  };

  // Exportar recorte a Canvas
  const handleExportCrop = useCallback(async () => {
    if (!file || !imageRef.current || !containerRef.current) return;
    setIsProcessing(true);

    try {
      const img = imageRef.current;
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const outputWidth = 1920;
      const targetAspect =
        aspectRatio === '16:9'
          ? 16 / 9
          : aspectRatio === '4:3'
          ? 4 / 3
          : aspectRatio === '1:1'
          ? 1
          : containerRect.width / containerRect.height;

      const outputHeight = Math.round(outputWidth / targetAspect);

      const canvas = document.createElement('canvas');
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No se pudo inicializar el contexto de dibujo.');
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Redondeo si se solicitó
      if (borderRadius > 0) {
        const radiusScale = (outputWidth / containerRect.width) * borderRadius;
        ctx.beginPath();
        ctx.roundRect(0, 0, outputWidth, outputHeight, radiusScale);
        ctx.clip();
      }

      // Transformaciones: Centrar, rotar, escalar y desplazar
      ctx.save();
      ctx.translate(outputWidth / 2, outputHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      const scaleX = (outputWidth / containerRect.width) * zoom;
      const scaleY = (outputHeight / containerRect.height) * zoom;
      const scale = Math.max(scaleX, scaleY);

      const drawWidth = img.naturalWidth * (containerRect.width / img.naturalWidth) * scale;
      const drawHeight = img.naturalHeight * (containerRect.height / img.naturalHeight) * scale;

      const panX = offset.x * (outputWidth / containerRect.width);
      const panY = offset.y * (outputHeight / containerRect.height);

      ctx.drawImage(
        img,
        -drawWidth / 2 + panX,
        -drawHeight / 2 + panY,
        drawWidth,
        drawHeight
      );
      ctx.restore();

      // Convertir a Blob WebP de alta fidelidad
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            onUseOriginal(file);
            return;
          }
          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const croppedFile = new File([blob], `${baseName}-cropped.webp`, {
            type: 'image/webp',
          });
          onCropComplete(croppedFile);
        },
        'image/webp',
        0.93
      );
    } catch (err) {
      console.error('Error al procesar el recorte:', err);
      onUseOriginal(file);
    } finally {
      setIsProcessing(false);
    }
  }, [file, aspectRatio, borderRadius, zoom, rotation, offset, onCropComplete, onUseOriginal]);

  if (!isOpen || !file || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E242B]/80 animate-fade-in">
      <div
        data-ui="true"
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden border border-[#B3B6B9]/40 flex flex-col max-h-[92vh]"
      >
        {/* Cabecera del modal */}
        <div data-ui="true" className="px-6 py-4 flex items-center justify-between border-b border-[#B3B6B9]/30 bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E242B] text-white flex items-center justify-center">
              <Crop className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E242B]">
                Editor de Enfoque y Recorte
              </h3>
              <p className="text-xs text-[#4A545E]">
                Ajustá el encuadre, acercá detalles y recortá antes de publicar en {targetSectionName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#4A545E] hover:text-[#1E242B] rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Área interactiva de previsualización */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              data-ui="true"
              style={{ borderRadius: `${borderRadius}px` }}
              className={`relative w-full ${getAspectClasses()} overflow-hidden bg-[#1E242B] border-2 border-dashed border-[#B3B6B9] cursor-grab active:cursor-grabbing select-none transition-[border-radius] duration-200`}
            >
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Previsualización para recorte"
                draggable={false}
                style={{
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Guía de tercios SVG sutil para composición fotográfica */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                <line x1="33.33%" y1="0%" x2="33.33%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="66.66%" y1="0%" x2="66.66%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0%" y1="33.33%" x2="100%" y2="33.33%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0%" y1="66.66%" x2="100%" y2="66.66%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Pistas de arrastre */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#1E242B]/90 text-white text-[11px] font-medium flex items-center gap-1.5 pointer-events-none">
                <Move className="w-3 h-3 text-white" />
                <span>Arrastrá para reencuadrar</span>
              </div>
            </div>
          </div>

          {/* Barra de Controles: Proporción, Zoom, Redondeo y Rotación */}
          <div data-ui="true" className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#B3B6B9]/40 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Selector de relación de aspecto */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1E242B]">
                  Proporción de Recorte
                </label>
                <div className="flex gap-2">
                  {[
                    { id: '16:9', label: '16:9 (Paisaje)' },
                    { id: '4:3', label: '4:3 (Foto)' },
                    { id: '1:1', label: '1:1 (Cuadrado)' },
                    { id: 'free', label: 'Libre' },
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => setAspectRatio(ratio.id as AspectRatio)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-colors ${
                        aspectRatio === ratio.id
                          ? 'bg-[#1E242B] text-white'
                          : 'bg-white text-[#4A545E] hover:bg-[#F1F3F5] border border-[#B3B6B9]/30'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider de Zoom / Acercamiento */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="crop-zoom" className="font-bold text-[#1E242B]">
                    Acercamiento / Zoom ({zoom.toFixed(1)}x)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setOffset({ x: 0, y: 0 });
                    }}
                    className="text-[#4A545E] hover:text-[#1E242B] text-[11px] underline"
                  >
                    Restablecer
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut className="w-4 h-4 text-[#4A545E] shrink-0" />
                  <input
                    id="crop-zoom"
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-[#1E242B] cursor-pointer"
                  />
                  <ZoomIn className="w-4 h-4 text-[#4A545E] shrink-0" />
                </div>
              </div>
            </div>

            {/* Fila secundaria: Redondeo de esquinas y Rotación */}
            <div data-ui="true" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#B3B6B9]/20">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="crop-radius" className="font-bold text-[#1E242B]">
                    Redondeo de Esquinas ({borderRadius}px)
                  </label>
                  <div className="flex gap-1.5">
                    {[0, 16, 28, 48].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setBorderRadius(r)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          borderRadius === r
                            ? 'bg-[#1E242B] text-white'
                            : 'bg-white text-[#4A545E] border border-[#B3B6B9]/30'
                        }`}
                      >
                        {r}px
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  id="crop-radius"
                  type="range"
                  min="0"
                  max="48"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(parseInt(e.target.value, 10))}
                  className="w-full accent-[#1E242B] cursor-pointer"
                />
              </div>

              <div className="flex items-end justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F1F3F5] border border-[#B3B6B9]/40 text-xs font-semibold text-[#1E242B] flex items-center gap-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotar 90° ({rotation}°)</span>
                </button>

                <p className="text-[11px] text-[#6C7680] text-right leading-tight">
                  Formato final optimizado en <strong>WebP</strong> de alta fidelidad sin peso excesivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie del modal con acciones */}
        <div data-ui="true" className="px-6 py-4 border-t border-[#B3B6B9]/30 bg-[#F8F9FA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onUseOriginal(file)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#F1F3F5] text-xs font-semibold text-[#4A545E] hover:text-[#1E242B] border border-[#B3B6B9]/40 transition-colors"
          >
            Usar archivo original sin recortar
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-white hover:bg-[#F1F3F5] text-xs font-semibold text-[#1E242B] border border-[#B3B6B9]/40 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleExportCrop}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E242B] hover:bg-[#283039] text-white text-xs font-bold transition-colors disabled:opacity-50"
            >
              <Check className="w-4 h-4 text-white" />
              <span>{isProcessing ? 'Procesando...' : 'Guardar y Subir'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
