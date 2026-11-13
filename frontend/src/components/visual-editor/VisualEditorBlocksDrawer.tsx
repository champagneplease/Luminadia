'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Type,
  AlignLeft,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useVisualEditor, ActiveEditableField } from '@/context/VisualEditorContext';

export default function VisualEditorBlocksDrawer() {
  const {
    isEditorActive,
    isAdmin,
    previewMode,
    isDrawerOpen,
    setDrawerOpen,
    registeredFields,
    activeFieldKey,
    selectField,
    pendingChanges,
    saveAllChanges,
    hasChanges,
    isSaving,
  } = useVisualEditor();

  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado y agrupado inteligente de bloques
  const filteredFields = useMemo(() => {
    if (!searchTerm.trim()) return registeredFields;
    const term = searchTerm.toLowerCase();
    return registeredFields.filter(
      (f) =>
        f.label.toLowerCase().includes(term) ||
        f.key.toLowerCase().includes(term) ||
        (f.currentValue && f.currentValue.toLowerCase().includes(term))
    );
  }, [registeredFields, searchTerm]);

  // Agrupamiento por categorías intuitivas
  const groupedSections = useMemo(() => {
    const groups: Record<string, ActiveEditableField[]> = {
      '🚀 Portada & Hero': [],
      '📊 Métricas & Cifras': [],
      '🏢 Quiénes Somos (About)': [],
      '🛡️ Soluciones & Servicios': [],
      '📌 Navbar & Anuncio Superior': [],
      '🦶 Pie de Página (Footer)': [],
      '⚙️ Otros Bloques': [],
    };

    filteredFields.forEach((field) => {
      const k = field.key.toLowerCase();
      if (k.startsWith('hero') && !k.includes('stat')) {
        groups['🚀 Portada & Hero'].push(field);
      } else if (k.includes('stat') || k.includes('number') || k.includes('metric')) {
        groups['📊 Métricas & Cifras'].push(field);
      } else if (k.startsWith('about')) {
        groups['🏢 Quiénes Somos (About)'].push(field);
      } else if (k.startsWith('service') || k.includes('service') || k.includes('auto') || k.includes('home') || k.includes('comm')) {
        groups['🛡️ Soluciones & Servicios'].push(field);
      } else if (k.includes('nav') || k.includes('announcement') || k.includes('logo') || k.includes('business')) {
        groups['📌 Navbar & Anuncio Superior'].push(field);
      } else if (k.includes('footer') || k.includes('address') || k.includes('phone') || k.includes('email') || k.includes('hour')) {
        groups['🦶 Pie de Página (Footer)'].push(field);
      } else {
        groups['⚙️ Otros Bloques'].push(field);
      }
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  }, [filteredFields]);

  if (!isEditorActive || !isAdmin || previewMode || !isDrawerOpen) {
    return null;
  }

  const handleSelectField = (field: ActiveEditableField) => {
    selectField(field);
  };

  return (
    <>
      {/* Backdrop semi-transparente */}
      <div
        className="fixed inset-0 z-[99996] bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Cajón lateral deslizante */}
      <aside
        data-ui="true"
        aria-label="Catálogo de Bloques Editables"
        className="fixed top-0 left-0 bottom-0 z-[99997] w-80 sm:w-96 bg-[#171C22] text-white border-r border-[#374151] shadow-2xl flex flex-col animate-slide-in-left duration-200"
      >
        {/* Cabecera del Cajón */}
        <div className="p-4 bg-[#1E242B] border-b border-[#374151] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white leading-tight">
                Explorador de Bloques
              </h2>
              <span className="text-[11px] text-[#94A3B8]">
                {registeredFields.length} elementos editables detectados
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors"
            title="Cerrar cajón"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barra de Búsqueda rápida */}
        <div className="p-3 bg-[#171C22] border-b border-[#283039]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar título, texto o clave..."
              className="w-full bg-[#12161A] text-white text-xs rounded-xl pl-8 pr-3 py-2 border border-[#374151] focus:border-blue-400 focus:ring-1 focus:ring-blue-500/30 outline-none placeholder-slate-500 font-sans"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Lista de Secciones y Elementos */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {groupedSections.length === 0 ? (
            <div className="text-center py-10 px-4 text-slate-400 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-xs font-semibold text-slate-300">
                No se encontraron bloques con ese criterio.
              </p>
              <p className="text-[11px] text-slate-500">
                Prueba buscando por palabras clave como &quot;hero&quot;, &quot;título&quot; o &quot;botón&quot;.
              </p>
            </div>
          ) : (
            groupedSections.map(([sectionName, fields]) => (
              <div key={sectionName} className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-2 block">
                  {sectionName} ({fields.length})
                </span>

                <div className="space-y-1">
                  {fields.map((field) => {
                    const isSelected = activeFieldKey === field.key;
                    const hasPending = pendingChanges[field.key] !== undefined;

                    return (
                      <button
                        key={field.key}
                        type="button"
                        onClick={() => handleSelectField(field)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                            : 'bg-[#1E242B] border-[#283039] hover:border-[#374151] text-slate-200 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-blue-500 text-white'
                                : 'bg-[#283039] text-slate-400'
                            }`}
                          >
                            {field.type === 'image' ? (
                              <ImageIcon className="w-3 h-3" />
                            ) : field.type === 'button' ? (
                              <LinkIcon className="w-3 h-3" />
                            ) : field.type === 'multiline' ? (
                              <AlignLeft className="w-3 h-3" />
                            ) : (
                              <Type className="w-3 h-3" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <span className="text-xs font-semibold block truncate leading-tight">
                              {field.label}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono block truncate">
                              {field.key}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {hasPending && (
                            <span
                              className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-400/20"
                              title="Modificado sin guardar"
                            />
                          )}
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isSelected ? 'text-blue-400 translate-x-0.5' : 'text-slate-500'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie del Cajón con acciones globales */}
        <div className="p-3 bg-[#1E242B] border-t border-[#374151] space-y-2 select-none">
          {hasChanges && (
            <div className="flex items-center justify-between text-xs px-1 text-amber-300 font-medium">
              <span>Cambios pendientes</span>
              <span className="font-bold">
                {Object.keys(pendingChanges).length}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={saveAllChanges}
            disabled={isSaving || !hasChanges}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
              hasChanges
                ? 'bg-white text-[#1E242B] hover:bg-neutral-200 shadow-md'
                : 'bg-[#283039] text-slate-500 cursor-not-allowed border border-[#374151]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Guardando...' : 'Guardar y Publicar Todo'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
