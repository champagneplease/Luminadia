'use client';

import React, { useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import { useVisualEditor } from '@/context/VisualEditorContext';

interface VisualEditableTextProps {
  contentKey: string;
  label: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  children: string;
  style?: React.CSSProperties;
}

export default function VisualEditableText({
  contentKey,
  label,
  as: Component = 'span',
  className = '',
  multiline = false,
  children,
  style,
}: VisualEditableTextProps) {
  const {
    isEditorActive,
    isAdmin,
    previewMode,
    activeFieldKey,
    selectField,
    getEffectiveValue,
    registerField,
  } = useVisualEditor();

  const isEnabled = isEditorActive && isAdmin && !previewMode;
  const isEditing = isEnabled && activeFieldKey === contentKey;

  const currentValue = getEffectiveValue(contentKey, children);

  // Registrar el campo en el catálogo del editor
  useEffect(() => {
    if (!isEnabled) return;
    return registerField({
      key: contentKey,
      label,
      type: multiline ? 'multiline' : 'text',
      currentValue,
      defaultValue: children,
    });
  }, [isEnabled, contentKey, label, multiline, currentValue, children, registerField]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    selectField({
      key: contentKey,
      label,
      type: multiline ? 'multiline' : 'text',
      currentValue,
      defaultValue: children,
    });
  };

  // Modo público normal o vista previa
  if (!isEnabled) {
    return (
      <Component className={className} style={style}>
        {currentValue}
      </Component>
    );
  }

  // Modo edición activo: Preserva el 100% de la semántica HTML, tipografía y diseño
  return (
    <Component
      data-editable-key={contentKey}
      onClick={handleClick}
      style={style}
      className={`relative group/editable cursor-pointer transition-all duration-150 rounded-sm select-text ${
        isEditing
          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black/20 shadow-[0_0_16px_rgba(59,130,246,0.4)]'
          : 'hover:outline-dashed hover:outline-2 hover:outline-blue-400 hover:outline-offset-2'
      } ${className}`}
      title={isEditing ? `Editando: ${label}` : `Clic para editar: ${label}`}
    >
      {currentValue}

      {/* Badge indicador flotante */}
      {isEditing ? (
        <span
          data-ui="true"
          className="pointer-events-none absolute -top-3.5 -right-2 flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg z-30 animate-pulse select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Editando</span>
        </span>
      ) : (
        <span
          data-ui="true"
          className="pointer-events-none absolute -top-3.5 -right-2 hidden group-hover/editable:flex items-center gap-1 bg-[#1E242B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-400 z-30 shadow-md select-none"
        >
          <Edit3 className="w-2.5 h-2.5 text-blue-400" />
          <span>{label}</span>
        </span>
      )}
    </Component>
  );
}
