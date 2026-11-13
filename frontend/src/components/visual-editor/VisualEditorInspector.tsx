'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Type,
  AlignLeft,
  Link as LinkIcon,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Minus,
  Maximize2,
  RotateCcw,
  Check,
  Upload,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { useVisualEditor } from '@/context/VisualEditorContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import ImageCropModal from '@/components/ImageCropModal';

const QUICK_URL_PRESETS = [
  { label: 'Cotización', url: '/contacto' },
  { label: 'Calculadora', url: '/calculadora-materiales' },
  { label: 'Catálogo', url: '/laminas' },
  { label: 'Automotriz', url: '/servicios/automotriz' },
  { label: 'Hogares', url: '/servicios/hogares' },
  { label: 'Empresas', url: '/servicios/comercios-empresas' },
  { label: 'WhatsApp', url: 'https://wa.me/5493834272000' },
];

export default function VisualEditorInspector() {
  const {
    isEditorActive,
    isAdmin,
    previewMode,
    activeField,
    closeField,
    selectNextField,
    selectPrevField,
    setPendingChange,
    getEffectiveValue,
    registeredFields,
    toggleDrawer,
  } = useVisualEditor();

  const { uploadImageFile } = useSiteConfig();

  const [isMinimized, setIsMinimized] = useState(false);
  const [localText, setLocalText] = useState('');
  const [localUrl, setLocalUrl] = useState('');
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar estado local al cambiar el campo activo
  useEffect(() => {
    if (!activeField) return;

    const currentVal = getEffectiveValue(activeField.key, activeField.currentValue || activeField.defaultValue || '');
    setLocalText(currentVal);

    if (activeField.urlKey) {
      const currentU = getEffectiveValue(activeField.urlKey, activeField.currentUrl || activeField.defaultUrl || '');
      setLocalUrl(currentU);
    }
  }, [activeField, getEffectiveValue]);

  // Manejar atajos de teclado (Esc para cerrar, Enter para confirmar)
  useEffect(() => {
    if (!activeField) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeField();
      } else if (e.key === 'Enter' && !e.shiftKey && activeField.type !== 'multiline') {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT') {
          e.preventDefault();
          closeField();
        }
      } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && activeField.type === 'multiline') {
        e.preventDefault();
        closeField();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeField, closeField]);

  if (!isEditorActive || !isAdmin || previewMode || !activeField) {
    return null;
  }

  const handleTextChange = (newVal: string) => {
    setLocalText(newVal);
    setPendingChange(activeField.key, newVal);
  };

  const handleUrlChange = (newVal: string) => {
    setLocalUrl(newVal);
    if (activeField.urlKey) {
      setPendingChange(activeField.urlKey, newVal);
    }
  };

  const handleResetOriginal = () => {
    const fallbackText = activeField.defaultValue || '';
    setLocalText(fallbackText);
    setPendingChange(activeField.key, fallbackText);

    if (activeField.urlKey && activeField.defaultUrl) {
      setLocalUrl(activeField.defaultUrl);
      setPendingChange(activeField.urlKey, activeField.defaultUrl);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      handleDirectUpload(file);
    } else {
      setCropFile(file);
      setIsCropOpen(true);
    }
    e.target.value = '';
  };

  const handleDirectUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImageFile(file, activeField.key);
      setLocalText(uploadedUrl);
      setPendingChange(activeField.key, uploadedUrl);
    } catch (err) {
      console.error('Error uploading file in inspector:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCropComplete = async (croppedFile: File) => {
    setIsCropOpen(false);
    setCropFile(null);
    await handleDirectUpload(croppedFile);
  };

  const currentIndex = registeredFields.findIndex((f) => f.key === activeField.key);
  const totalFields = registeredFields.length;
  const isVideo = activeField.type === 'image' && /\.(mp4|webm|mov|ogg)$/i.test(localText);

  // Renderizado modo minimizado
  if (isMinimized) {
    return (
      <div
        data-ui="true"
        className="fixed bottom-6 right-6 z-[99998] flex items-center gap-2 bg-[#1E242B]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-[#374151] shadow-2xl animate-fade-in select-none"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
        <span className="text-xs font-bold truncate max-w-[200px] text-slate-200">
          {activeField.label}
        </span>
        <span className="text-[#64748B]">|</span>
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="p-1 rounded-md hover:bg-[#283039] text-slate-300 hover:text-white transition-colors"
          title="Expandir Inspector"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={closeField}
          className="p-1 rounded-md hover:bg-[#283039] text-slate-300 hover:text-white transition-colors"
          title="Cerrar Inspector (Esc)"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Tarjeta flotante fija del Inspector */}
      <aside
        data-ui="true"
        aria-label="Inspector de Bloque"
        className="fixed bottom-6 right-6 z-[99998] w-96 max-w-[calc(100vw-2rem)] bg-[#1E242B]/95 backdrop-blur-xl text-white rounded-2xl border border-[#374151] shadow-2xl overflow-hidden flex flex-col animate-fade-in transition-all duration-200"
      >
        {/* Cabecera del Inspector */}
        <div className="px-4 py-3 bg-[#171C22]/90 border-b border-[#283039] flex items-center justify-between gap-2 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
              {activeField.type === 'image' ? (
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
              ) : activeField.type === 'button' ? (
                <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
              ) : activeField.type === 'multiline' ? (
                <AlignLeft className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <Type className="w-3.5 h-3.5 text-blue-400" />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-bold text-white truncate leading-tight">
                {activeField.label}
              </h2>
              <span className="text-[10px] text-[#94A3B8] font-mono block truncate">
                {activeField.key}
              </span>
            </div>
          </div>

          {/* Navegación y acciones rápidas */}
          <div className="flex items-center gap-1 shrink-0">
            {totalFields > 1 && (
              <div className="flex items-center bg-[#283039] rounded-lg border border-[#374151] mr-1">
                <button
                  type="button"
                  onClick={selectPrevField}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Bloque anterior (Shift+Tab)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono font-medium px-1 text-slate-300">
                  {currentIndex >= 0 ? currentIndex + 1 : 1}/{totalFields}
                </span>
                <button
                  type="button"
                  onClick={selectNextField}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Bloque siguiente (Tab)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors"
              title="Minimizar"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={closeField}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors"
              title="Cerrar (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Cuerpo del formulario según tipo */}
        <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Tipo Texto simple */}
          {activeField.type === 'text' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block flex items-center justify-between">
                <span>Contenido del texto</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {localText.length} caracteres
                </span>
              </label>
              <input
                type="text"
                value={localText}
                onChange={(e) => handleTextChange(e.target.value)}
                autoFocus
                className="w-full bg-[#12161A] text-white text-sm rounded-xl px-3.5 py-2.5 border border-[#374151] focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-slate-500 font-sans"
                placeholder="Escribe el texto aquí..."
              />
            </div>
          )}

          {/* Tipo Texto multilínea / párrafo */}
          {activeField.type === 'multiline' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block flex items-center justify-between">
                <span>Párrafo o contenido extenso</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {localText.length} caracteres · {localText.split('\n').length} líneas
                </span>
              </label>
              <textarea
                value={localText}
                onChange={(e) => handleTextChange(e.target.value)}
                autoFocus
                rows={Math.min(6, Math.max(3, localText.split('\n').length + 1))}
                className="w-full bg-[#12161A] text-white text-sm rounded-xl px-3.5 py-2.5 border border-[#374151] focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-slate-500 font-sans resize-y leading-relaxed"
                placeholder="Escribe el párrafo aquí..."
              />
              <span className="text-[10px] text-slate-400 block">
                Presiona <kbd className="px-1 py-0.5 bg-[#283039] rounded text-[9px] font-mono">Ctrl+Enter</kbd> para confirmar.
              </span>
            </div>
          )}

          {/* Tipo Botón: Texto y Enlace */}
          {activeField.type === 'button' && (
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Texto del botón
                </label>
                <input
                  type="text"
                  value={localText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  autoFocus
                  className="w-full bg-[#12161A] text-white text-sm rounded-xl px-3 py-2 border border-[#374151] focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Ej: Cotizar Ahora"
                />
              </div>

              {activeField.urlKey && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block flex items-center justify-between">
                    <span>Destino del enlace (URL o ruta)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </label>
                  <input
                    type="text"
                    value={localUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="w-full bg-[#12161A] text-white text-xs font-mono rounded-xl px-3 py-2 border border-[#374151] focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="/contacto o https://..."
                  />

                  {/* Chips de enlaces rápidos */}
                  <div className="pt-1">
                    <span className="text-[10px] text-slate-400 block mb-1 font-medium">
                      Accesos rápidos del sitio:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_URL_PRESETS.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => handleUrlChange(preset.url)}
                          className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                            localUrl === preset.url
                              ? 'bg-blue-600 text-white border-blue-500 font-bold'
                              : 'bg-[#283039] text-slate-300 border-[#374151] hover:text-white hover:bg-[#323D48]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tipo Imagen / Video */}
          {activeField.type === 'image' && (
            <div className="space-y-3.5">
              {/* Miniatura actual */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Vista previa de la imagen actual
                </label>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#12161A] border border-[#374151] flex items-center justify-center">
                  {isVideo ? (
                    <video
                      src={localText}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : localText ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={localText}
                      alt={activeField.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Botón para subir o recortar foto */}
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/mp4,video/webm,video/quicktime"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-md shadow-blue-600/20"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {isUploading ? 'Subiendo archivo...' : 'Subir o Recortar Foto / Video'}
                  </span>
                </button>

                {/* Input de URL directa */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block">
                    O pega una URL directa de imagen o video:
                  </span>
                  <input
                    type="text"
                    value={localText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="https://... o /images/..."
                    className="w-full bg-[#12161A] text-white text-xs font-mono rounded-xl px-3 py-2 border border-[#374151] focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Indicador de actualización en tiempo real */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Actualización en vivo</span>
            </span>

            {/* Botón para restaurar original */}
            {(activeField.defaultValue || activeField.defaultUrl) && (
              <button
                type="button"
                onClick={handleResetOriginal}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                title="Volver al valor predeterminado"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar original</span>
              </button>
            )}
          </div>
        </div>

        {/* Pie del Inspector con acciones */}
        <div className="px-4 py-3 bg-[#171C22]/90 border-t border-[#283039] flex items-center justify-between gap-2 select-none">
          <button
            type="button"
            onClick={toggleDrawer}
            className="text-[11px] font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Ver todos los bloques</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeField}
              className="px-4 py-1.5 rounded-xl bg-white text-[#1E242B] hover:bg-neutral-200 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Listo</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Modal de recorte de imagen interactivo */}
      {isCropOpen && cropFile && (
        <ImageCropModal
          isOpen={isCropOpen}
          file={cropFile}
          onClose={() => {
            setIsCropOpen(false);
            setCropFile(null);
          }}
          onCropComplete={handleCropComplete}
          onUseOriginal={handleDirectUpload}
          targetSectionName={activeField.label}
        />
      )}
    </>
  );
}
