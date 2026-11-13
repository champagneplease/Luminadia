'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Edit3 } from 'lucide-react';
import { useVisualEditor } from '@/context/VisualEditorContext';

interface VisualEditableButtonProps {
  textKey: string;
  urlKey?: string;
  label: string;
  defaultText: string;
  defaultHref: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function VisualEditableButton({
  textKey,
  urlKey,
  label,
  defaultText,
  defaultHref,
  className = '',
  icon,
}: VisualEditableButtonProps) {
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
  const isEditing = isEnabled && activeFieldKey === textKey;

  const currentText = getEffectiveValue(textKey, defaultText);
  const currentHref = urlKey ? getEffectiveValue(urlKey, defaultHref) : defaultHref;

  // Registrar botón en el catálogo del editor
  useEffect(() => {
    if (!isEnabled) return;
    return registerField({
      key: textKey,
      label,
      type: 'button',
      currentValue: currentText,
      defaultValue: defaultText,
      urlKey,
      currentUrl: currentHref,
      defaultUrl: defaultHref,
    });
  }, [isEnabled, textKey, label, currentText, defaultText, urlKey, currentHref, defaultHref, registerField]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    selectField({
      key: textKey,
      label,
      type: 'button',
      currentValue: currentText,
      defaultValue: defaultText,
      urlKey,
      currentUrl: currentHref,
      defaultUrl: defaultHref,
    });
  };

  // Modo público normal o vista previa
  if (!isEnabled) {
    const isExternal = currentHref.startsWith('http') || currentHref.startsWith('//');
    if (isExternal) {
      return (
        <a href={currentHref} target="_blank" rel="noopener noreferrer" className={className}>
          {icon}
          <span>{currentText}</span>
        </a>
      );
    }
    return (
      <Link href={currentHref} className={className}>
        {icon}
        <span>{currentText}</span>
      </Link>
    );
  }

  // Modo edición activo: botón seleccionable con contorno elegante y sin popovers que rompan el diseño
  return (
    <div
      data-editable-key={textKey}
      onClick={handleClick}
      className={`relative inline-flex items-center cursor-pointer transition-all duration-150 rounded-xl group/btn-editable ${
        isEditing
          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black/20 shadow-[0_0_16px_rgba(59,130,246,0.4)]'
          : 'hover:outline-dashed hover:outline-2 hover:outline-blue-400 hover:outline-offset-2'
      }`}
      title={isEditing ? `Editando: ${label}` : `Clic para editar texto y destino de: ${label}`}
    >
      <div className={`pointer-events-none flex items-center justify-center select-none ${className}`}>
        {icon}
        <span>{currentText}</span>
      </div>

      {/* Badge indicador flotante */}
      {isEditing ? (
        <span
          data-ui="true"
          className="pointer-events-none absolute -top-3.5 -right-2 flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg z-30 animate-pulse select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Editando Botón</span>
        </span>
      ) : (
        <span
          data-ui="true"
          className="pointer-events-none absolute -top-3.5 -right-2 hidden group-hover/btn-editable:flex items-center gap-1 bg-[#1E242B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-400 z-30 shadow-md select-none"
        >
          <Edit3 className="w-2.5 h-2.5 text-blue-400" />
          <span>{label}</span>
        </span>
      )}
    </div>
  );
}
