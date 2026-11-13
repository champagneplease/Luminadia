'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Edit3,
  Eye,
  Save,
  RotateCcw,
  ArrowLeft,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
} from 'lucide-react';
import { useVisualEditor } from '@/context/VisualEditorContext';
import VisualEditorInspector from './VisualEditorInspector';
import VisualEditorBlocksDrawer from './VisualEditorBlocksDrawer';

export default function VisualEditorToolbar() {
  const {
    isEditorActive,
    isAdmin,
    previewMode,
    pendingChanges,
    isSaving,
    feedbackMessage,
    hasChanges,
    togglePreviewMode,
    exitEditorMode,
    saveAllChanges,
    discardAllChanges,
    clearFeedback,
    registeredFields,
    toggleDrawer,
  } = useVisualEditor();

  // Ajustar espaciado del body para que la barra fija no tape la Navbar
  useEffect(() => {
    if (isEditorActive && isAdmin && !previewMode) {
      document.body.classList.add('has-visual-editor-bar');
    } else {
      document.body.classList.remove('has-visual-editor-bar');
    }
    return () => {
      document.body.classList.remove('has-visual-editor-bar');
    };
  }, [isEditorActive, isAdmin, previewMode]);

  if (!isEditorActive || !isAdmin) {
    return null;
  }

  const changesCount = Object.keys(pendingChanges).length;
  const totalFields = registeredFields.length;

  return (
    <>
      {/* Barra de herramientas flotante fija superior */}
      <header
        data-ui="true"
        data-editor-header="true"
        className="fixed top-0 left-0 right-0 z-[99999] bg-[#171C22] text-white border-b border-[#374151] select-none text-xs h-12 flex items-center shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between gap-3">
          {/* Lado izquierdo: Estado del editor y explorador de bloques */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  hasChanges ? 'bg-amber-400 ring-4 ring-amber-400/20' : 'bg-emerald-400 ring-4 ring-emerald-400/20'
                }`}
              />
              <span className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5 tracking-tight">
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Editor Visual en Vivo</span>
                <span className="sm:hidden">Editor</span>
              </span>
            </div>

            <span className="text-[#374151] hidden md:inline">|</span>

            {/* Botón para abrir el cajón de todos los bloques */}
            <button
              type="button"
              onClick={toggleDrawer}
              className="px-2.5 py-1 rounded-lg bg-[#283039] hover:bg-[#323D48] text-slate-200 hover:text-white border border-[#374151] font-semibold text-[11px] flex items-center gap-1.5 transition-colors shrink-0"
              title="Ver catálogo de todos los bloques editables"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Bloques</span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-600/30 text-blue-300 text-[10px] font-bold">
                {totalFields}
              </span>
            </button>

            {/* Contador de cambios pendientes */}
            <div className="hidden lg:flex items-center gap-1.5 shrink-0">
              {hasChanges ? (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30">
                  {changesCount} {changesCount === 1 ? 'cambio pendiente' : 'cambios pendientes'}
                </span>
              ) : (
                <span className="text-slate-400 text-[11px] font-medium">
                  Sin cambios
                </span>
              )}
            </div>
          </div>

          {/* Centro: Alternador de Modo Edición vs Vista Previa */}
          <div data-ui="true" className="flex items-center bg-[#283039] p-0.5 rounded-lg border border-[#374151] shrink-0">
            <button
              type="button"
              onClick={() => previewMode && togglePreviewMode()}
              className={`px-2.5 sm:px-3 py-1 rounded-md flex items-center gap-1.5 font-bold transition-all ${
                !previewMode
                  ? 'bg-white text-[#1E242B] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edición</span>
            </button>
            <button
              type="button"
              onClick={() => !previewMode && togglePreviewMode()}
              className={`px-2.5 sm:px-3 py-1 rounded-md flex items-center gap-1.5 font-bold transition-all ${
                previewMode
                  ? 'bg-white text-[#1E242B] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vista Previa</span>
            </button>
          </div>

          {/* Lado derecho: Acciones de Guardado, Descarte y Retorno */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Descartar cambios */}
            {hasChanges && (
              <button
                type="button"
                onClick={discardAllChanges}
                disabled={isSaving}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 font-semibold flex items-center gap-1 transition-colors disabled:opacity-50 text-[11px]"
                title="Descartar todas las modificaciones pendientes"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Descartar</span>
              </button>
            )}

            {/* Guardar y Publicar en Base de Datos */}
            <button
              type="button"
              onClick={saveAllChanges}
              disabled={isSaving || !hasChanges}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all text-xs ${
                hasChanges
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#283039] text-slate-500 cursor-not-allowed border border-[#374151]'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Publicar</span>
                </>
              )}
            </button>

            {/* Acceso directo a Panel Admin */}
            <Link
              href="/admin"
              className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-[#283039] hover:bg-[#323D48] text-slate-300 hover:text-white border border-[#374151] font-medium flex items-center gap-1 transition-colors text-xs"
              title="Volver al panel administrativo"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Panel Admin</span>
            </Link>

            {/* Salir del modo edición */}
            <button
              type="button"
              onClick={exitEditorMode}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors"
              title="Salir del Modo Editor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Inspector contextual de bloque activo */}
      <VisualEditorInspector />

      {/* Cajón de catálogo de bloques editables */}
      <VisualEditorBlocksDrawer />

      {/* Notificación flotante de feedback */}
      {feedbackMessage && (
        <div
          data-ui="true"
          className="fixed bottom-6 left-6 z-[100000] p-4 rounded-2xl bg-[#1E242B] text-white border border-[#374151] shadow-2xl flex items-center gap-3 animate-fade-in select-none"
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : feedbackMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{feedbackMessage.text}</span>
          <button
            type="button"
            onClick={clearFeedback}
            className="p-1 text-slate-400 hover:text-white ml-2 rounded-md hover:bg-[#283039]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
