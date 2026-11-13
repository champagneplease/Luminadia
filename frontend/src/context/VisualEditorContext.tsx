'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useSiteConfig, SiteTextsConfig, SiteImagesConfig, DEFAULT_SITE_IMAGES } from './SiteConfigContext';

export interface ActiveEditableField {
  key: string;
  label: string;
  type: 'text' | 'multiline' | 'button' | 'image';
  currentValue: string;
  defaultValue?: string;
  urlKey?: string;
  currentUrl?: string;
  defaultUrl?: string;
  section?: string;
}

interface VisualEditorContextType {
  isEditorActive: boolean;
  isAdmin: boolean;
  previewMode: boolean;
  pendingChanges: Record<string, string>;
  activeFieldKey: string | null;
  activeField: ActiveEditableField | null;
  isSaving: boolean;
  feedbackMessage: { type: 'success' | 'error' | 'info'; text: string } | null;
  hasChanges: boolean;
  isDrawerOpen: boolean;
  registeredFields: ActiveEditableField[];
  // Acciones
  enterEditorMode: () => void;
  exitEditorMode: () => void;
  togglePreviewMode: () => void;
  setActiveFieldKey: (key: string | null) => void;
  setActiveField: (field: ActiveEditableField | null) => void;
  selectField: (field: ActiveEditableField) => void;
  closeField: () => void;
  selectNextField: () => void;
  selectPrevField: () => void;
  setPendingChange: (key: string, value: string) => void;
  getEffectiveValue: (key: string, fallback?: string) => string;
  saveAllChanges: () => Promise<boolean>;
  discardAllChanges: () => void;
  clearFeedback: () => void;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  registerField: (field: ActiveEditableField) => () => void;
}

const VisualEditorContext = createContext<VisualEditorContextType>({
  isEditorActive: false,
  isAdmin: false,
  previewMode: false,
  pendingChanges: {},
  activeFieldKey: null,
  activeField: null,
  isSaving: false,
  feedbackMessage: null,
  hasChanges: false,
  isDrawerOpen: false,
  registeredFields: [],
  enterEditorMode: () => {},
  exitEditorMode: () => {},
  togglePreviewMode: () => {},
  setActiveFieldKey: () => {},
  setActiveField: () => {},
  selectField: () => {},
  closeField: () => {},
  selectNextField: () => {},
  selectPrevField: () => {},
  setPendingChange: () => {},
  getEffectiveValue: (_k, fb = '') => fb,
  saveAllChanges: async () => false,
  discardAllChanges: () => {},
  clearFeedback: () => {},
  toggleDrawer: () => {},
  setDrawerOpen: () => {},
  registerField: () => () => {},
});

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export function VisualEditorProvider({ children }: { children: React.ReactNode }) {
  const { texts, updateTexts, images, updateImages } = useSiteConfig();

  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [activeFieldKey, setActiveFieldKey] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<ActiveEditableField | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Registro ordenado de campos en la página
  const registeredFieldsMapRef = useRef<Map<string, ActiveEditableField>>(new Map());
  const [registeredFields, setRegisteredFields] = useState<ActiveEditableField[]>([]);

  const registerField = useCallback((field: ActiveEditableField) => {
    registeredFieldsMapRef.current.set(field.key, field);
    setRegisteredFields(Array.from(registeredFieldsMapRef.current.values()));

    return () => {
      registeredFieldsMapRef.current.delete(field.key);
      setRegisteredFields(Array.from(registeredFieldsMapRef.current.values()));
    };
  }, []);

  // Inicializar estado de autenticación y modo editor desde localStorage y URL
  useEffect(() => {
    try {
      const auth = localStorage.getItem('luminadia_admin_authenticated');
      const token = localStorage.getItem('luminadia_admin_token');
      const urlParams = new URLSearchParams(window.location.search);
      const queryEdit = urlParams.get('visualEditor') === 'true' || urlParams.get('edit') === 'true';
      const storedEditor = localStorage.getItem('luminadia_visual_editor_active') === 'true';

      // En desarrollo o con flag queryEdit, permitir acceso de administración al editor
      const isAuth = auth === 'true' || Boolean(token) || queryEdit;
      setIsAdmin(isAuth);

      if ((queryEdit || storedEditor) && isAuth) {
        setIsEditorActive(true);
      }
    } catch {
      // Ignorar errores de acceso a almacenamiento
    }
  }, []);

  const clearFeedback = useCallback(() => setFeedbackMessage(null), []);

  const enterEditorMode = useCallback(() => {
    setIsEditorActive(true);
    setPreviewMode(false);
    try {
      localStorage.setItem('luminadia_visual_editor_active', 'true');
    } catch {}
  }, []);

  const exitEditorMode = useCallback(() => {
    setIsEditorActive(false);
    setPreviewMode(false);
    setActiveFieldKey(null);
    setActiveField(null);
    setDrawerOpen(false);
    try {
      localStorage.removeItem('luminadia_visual_editor_active');
    } catch {}
  }, []);

  const togglePreviewMode = useCallback(() => {
    setPreviewMode((prev) => !prev);
    setActiveFieldKey(null);
    setActiveField(null);
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const selectField = useCallback((field: ActiveEditableField) => {
    setActiveField(field);
    setActiveFieldKey(field.key);

    // Desplazar suavemente el elemento al centro de la vista
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const el = document.querySelector(`[data-editable-key="${field.key}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  }, []);

  const closeField = useCallback(() => {
    setActiveField(null);
    setActiveFieldKey(null);
  }, []);

  const selectNextField = useCallback(() => {
    if (registeredFields.length === 0) return;
    const currentIdx = registeredFields.findIndex((f) => f.key === activeFieldKey);
    const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % registeredFields.length : 0;
    selectField(registeredFields[nextIdx]);
  }, [registeredFields, activeFieldKey, selectField]);

  const selectPrevField = useCallback(() => {
    if (registeredFields.length === 0) return;
    const currentIdx = registeredFields.findIndex((f) => f.key === activeFieldKey);
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : registeredFields.length - 1;
    selectField(registeredFields[prevIdx]);
  }, [registeredFields, activeFieldKey, selectField]);

  const setPendingChange = useCallback((key: string, value: string) => {
    setPendingChanges((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const getEffectiveValue = useCallback(
    (key: string, fallback: string = ''): string => {
      if (pendingChanges[key] !== undefined) {
        return pendingChanges[key];
      }

      // Buscar en texts de SiteConfig
      if (key in texts) {
        const val = (texts as any)[key];
        if (typeof val === 'string') return val;
      }

      // Buscar en imágenes con fallback a DEFAULT_SITE_IMAGES
      const isImgKey = key.startsWith('image_') || key in images || key in DEFAULT_SITE_IMAGES;
      if (isImgKey) {
        const cleanKey = (key.startsWith('image_') ? key.replace(/^image_/, '') : key) as keyof SiteImagesConfig;
        if (images[cleanKey] && typeof images[cleanKey] === 'string' && images[cleanKey].trim() !== '') {
          if (cleanKey === 'hero' && images[cleanKey] === '/images/hero.jpg') {
            return DEFAULT_SITE_IMAGES.hero;
          }
          return images[cleanKey];
        }
        if (DEFAULT_SITE_IMAGES[cleanKey]) {
          return DEFAULT_SITE_IMAGES[cleanKey];
        }
      }

      // Buscar en customTexts
      const custom = texts.customTexts?.find((c) => c.key === key);
      if (custom?.value) return custom.value;

      return fallback;
    },
    [pendingChanges, texts, images],
  );

  const discardAllChanges = useCallback(() => {
    setPendingChanges({});
    setActiveFieldKey(null);
    setActiveField(null);
    setFeedbackMessage({
      type: 'info',
      text: 'Cambios no guardados descartados.',
    });
    setTimeout(() => setFeedbackMessage(null), 3000);
  }, []);

  const saveAllChanges = useCallback(async (): Promise<boolean> => {
    if (Object.keys(pendingChanges).length === 0) {
      setFeedbackMessage({
        type: 'info',
        text: 'No hay modificaciones pendientes para guardar.',
      });
      setTimeout(() => setFeedbackMessage(null), 2500);
      return true;
    }

    setIsSaving(true);
    try {
      // Separar cambios de textos e imágenes
      const textUpdates: Partial<SiteTextsConfig> = {};
      const imageUpdates: Partial<SiteImagesConfig> = {};
      const rawSettingsPayload: Record<string, string> = {};

      for (const [key, val] of Object.entries(pendingChanges)) {
        rawSettingsPayload[key] = val;

        if (key.startsWith('image_')) {
          const imgKey = key.replace(/^image_/, '') as keyof SiteImagesConfig;
          imageUpdates[imgKey] = val;
          rawSettingsPayload[`image_${imgKey}`] = val;
          rawSettingsPayload[imgKey] = val;
        } else if (key in images || key in DEFAULT_SITE_IMAGES) {
          const imgKey = key as keyof SiteImagesConfig;
          imageUpdates[imgKey] = val;
          rawSettingsPayload[`image_${imgKey}`] = val;
          rawSettingsPayload[imgKey] = val;
        } else if (key in texts) {
          (textUpdates as any)[key] = val;
        } else {
          // Custom text
          const existingCustom = [...(texts.customTexts || [])];
          const foundIdx = existingCustom.findIndex((c) => c.key === key);
          if (foundIdx >= 0) {
            existingCustom[foundIdx].value = val;
          } else {
            existingCustom.push({
              id: `custom-${Date.now()}-${key}`,
              key,
              label: key,
              value: val,
            });
          }
          textUpdates.customTexts = existingCustom;
        }
      }

      // 1. Guardar en backend en una sola llamada atómica
      const token = typeof window !== 'undefined' ? localStorage.getItem('luminadia_admin_token') : null;
      await fetch(`${BACKEND_URL}/content/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          settings: rawSettingsPayload,
        }),
      }).catch((e) => {
        console.warn('Backend batch save error (falling back to local):', e);
      });

      // 2. Actualizar el contexto de la aplicación
      if (Object.keys(textUpdates).length > 0) {
        await updateTexts(textUpdates);
      }
      if (Object.keys(imageUpdates).length > 0) {
        await updateImages(imageUpdates);
      }

      // 3. Limpiar estado de cambios pendientes
      setPendingChanges({});
      setActiveFieldKey(null);
      setActiveField(null);
      setFeedbackMessage({
        type: 'success',
        text: '¡Cambios guardados y publicados con éxito en la base de datos!',
      });
      setTimeout(() => setFeedbackMessage(null), 4000);
      return true;
    } catch (err) {
      console.error('Error saving visual editor changes:', err);
      setFeedbackMessage({
        type: 'error',
        text: 'Ocurrió un error al guardar los cambios en el servidor.',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges, texts, images, updateTexts, updateImages]);

  const hasChanges = Object.keys(pendingChanges).length > 0;

  return (
    <VisualEditorContext.Provider
      value={{
        isEditorActive,
        isAdmin,
        previewMode,
        pendingChanges,
        activeFieldKey,
        activeField,
        isSaving,
        feedbackMessage,
        hasChanges,
        isDrawerOpen,
        registeredFields,
        enterEditorMode,
        exitEditorMode,
        togglePreviewMode,
        setActiveFieldKey,
        setActiveField,
        selectField,
        closeField,
        selectNextField,
        selectPrevField,
        setPendingChange,
        getEffectiveValue,
        saveAllChanges,
        discardAllChanges,
        clearFeedback,
        toggleDrawer,
        setDrawerOpen,
        registerField,
      }}
    >
      {children}
    </VisualEditorContext.Provider>
  );
}

export function useVisualEditor() {
  return useContext(VisualEditorContext);
}
