'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  LayoutDashboard,
  FileText,
  Layers,
  Settings,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  Filter,
  Phone,
  Mail,
  Edit3,
  LogOut,
  Save,
  Search,
  ExternalLink,
  Shield,
  Eye,
  Upload,
  Plus,
  Trash2,
  RefreshCw,
  Check,
  AlertCircle,
  X,
  Sparkles,
  Sliders,
  SlidersHorizontal,
  Bell,
  Globe,
  Tag,
  Award,
  Calendar,
  MapPin,
  Briefcase,
  Video,
  Play,
} from 'lucide-react';
import ImageCropModal from '@/components/ImageCropModal';
import { ProjectCategory, FilmProduct, RollEstimationResult } from '@/shared';
import {
  useSiteConfig,
  ProjectItem,
  ParticipationItem,
  SiteImagesConfig,
  SiteTextsConfig,
  SiteCalculatorConfig,
  CustomTextItem,
} from '@/context/SiteConfigContext';

interface AdminRequestItem {
  id: string;
  category: ProjectCategory;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  vehicleDetails?: string;
  notes?: string;
  status: 'nueva' | 'en_analisis' | 'contactado' | 'instalado' | 'archivado';
  internalNotes?: string;
  createdAt: string;
  calculationSummary?: {
    netSurfaceAreaM2: number;
    estimatedLinearMetersNeeded: number;
    productName: string;
    piecesCount: number;
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'solicitudes' | 'imagenes' | 'contenidos' | 'calculadora' | 'participaciones'>('solicitudes');
  const [statusFilter, setStatusFilter] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Solicitudes en memoria y locales
  const [requests, setRequests] = useState<AdminRequestItem[]>([
    {
      id: 'req-101',
      category: 'automotriz',
      contactName: 'Carlos Bazán',
      contactPhone: '+54 9 383 456-7890',
      contactEmail: 'carlos.bazan@gmail.com',
      vehicleDetails: 'Toyota Hilux 2022 (Doble Cabina)',
      notes: 'Consulta por colocación de lámina nano cerámica en laterales y luneta trasera. Prioridad rechazo calórico.',
      status: 'nueva',
      internalNotes: 'Contactar por WhatsApp por la mañana.',
      createdAt: '2026-10-20T09:15:00.000Z',
      calculationSummary: {
        productName: 'Nano Cerámica Carbón 20',
        netSurfaceAreaM2: 2.35,
        estimatedLinearMetersNeeded: 3.2,
        piecesCount: 5,
      },
    },
    {
      id: 'req-102',
      category: 'hogares',
      contactName: 'Valeria Roldán',
      contactPhone: '+54 9 383 412-3456',
      contactEmail: 'valeria.r@outlook.com',
      notes: 'Tres ventanales en el living orientados al oeste. Mucho calor por las tardes.',
      status: 'en_analisis',
      internalNotes: 'Coordinar visita de medición con muestras de lámina clara y reflectiva.',
      createdAt: '2026-10-19T17:40:00.000Z',
      calculationSummary: {
        productName: 'Nano Cerámica Térmica 70',
        netSurfaceAreaM2: 7.2,
        estimatedLinearMetersNeeded: 5.6,
        piecesCount: 3,
      },
    },
    {
      id: 'req-103',
      category: 'comercios-empresas',
      contactName: 'Estudio Jurídico Central',
      contactPhone: '+54 9 383 498-7654',
      notes: 'Vidrieras de fachada y puerta de acceso doble. Se necesita privacidad diurna y reducción de reflejos.',
      status: 'contactado',
      internalNotes: 'Presupuesto de relevamiento enviado el lunes.',
      createdAt: '2026-10-18T11:20:00.000Z',
      calculationSummary: {
        productName: 'Arquitectónica Dual Reflectiva',
        netSurfaceAreaM2: 12.8,
        estimatedLinearMetersNeeded: 9.8,
        piecesCount: 4,
      },
    },
  ]);

  // Configuración global y gestión de recursos mediante SiteConfigContext
  const {
    images,
    projects,
    texts,
    calculator,
    participations,
    updateImages,
    updateProjects,
    updateTexts,
    updateCalculator,
    updateParticipations,
    addParticipation,
    deleteParticipation,
    resetParticipationsToDefault,
    uploadImageFile,
    resetImagesToDefault,
    resetCalculatorToDefault,
    resetTextsToDefault,
  } = useSiteConfig();

  const [uploadingSection, setUploadingSection] = useState<string | null>(null);
  const [feedbackNotice, setFeedbackNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [customUrls, setCustomUrls] = useState<Partial<Record<keyof SiteImagesConfig, string>>>({});

  // Estado para el modal interactivo de recorte y zoom de fotos
  const [cropModalState, setCropModalState] = useState<{
    isOpen: boolean;
    file: File | null;
    targetType: 'section' | 'project' | 'new-project';
    targetKey: string;
    targetName: string;
  }>({
    isOpen: false,
    file: null,
    targetType: 'section',
    targetKey: '',
    targetName: '',
  });

  // Formulario para nuevo proyecto en galería
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<{
    title: string;
    category: 'automotriz' | 'hogares' | 'comercios';
    film: string;
    location: string;
    image: string;
    videoUrl?: string;
    description: string;
  }>({
    title: '',
    category: 'automotriz',
    film: '',
    location: 'San Fernando del Valle de Catamarca',
    image: '/images/hero.jpg',
    videoUrl: '',
    description: '',
  });

  // Formulario para nueva participación en expos y ferias
  const [isAddingParticipation, setIsAddingParticipation] = useState(false);
  const [newParticipation, setNewParticipation] = useState<Omit<ParticipationItem, 'id'>>({
    title: '',
    event: '',
    city: 'San Fernando del Valle de Catamarca',
    year: '2026',
    badge: 'Participación Oficial',
    description: '',
  });

  // Estado local para los textos del sitio (todos los campos editables del CMS)
  const [siteTexts, setSiteTexts] = useState<SiteTextsConfig>(texts);

  useEffect(() => {
    if (texts) {
      setSiteTexts(texts);
    }
  }, [texts]);

  // Estado local para parámetros de la calculadora
  const [calcConfig, setCalcConfig] = useState<SiteCalculatorConfig>(calculator);

  useEffect(() => {
    if (calculator) {
      setCalcConfig(calculator);
    }
  }, [calculator]);

  // Sub-pestaña para organizar la gran variedad de textos del sitio
  const [contentSubTab, setContentSubTab] = useState<'empresa' | 'anuncio' | 'hero' | 'nosotros_servicios' | 'personalizados'>('empresa');

  // Formulario para nuevo texto libre personalizado
  const [newCustomKey, setNewCustomKey] = useState('');
  const [newCustomLabel, setNewCustomLabel] = useState('');
  const [newCustomValue, setNewCustomValue] = useState('');

  // Cargar solicitudes de localStorage si las hay (con deduplicación estricta)
  useEffect(() => {
    const localReqs = localStorage.getItem('luminadia_requests');
    if (!localReqs) return;

    try {
      const parsed = JSON.parse(localReqs);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const formatted: AdminRequestItem[] = parsed.map((item: any, idx: number) => {
          const uniqueId = item.id || (item.createdAt ? `req-local-${item.createdAt}-${idx}` : `req-local-${idx + 1}`);
          return {
            id: uniqueId,
            category: item.category,
            contactName: item.contactName,
            contactPhone: item.contactPhone,
            contactEmail: item.contactEmail,
            vehicleDetails: item.vehicleDetails,
            notes: item.notes,
            status: item.status || 'nueva',
            createdAt: item.createdAt || new Date().toISOString(),
            calculationSummary: item.calculationSummary
              ? {
                  productName: item.calculationSummary.productName,
                  netSurfaceAreaM2: item.calculationSummary.netSurfaceAreaM2,
                  estimatedLinearMetersNeeded: item.calculationSummary.estimatedLinearMetersNeeded,
                  piecesCount: item.calculationSummary.piecesCount,
                }
              : undefined,
          };
        });

        setRequests((prev) => {
          const seen = new Set<string>();
          const result: AdminRequestItem[] = [];
          for (const req of [...formatted, ...prev]) {
            if (!seen.has(req.id)) {
              seen.add(req.id);
              result.push(req);
            }
          }
          return result;
        });
      }
    } catch {
      // ignore
    }

    // Restaurar sesión de administración si existe
    try {
      if (localStorage.getItem('luminadia_admin_authenticated') === 'true') {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === 'admin' || loginPassword === 'Luminadia2026!' || loginPassword === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
      try {
        localStorage.setItem('luminadia_admin_authenticated', 'true');
        // Obtener token JWT del backend
        const res = await fetch('http://localhost:3001/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginEmail || 'admin@luminadia.com.ar',
            password: loginPassword === 'admin' ? 'Luminadia2026!' : loginPassword,
          }),
        }).catch(() => null);

        if (res && res.ok) {
          const data = await res.json();
          if (data.accessToken) {
            localStorage.setItem('luminadia_admin_token', data.accessToken);
          }
        }
      } catch {}
    } else {
      setLoginError('Contraseña incorrecta. Utilizá la clave administrativa.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('luminadia_admin_authenticated');
      localStorage.removeItem('luminadia_admin_token');
      localStorage.removeItem('luminadia_visual_editor_active');
    } catch {}
  };

  const handleOpenVisualEditor = () => {
    try {
      localStorage.setItem('luminadia_admin_authenticated', 'true');
      localStorage.setItem('luminadia_visual_editor_active', 'true');
      window.location.href = '/?visualEditor=true';
    } catch {
      window.location.href = '/?visualEditor=true';
    }
  };

  const handleStatusChange = (id: string, newStatus: AdminRequestItem['status']) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleInternalNotesChange = (id: string, notes: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, internalNotes: notes } : r))
    );
  };

  // Guardar todos los textos del sitio web
  const handleSaveTexts = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateTexts(siteTexts);
    if (ok) {
      setFeedbackNotice({
        type: 'success',
        message: '¡Contenidos y textos actualizados en todo el sitio web!',
      });
    } else {
      setFeedbackNotice({
        type: 'error',
        message: 'No se pudieron guardar los textos. Verificá la conexión con el servidor.',
      });
    }
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // Restablecer textos a valores por defecto
  const handleResetTexts = async () => {
    if (confirm('¿Restablecer todos los textos de la web a los valores predeterminados de Luminadia?')) {
      await resetTextsToDefault();
      setFeedbackNotice({
        type: 'success',
        message: 'Textos de la web restablecidos a los valores por defecto.',
      });
      setTimeout(() => setFeedbackNotice(null), 3500);
    }
  };

  // Guardar parámetros de la calculadora
  const handleSaveCalculator = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateCalculator(calcConfig);
    if (ok) {
      setFeedbackNotice({
        type: 'success',
        message: '¡Parámetros de la calculadora actualizados en todo el sitio web!',
      });
    } else {
      setFeedbackNotice({
        type: 'error',
        message: 'Error al actualizar los parámetros de la calculadora.',
      });
    }
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // Restablecer calculadora a valores de fábrica
  const handleResetCalculator = async () => {
    if (confirm('¿Restablecer los parámetros de la calculadora a los valores de fábrica (1.52m ancho, 10-15% merma)?')) {
      await resetCalculatorToDefault();
      setFeedbackNotice({
        type: 'success',
        message: 'Calculadora restablecida a los valores técnicos estándar.',
      });
      setTimeout(() => setFeedbackNotice(null), 3500);
    }
  };

  // Agregar texto libre personalizado
  const handleAddCustomText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomKey.trim() || !newCustomValue.trim()) return;

    const sanitizedKey = newCustomKey.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const newItem: CustomTextItem = {
      id: `custom-${Date.now()}`,
      key: sanitizedKey,
      label: newCustomLabel.trim() || sanitizedKey,
      value: newCustomValue.trim(),
    };

    const updatedList = [...(siteTexts.customTexts || []), newItem];
    const updatedTexts = { ...siteTexts, customTexts: updatedList };
    setSiteTexts(updatedTexts);
    updateTexts(updatedTexts);

    setNewCustomKey('');
    setNewCustomLabel('');
    setNewCustomValue('');
    setFeedbackNotice({
      type: 'success',
      message: `¡Texto libre "${sanitizedKey}" agregado al diccionario!`,
    });
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  // Eliminar texto libre personalizado
  const handleDeleteCustomText = (id: string) => {
    const updatedList = (siteTexts.customTexts || []).filter((t) => t.id !== id);
    const updatedTexts = { ...siteTexts, customTexts: updatedList };
    setSiteTexts(updatedTexts);
    updateTexts(updatedTexts);
    setFeedbackNotice({
      type: 'success',
      message: 'Texto libre eliminado del diccionario.',
    });
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  // Modificar valor de texto personalizado
  const handleCustomTextChange = (id: string, value: string) => {
    setSiteTexts((prev) => ({
      ...prev,
      customTexts: (prev.customTexts || []).map((t) => (t.id === id ? { ...t, value } : t)),
    }));
  };

  // Agregar nueva participación en expo
  const handleAddParticipation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParticipation.title.trim() || !newParticipation.event.trim()) {
      alert('Por favor completá el título y el evento de la participación.');
      return;
    }
    await addParticipation(newParticipation);
    setIsAddingParticipation(false);
    setNewParticipation({
      title: '',
      event: '',
      city: 'San Fernando del Valle de Catamarca',
      year: '2026',
      badge: 'Participación Oficial',
      description: '',
    });
    setFeedbackNotice({
      type: 'success',
      message: '¡Nueva participación agregada a la cinta del sitio web!',
    });
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  // Eliminar participación de la cinta
  const handleDeleteParticipation = async (id: string) => {
    if (confirm('¿Confirmás que querés eliminar esta participación de la cinta?')) {
      await deleteParticipation(id);
      setFeedbackNotice({
        type: 'success',
        message: 'Participación eliminada de la cinta.',
      });
      setTimeout(() => setFeedbackNotice(null), 3500);
    }
  };

  // Restablecer participaciones a los valores oficiales
  const handleResetParticipations = async () => {
    if (confirm('¿Restablecer las participaciones a los eventos oficiales predeterminados?')) {
      await resetParticipationsToDefault();
      setFeedbackNotice({
        type: 'success',
        message: 'Participaciones restablecidas a los valores por defecto.',
      });
      setTimeout(() => setFeedbackNotice(null), 3500);
    }
  };

  // Subir imagen para sección principal
  const handleFileUpload = async (file: File, section: keyof SiteImagesConfig) => {
    try {
      setUploadingSection(section);
      const url = await uploadImageFile(file, section);
      await updateImages({ [section]: url });
      setFeedbackNotice({
        type: 'success',
        message: `¡Imagen de ${section} actualizada correctamente en todo el sitio web!`,
      });
      setTimeout(() => setFeedbackNotice(null), 4000);
    } catch (err: any) {
      setFeedbackNotice({
        type: 'error',
        message: err.message || 'Error al subir la imagen',
      });
      setTimeout(() => setFeedbackNotice(null), 4000);
    } finally {
      setUploadingSection(null);
    }
  };

  // Aplicar URL manual
  const handleApplyUrl = async (section: keyof SiteImagesConfig) => {
    const url = customUrls[section]?.trim();
    if (!url) return;
    try {
      setUploadingSection(section);
      await updateImages({ [section]: url });
      setFeedbackNotice({
        type: 'success',
        message: `¡URL para ${section} guardada y aplicada con éxito!`,
      });
      setTimeout(() => setFeedbackNotice(null), 4000);
    } catch (err: any) {
      setFeedbackNotice({
        type: 'error',
        message: err.message || 'Error al actualizar imagen',
      });
    } finally {
      setUploadingSection(null);
    }
  };

  // Subir foto para proyecto existente
  const handleProjectImageUpload = async (file: File, projectId: string) => {
    try {
      setUploadingSection(`project-${projectId}`);
      const uploadedUrl = await uploadImageFile(file, 'proyecto');
      const updated = projects.map((p) =>
        p.id === projectId ? { ...p, image: uploadedUrl } : p
      );
      await updateProjects(updated);
      setFeedbackNotice({
        type: 'success',
        message: '¡Foto del proyecto actualizada con éxito!',
      });
      setTimeout(() => setFeedbackNotice(null), 4000);
    } catch (err: any) {
      setFeedbackNotice({
        type: 'error',
        message: err.message || 'Error al subir la foto',
      });
    } finally {
      setUploadingSection(null);
    }
  };

  // Subir foto para nuevo proyecto
  const handleNewProjectImageUpload = async (file: File) => {
    try {
      setUploadingSection('new-project');
      const uploadedUrl = await uploadImageFile(file, 'proyecto');
      const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|ogg)$/i.test(file.name);
      setNewProject((prev) => ({
        ...prev,
        image: uploadedUrl,
        videoUrl: isVideo ? uploadedUrl : prev.videoUrl,
      }));
      setFeedbackNotice({
        type: 'success',
        message: isVideo ? '¡Video cargado para el nuevo proyecto!' : '¡Foto cargada para el nuevo proyecto!',
      });
      setTimeout(() => setFeedbackNotice(null), 3000);
    } catch (err: any) {
      setFeedbackNotice({
        type: 'error',
        message: err.message || 'Error al subir archivo',
      });
    } finally {
      setUploadingSection(null);
    }
  };

  // Interceptores para abrir el modal de recorte si es foto, o subir directo si es video
  const onSelectMediaForSection = (file: File, section: keyof SiteImagesConfig) => {
    if (file.type.startsWith('video/') || /\.(mp4|webm|mov|ogg)$/i.test(file.name)) {
      handleFileUpload(file, section);
    } else {
      setCropModalState({
        isOpen: true,
        file,
        targetType: 'section',
        targetKey: section,
        targetName: `la sección "${section}"`,
      });
    }
  };

  const onSelectMediaForProject = (file: File, projectId: string) => {
    if (file.type.startsWith('video/') || /\.(mp4|webm|mov|ogg)$/i.test(file.name)) {
      handleProjectImageUpload(file, projectId);
    } else {
      setCropModalState({
        isOpen: true,
        file,
        targetType: 'project',
        targetKey: projectId,
        targetName: 'el proyecto seleccionado',
      });
    }
  };

  const onSelectMediaForNewProject = (file: File) => {
    if (file.type.startsWith('video/') || /\.(mp4|webm|mov|ogg)$/i.test(file.name)) {
      handleNewProjectImageUpload(file);
    } else {
      setCropModalState({
        isOpen: true,
        file,
        targetType: 'new-project',
        targetKey: '',
        targetName: 'el nuevo proyecto',
      });
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    const { targetType, targetKey } = cropModalState;
    setCropModalState({ isOpen: false, file: null, targetType: 'section', targetKey: '', targetName: '' });
    if (targetType === 'section') {
      handleFileUpload(croppedFile, targetKey as keyof SiteImagesConfig);
    } else if (targetType === 'project') {
      handleProjectImageUpload(croppedFile, targetKey);
    } else if (targetType === 'new-project') {
      handleNewProjectImageUpload(croppedFile);
    }
  };

  const handleUseOriginal = (originalFile: File) => {
    const { targetType, targetKey } = cropModalState;
    setCropModalState({ isOpen: false, file: null, targetType: 'section', targetKey: '', targetName: '' });
    if (targetType === 'section') {
      handleFileUpload(originalFile, targetKey as keyof SiteImagesConfig);
    } else if (targetType === 'project') {
      handleProjectImageUpload(originalFile, targetKey);
    } else if (targetType === 'new-project') {
      handleNewProjectImageUpload(originalFile);
    }
  };

  // Agregar nuevo proyecto a la galería
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) {
      alert('Por favor ingresá un título para el proyecto');
      return;
    }
    const itemToAdd: ProjectItem = {
      ...newProject,
      id: `proj-${Date.now()}`,
    };
    await updateProjects([itemToAdd, ...projects]);
    setIsAddingProject(false);
    setNewProject({
      title: '',
      category: 'automotriz',
      film: '',
      location: 'San Fernando del Valle de Catamarca',
      image: '/images/hero.jpg',
      description: '',
    });
    setFeedbackNotice({
      type: 'success',
      message: '¡Nuevo proyecto publicado en la galería!',
    });
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // Eliminar proyecto de la galería
  const handleDeleteProject = async (projectId: string) => {
    if (confirm('¿Confirmás que querés eliminar este proyecto de la galería?')) {
      const updated = projects.filter((p) => p.id !== projectId);
      await updateProjects(updated);
      setFeedbackNotice({
        type: 'success',
        message: 'Proyecto eliminado de la galería.',
      });
      setTimeout(() => setFeedbackNotice(null), 3500);
    }
  };

  // Restaurar imágenes por defecto
  const handleResetImages = async () => {
    if (confirm('¿Restablecer todas las imágenes a las fotos por defecto originales de Luminadia?')) {
      await resetImagesToDefault();
      setFeedbackNotice({
        type: 'success',
        message: 'Imágenes restauradas a los valores por defecto.',
      });
      setTimeout(() => setFeedbackNotice(null), 3500);
    }
  };

  const siteSections: {
    key: keyof SiteImagesConfig;
    title: string;
    badge: string;
    description: string;
    recommended: string;
  }[] = [
    {
      key: 'hero',
      title: 'Portada Principal (Hero)',
      badge: 'Página de Inicio',
      description: 'Imagen principal que se visualiza al ingresar a la plataforma web de Luminadia.',
      recommended: '1920 × 1080 px (Formato horizontal apaisado, alta definición)',
    },
    {
      key: 'automotriz',
      title: 'Láminas para Vehículos',
      badge: 'Automotriz',
      description: 'Tarjeta de servicio en la portada y foto cabecera en /servicios/automotriz.',
      recommended: '1200 × 800 px (Vehículo con polarizado o instalación en taller)',
    },
    {
      key: 'hogares',
      title: 'Láminas Residenciales',
      badge: 'Hogares y Casas',
      description: 'Tarjeta de servicio en la portada y foto cabecera en /servicios/hogares.',
      recommended: '1200 × 800 px (Ventanales y arquitectura con luz natural controlada)',
    },
    {
      key: 'comercios',
      title: 'Láminas Corporativas y Negocios',
      badge: 'Comercios y Oficinas',
      description: 'Tarjeta de servicio en la portada y foto cabecera en /servicios/comercios-empresas.',
      recommended: '1200 × 800 px (Vidrieras comerciales o fachadas acristaladas)',
    },
    {
      key: 'logo',
      title: 'Logo Oficial de la Marca',
      badge: 'Identidad Visual',
      description: 'Logo utilizado en la barra de navegación superior, pie de página y favicon.',
      recommended: 'PNG / WebP con transparencia o fondo nítido (mínimo 512 × 512 px)',
    },
  ];

  const filteredRequests = requests.filter((r) => {
    const matchesStatus = statusFilter === 'todas' || r.status === statusFilter;
    const matchesSearch =
      r.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.contactPhone.includes(searchQuery) ||
      (r.vehicleDetails && r.vehicleDetails.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div data-ui="true" className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-white">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center mx-auto shrink-0">
              <Image
                src="/images/luminadia-logo.png"
                alt="LuminADia"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h1 className="text-2xl font-black text-[#1E242B]">Panel Administrativo</h1>
            <p className="text-xs text-[#4A545E]">
              Gestión de contenidos, catálogo y solicitudes de Luminadia.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-medium text-[#1E242B] mb-1">
                Correo de Administrador
              </label>
              <input
                id="admin-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@luminadia.com.ar"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-sm text-[#1E242B] focus:border-[#1E242B] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-medium text-[#1E242B] mb-1">
                Contraseña de Acceso
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-sm text-[#1E242B] focus:border-[#1E242B] focus:bg-white focus:outline-none transition-colors"
              />
              <span className="text-[11px] text-[#4A545E] block mt-1">
                (Acceso inicial demo: <code>admin</code> o <code>Luminadia2026!</code>)
              </span>
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-sm transition-colors"
            >
              Ingresar al CMS
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-[#4A545E] hover:text-[#1E242B]">
              ← Volver al sitio público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-ui="true" className="bg-white text-[#1E242B] min-h-[100dvh]">
      {/* Barra superior de administración */}
      <div className="border-b border-[#B3B6B9] bg-[#1E242B] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white">LUMINADIA CMS</span>
          <span className="text-xs text-[#B3B6B9]">· Panel de Control Central</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Botón para activar el editor visual */}
          <button
            type="button"
            onClick={handleOpenVisualEditor}
            className="px-3.5 py-1.5 rounded-lg bg-white text-[#1E242B] font-bold text-xs flex items-center gap-1.5 hover:bg-neutral-100 transition-colors shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#1E242B]" />
            <span>Activar Editor Visual</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="text-xs text-[#B3B6B9] hover:text-white hidden sm:flex items-center gap-1 transition-colors"
          >
            <span>Ver sitio público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-red-300 hover:text-red-200 flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner de acceso destacado al Editor Visual Inline */}
        <div
          data-ui="true"
          className="p-6 rounded-2xl bg-[#1E242B] text-white border border-[#374151] flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">Modo de Edición Visual en Vivo</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Editá los contenidos directamente sobre la web existente
            </h2>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              No necesitás buscar campos en formularios: hacé clic sobre cualquier titular, párrafo, imagen, video o botón de la página pública para editarlo en el lugar, conservando su diseño y persistiendo los cambios en la base de datos.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenVisualEditor}
            className="shrink-0 px-5 py-3 rounded-xl bg-white text-[#1E242B] hover:bg-neutral-100 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Edit3 className="w-4 h-4 text-[#1E242B]" />
            <span>Abrir Sitio con Editor Visual</span>
          </button>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#B3B6B9] shadow-xs">
            <span className="text-xs text-[#4A545E] block font-medium">Solicitudes Totales</span>
            <span className="text-2xl font-bold text-[#1E242B] tabular-nums mt-1 block">
              {requests.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#B3B6B9] shadow-xs">
            <span className="text-xs text-amber-700 block font-medium">Nuevas por revisar</span>
            <span className="text-2xl font-bold text-amber-700 tabular-nums mt-1 block">
              {requests.filter((r) => r.status === 'nueva').length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#B3B6B9] shadow-xs">
            <span className="text-xs text-emerald-700 block font-medium">En análisis / Visita</span>
            <span className="text-2xl font-bold text-emerald-700 tabular-nums mt-1 block">
              {requests.filter((r) => r.status === 'en_analisis' || r.status === 'contactado').length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#B3B6B9] shadow-xs">
            <span className="text-xs text-[#4A545E] block font-medium">Catálogo Activo</span>
            <span className="text-2xl font-bold text-[#1E242B] tabular-nums mt-1 block">
              5 láminas
            </span>
          </div>
        </div>

        {/* Pestañas de gestión */}
        <div data-ui="true" className="flex border-b border-[#B3B6B9] gap-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('solicitudes')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'solicitudes'
                ? 'border-[#1E242B] text-[#1E242B]'
                : 'border-transparent text-[#4A545E] hover:text-[#1E242B]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Bandeja de Solicitudes ({requests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('imagenes')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'imagenes'
                ? 'border-[#1E242B] text-[#1E242B]'
                : 'border-transparent text-[#4A545E] hover:text-[#1E242B]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gestión de Imágenes & Proyectos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contenidos')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'contenidos'
                ? 'border-[#1E242B] text-[#1E242B]'
                : 'border-transparent text-[#4A545E] hover:text-[#1E242B]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Editor de Contenidos & Contacto</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calculadora')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'calculadora'
                ? 'border-[#1E242B] text-[#1E242B]'
                : 'border-transparent text-[#4A545E] hover:text-[#1E242B]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Parámetros de Calculadora</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('participaciones')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'participaciones'
                ? 'border-[#1E242B] text-[#1E242B]'
                : 'border-transparent text-[#4A545E] hover:text-[#1E242B]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Participaciones & Expos ({participations?.length || 0})</span>
          </button>
        </div>

        {/* TAB 1: BANDEJA DE SOLICITUDES */}
        {activeTab === 'solicitudes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#4A545E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por cliente, teléfono o vehículo..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#4A545E]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                >
                  <option value="todas">Todos los estados</option>
                  <option value="nueva">Nuevas</option>
                  <option value="en_analisis">En análisis</option>
                  <option value="contactado">Contactado</option>
                  <option value="instalado">Instalado</option>
                  <option value="archivado">Archivado</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredRequests.map((req, idx) => (
                <div
                  key={`admin-req-${req.id}-${idx}`}
                  className="p-6 rounded-xl bg-white border border-[#B3B6B9] shadow-xs space-y-4"
                >
                  <div data-ui="true" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#B3B6B9] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-base text-[#1E242B]">{req.contactName}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-[#1E242B] font-semibold capitalize">
                        {req.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#4A545E]">
                        {new Date(req.createdAt).toLocaleDateString('es-AR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                          req.status === 'nueva'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : req.status === 'contactado'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-[#F8F9FA] text-[#4A545E] border-[#B3B6B9]'
                        }`}
                      >
                        <option value="nueva">Nueva</option>
                        <option value="en_analisis">En análisis</option>
                        <option value="contactado">Contactado</option>
                        <option value="instalado">Instalado</option>
                        <option value="archivado">Archivado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2 text-[#4A545E]">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#1E242B]" />
                        <a
                          href={`https://wa.me/${req.contactPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-[#1E242B] tabular-nums font-semibold"
                        >
                          {req.contactPhone}
                        </a>
                      </div>
                      {req.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#1E242B]" />
                          <span>{req.contactEmail}</span>
                        </div>
                      )}
                      {req.vehicleDetails && (
                        <div>
                          <strong className="text-[#1E242B]">Vehículo:</strong> {req.vehicleDetails}
                        </div>
                      )}
                      {req.notes && (
                        <p className="bg-[#F8F9FA] p-2.5 rounded-lg border border-[#B3B6B9] italic text-[#1E242B]">
                          "{req.notes}"
                        </p>
                      )}
                    </div>

                    {req.calculationSummary && (
                      <div className="p-3.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] space-y-1.5 text-[#4A545E]">
                        <span className="font-semibold text-[#1E242B] uppercase tracking-wide block text-[11px]">
                          Cálculo Adjunto de la Calculadora
                        </span>
                        <div>
                          <strong className="text-[#1E242B]">Lámina:</strong> {req.calculationSummary.productName}
                        </div>
                        <div>
                          <strong className="text-[#1E242B]">Superficie Neta:</strong> {req.calculationSummary.netSurfaceAreaM2} m² ({req.calculationSummary.piecesCount} paños)
                        </div>
                        <div>
                          <strong className="text-[#1E242B]">Metros Lineales de Rollo:</strong> ~{req.calculationSummary.estimatedLinearMetersNeeded} m
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notas internas del instalador */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-semibold text-[#1E242B] mb-1">
                      Notas Internas del Taller:
                    </label>
                    <input
                      type="text"
                      value={req.internalNotes || ''}
                      onChange={(e) => handleInternalNotesChange(req.id, e.target.value)}
                      placeholder="Agregar nota de seguimiento interno..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB IMÁGENES Y RECURSOS VISUALES */}
        {activeTab === 'imagenes' && (
          <div className="space-y-8">
            {/* Mensaje de feedback / notificación */}
            {feedbackNotice && (
              <div
                data-ui="true"
                className={`p-4 rounded-xl flex items-center justify-between border ${
                  feedbackNotice.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-red-50 text-red-900 border-red-300'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {feedbackNotice.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{feedbackNotice.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFeedbackNotice(null)}
                  className="text-xs font-bold hover:underline opacity-80"
                >
                  Cerrar
                </button>
              </div>
            )}

            {/* SECCIÓN 1: IMÁGENES DE SECCIONES PRINCIPALES */}
            <div className="space-y-6">
              <div data-ui="true" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B3B6B9] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#1E242B]">Imágenes de Secciones Principales & Marca</h2>
                  <p className="text-xs text-[#4A545E]">
                    Elegí y subí las imágenes para cada parte del sitio. Podés subir un archivo directamente desde tu dispositivo o ingresar una URL.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetImages}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#B3B6B9] hover:bg-[#F8F9FA] text-xs font-semibold text-[#1E242B] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restablecer por Defecto</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteSections.map((sec, idx) => (
                  <div
                    key={`admin-sec-${sec.key}-${idx}`}
                    data-ui="true"
                    className="p-5 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-sm text-[#1E242B]">{sec.title}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-[#1E242B]">
                          {sec.badge}
                        </span>
                      </div>

                      <p className="text-xs text-[#4A545E] min-h-[32px]">{sec.description}</p>

                      {/* Previsualización en vivo (soporta fotos y videos) */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#F8F9FA] border border-[#B3B6B9] flex items-center justify-center">
                        {uploadingSection === sec.key ? (
                          <div className="flex flex-col items-center gap-2 p-4 text-center">
                            <RefreshCw className="w-6 h-6 animate-spin text-[#1E242B]" />
                            <span className="text-xs font-semibold text-[#1E242B]">Subiendo multimedia...</span>
                          </div>
                        ) : /\.(mp4|webm|mov|ogg)$/i.test(images[sec.key]) ? (
                          <div className="relative w-full h-full bg-[#1E242B]">
                            <video
                              src={images[sec.key]}
                              autoPlay
                              loop
                              muted
                              playsInline
                              controls
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#1E242B]/85 text-[10px] font-semibold text-white flex items-center gap-1">
                              <Play className="w-2.5 h-2.5 fill-white" />
                              <span>Video</span>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={images[sec.key] || `/images/${sec.key}.jpg`}
                            alt={sec.title}
                            onError={(e) => {
                              const target = e.currentTarget;
                              const fallback = `/images/${sec.key}.jpg`;
                              if (target.src !== fallback) {
                                target.src = fallback;
                              }
                            }}
                            className={sec.key === 'logo' ? 'max-h-24 max-w-full object-contain p-2' : 'w-full h-full object-cover'}
                          />
                        )}
                        <div className="absolute bottom-2 left-2 right-2 bg-[#1E242B]/90 px-2 py-1 rounded text-[10px] text-white truncate">
                          {images[sec.key]}
                        </div>
                      </div>

                      <div className="text-[11px] text-[#4A545E]">
                        <strong className="text-[#1E242B]">Tamaño sugerido:</strong> {sec.recommended}
                      </div>
                    </div>

                    <div data-ui="true" className="space-y-2 pt-2 border-t border-[#B3B6B9]/60">
                      {/* Subir archivo */}
                      <div>
                        <label
                          htmlFor={`file-upload-${sec.key}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white text-xs font-bold cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Subir foto (recortar) o video</span>
                        </label>
                        <input
                          id={`file-upload-${sec.key}`}
                          type="file"
                          accept="image/*,video/mp4,video/webm,video/quicktime"
                          className="hidden"
                          disabled={uploadingSection === sec.key}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              onSelectMediaForSection(e.target.files[0], sec.key);
                            }
                          }}
                        />
                      </div>

                      {/* O ingresar URL */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="O ingresar enlace URL..."
                          value={customUrls[sec.key] ?? ''}
                          onChange={(e) => setCustomUrls({ ...customUrls, [sec.key]: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:bg-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyUrl(sec.key)}
                          className="px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-white border border-[#B3B6B9] text-xs font-semibold text-[#1E242B] transition-colors"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN 2: GALERÍA DE PROYECTOS Y TRABAJOS REALIZADOS */}
            <div data-ui="true" className="pt-8 border-t border-[#B3B6B9] space-y-6">
              <div data-ui="true" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#1E242B]">
                    Galería de Trabajos y Proyectos Realizados ({projects.length})
                  </h2>
                  <p className="text-xs text-[#4A545E]">
                    Estas son las fotos y descripciones que aparecen públicamente en la página de Galería de Proyectos (/proyectos).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white text-xs font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingProject ? 'Cerrar Formulario' : 'Agregar Nuevo Trabajo'}</span>
                </button>
              </div>

              {/* Formulario nuevo proyecto */}
              {isAddingProject && (
                <form
                  onSubmit={handleAddProject}
                  data-ui="true"
                  className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B3B6B9] space-y-4"
                >
                  <h3 className="font-bold text-sm text-[#1E242B]">Crear Nuevo Trabajo para la Galería</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1E242B] mb-1">Título del Proyecto o Vehículo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Ford Ranger Raptor - Polarizado Térmico"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1E242B] mb-1">Categoría</label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:outline-none"
                      >
                        <option value="automotriz">Automotriz</option>
                        <option value="hogares">Hogares y Residencial</option>
                        <option value="comercios">Comercios y Empresas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1E242B] mb-1">Lámina o Material Utilizado</label>
                      <input
                        type="text"
                        placeholder="Ej: Nano Cerámica Carbón 20"
                        value={newProject.film}
                        onChange={(e) => setNewProject({ ...newProject, film: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1E242B] mb-1">Ubicación</label>
                      <input
                        type="text"
                        placeholder="Ej: San Fernando del Valle de Catamarca"
                        value={newProject.location}
                        onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Descripción del Trabajo</label>
                    <textarea
                      rows={2}
                      placeholder="Detalles de la instalación, tiempo de ejecución, beneficios obtenidos..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[#1E242B]">Foto o Video del Proyecto</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-32 h-20 rounded-lg overflow-hidden border border-[#B3B6B9] bg-[#1E242B] shrink-0 flex items-center justify-center">
                        {newProject.videoUrl || /\.(mp4|webm|mov|ogg)$/i.test(newProject.image) ? (
                          <div className="relative w-full h-full">
                            <video
                              src={newProject.videoUrl || newProject.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1 rounded bg-black/80 text-white">Video</span>
                          </div>
                        ) : (
                          <img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="new-proj-file"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E242B] text-white text-xs font-bold cursor-pointer hover:bg-[#2E3742]"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingSection === 'new-project' ? 'Subiendo...' : 'Subir foto o video'}</span>
                          </label>
                          <input
                            id="new-proj-file"
                            type="file"
                            accept="image/*,video/mp4,video/webm,video/quicktime"
                            className="hidden"
                            disabled={uploadingSection === 'new-project'}
                            onChange={(e) => {
                              if (e.target.files?.[0]) onSelectMediaForNewProject(e.target.files[0]);
                            }}
                          />
                          <span className="text-[11px] text-[#4A545E]">o ingresá URL:</span>
                        </div>
                        <input
                          type="text"
                          value={newProject.image}
                          onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-4 py-2 rounded-xl bg-white border border-[#B3B6B9] text-xs font-semibold text-[#1E242B] hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#1E242B] text-white text-xs font-bold hover:bg-[#2E3742]"
                    >
                      Publicar Proyecto
                    </button>
                  </div>
                </form>
              )}

              {/* Lista de proyectos existentes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj, idx) => (
                  <div
                    key={`admin-proj-${proj.id || idx}-${idx}`}
                    data-ui="true"
                    className="p-4 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#F8F9FA] border border-[#B3B6B9]">
                        {uploadingSection === `project-${proj.id}` ? (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                            <RefreshCw className="w-5 h-5 animate-spin text-[#1E242B]" />
                            <span className="text-[11px] font-semibold text-[#1E242B]">Actualizando multimedia...</span>
                          </div>
                        ) : (proj.videoUrl || /\.(mp4|webm|mov|ogg)$/i.test(proj.image)) ? (
                          <div className="relative w-full h-full bg-[#1E242B]">
                            <video
                              src={proj.videoUrl || proj.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              controls
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/80 text-white flex items-center gap-1">
                              <Play className="w-2.5 h-2.5 fill-white" />
                              <span>Video</span>
                            </span>
                          </div>
                        ) : (
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        )}
                        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white capitalize">
                          {proj.category}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#1E242B] line-clamp-1">{proj.title}</h4>
                        <span className="text-xs text-[#4A545E] block mt-0.5">{proj.film}</span>
                        <span className="text-[11px] text-[#4A545E] block">{proj.location}</span>
                      </div>

                      {proj.description && (
                        <p className="text-xs text-[#4A545E] line-clamp-2 italic">
                          "{proj.description}"
                        </p>
                      )}
                    </div>

                    <div data-ui="true" className="flex items-center justify-between gap-2 pt-2 border-t border-[#B3B6B9]/60">
                      <label
                        htmlFor={`file-proj-${proj.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-white border border-[#B3B6B9] text-xs font-semibold text-[#1E242B] cursor-pointer transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Cambiar foto o video</span>
                      </label>
                      <input
                        id={`file-proj-${proj.id}`}
                        type="file"
                        accept="image/*,video/mp4,video/webm,video/quicktime"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) onSelectMediaForProject(e.target.files[0], proj.id);
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="inline-flex items-center gap-1 p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar de la galería"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EDITOR DE CONTENIDOS CMS & TEXTOS DE LA WEB */}
        {activeTab === 'contenidos' && (
          <div className="space-y-6">
            <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#1E242B]">Editor Central de Contenidos & Textos de la Web</h2>
                <p className="text-xs text-[#4A545E]">
                  Modificá cualquier texto visible de la plataforma, avisos de temporada y creá textos libres personalizados para usar donde necesites.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetTexts}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#B3B6B9] hover:bg-[#F8F9FA] text-[#1E242B] font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restablecer por Defecto</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveTexts}
                  className="px-4 py-2 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Todos los Textos</span>
                </button>
              </div>
            </div>

            {/* Sub-navegación por secciones de textos */}
            <div data-ui="true" className="flex border-b border-[#B3B6B9] gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setContentSubTab('empresa')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  contentSubTab === 'empresa'
                    ? 'bg-[#1E242B] text-white'
                    : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Empresa & Contacto</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('anuncio')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  contentSubTab === 'anuncio'
                    ? 'bg-[#1E242B] text-white'
                    : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B]'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Barra de Anuncios</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('hero')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  contentSubTab === 'hero'
                    ? 'bg-[#1E242B] text-white'
                    : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Portada Principal (Hero)</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('nosotros_servicios')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  contentSubTab === 'nosotros_servicios'
                    ? 'bg-[#1E242B] text-white'
                    : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Nosotros & Servicios</span>
              </button>

              <button
                type="button"
                onClick={() => setContentSubTab('personalizados')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  contentSubTab === 'personalizados'
                    ? 'bg-[#1E242B] text-white'
                    : 'bg-[#F8F9FA] text-[#4A545E] hover:text-[#1E242B]'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Textos Libres Personalizados ({siteTexts.customTexts?.length || 0})</span>
              </button>
            </div>

            {/* SUB-TAB 1: EMPRESA Y CONTACTO */}
            {contentSubTab === 'empresa' && (
              <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-[#1E242B]">Identidad Comercial y Datos de Contacto</h3>
                  <p className="text-xs text-[#4A545E]">
                    Estos datos se reflejan automáticamente en el encabezado, pie de página, enlaces de WhatsApp y página de contacto.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Nombre Comercial de la Marca</label>
                    <input
                      type="text"
                      value={siteTexts.businessName || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, businessName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Dirección del Taller / Sede en Catamarca</label>
                    <input
                      type="text"
                      value={siteTexts.address || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Teléfono / WhatsApp Oficial de Contacto</label>
                    <input
                      type="text"
                      value={siteTexts.phone || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Correo Electrónico Oficial</label>
                    <input
                      type="email"
                      value={siteTexts.email || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Horarios de Atención</label>
                    <input
                      type="text"
                      value={siteTexts.hours || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, hours: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Enlace de Perfil de Instagram</label>
                    <input
                      type="text"
                      value={siteTexts.instagram || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, instagram: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E242B] mb-1">Descripción de la Empresa para el Pie de Página</label>
                  <textarea
                    rows={2}
                    value={siteTexts.footerDescription || ''}
                    onChange={(e) => setSiteTexts({ ...siteTexts, footerDescription: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* SUB-TAB 2: BARRA DE ANUNCIOS SUPERIOR */}
            {contentSubTab === 'anuncio' && (
              <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-[#1E242B]">Barra Superior de Aviso / Promoción</h3>
                  <p className="text-xs text-[#4A545E]">
                    Activá una cinta destacada en la parte superior del portal para avisar de promociones de temporada, turnos o novedades.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9]">
                  <input
                    id="toggle-banner"
                    type="checkbox"
                    checked={Boolean(siteTexts.announcementActive)}
                    onChange={(e) => setSiteTexts({ ...siteTexts, announcementActive: e.target.checked })}
                    className="w-4 h-4 accent-[#1E242B] cursor-pointer"
                  />
                  <label htmlFor="toggle-banner" className="text-xs font-bold text-[#1E242B] cursor-pointer">
                    Habilitar y mostrar la barra de aviso en la parte superior del sitio
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1E242B] mb-1">Texto del Aviso o Promoción</label>
                  <textarea
                    rows={2}
                    value={siteTexts.announcementText || ''}
                    onChange={(e) => setSiteTexts({ ...siteTexts, announcementText: e.target.value })}
                    placeholder="Ej: 15% de bonificación en polarizado térmico para camionetas y utilitarios durante este mes."
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* SUB-TAB 3: PORTADA PRINCIPAL HERO */}
            {contentSubTab === 'hero' && (
              <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-[#1E242B]">Titulares y Botones de la Portada Principal (Hero)</h3>
                  <p className="text-xs text-[#4A545E]">
                    Personalizá los textos de mayor impacto visual que los usuarios leen al entrar a la web.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Distintivo de Ubicación / Autoridad</label>
                    <input
                      type="text"
                      value={siteTexts.heroBadge || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, heroBadge: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Titular Monumental Principal (H1)</label>
                    <input
                      type="text"
                      value={siteTexts.heroTitle || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, heroTitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">Subtítulo Descriptivo de Apoyo</label>
                    <textarea
                      rows={3}
                      value={siteTexts.heroSubtitle || ''}
                      onChange={(e) => setSiteTexts({ ...siteTexts, heroSubtitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1E242B] mb-1">Texto Botón Principal (Llamado a la Acción 1)</label>
                      <input
                        type="text"
                        value={siteTexts.heroCtaCalculator || ''}
                        onChange={(e) => setSiteTexts({ ...siteTexts, heroCtaCalculator: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1E242B] mb-1">Texto Botón Secundario (Llamado a la Acción 2)</label>
                      <input
                        type="text"
                        value={siteTexts.heroCtaCatalog || ''}
                        onChange={(e) => setSiteTexts({ ...siteTexts, heroCtaCatalog: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="block text-xs font-bold text-[#1E242B] mb-2">Métricas Numéricas Destacadas del Hero:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9] space-y-1">
                        <label className="block text-[10px] text-[#4A545E]">Cifra 1 y Etiqueta</label>
                        <input
                          type="text"
                          value={siteTexts.heroStat1Number || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, heroStat1Number: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-white border border-[#B3B6B9] text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={siteTexts.heroStat1Label || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, heroStat1Label: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-white border border-[#B3B6B9] text-[11px]"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9] space-y-1">
                        <label className="block text-[10px] text-[#4A545E]">Cifra 2 y Etiqueta</label>
                        <input
                          type="text"
                          value={siteTexts.heroStat2Number || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, heroStat2Number: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-white border border-[#B3B6B9] text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={siteTexts.heroStat2Label || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, heroStat2Label: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-white border border-[#B3B6B9] text-[11px]"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9] space-y-1">
                        <label className="block text-[10px] text-[#4A545E]">Cifra 3 y Etiqueta</label>
                        <input
                          type="text"
                          value={siteTexts.heroStat3Number || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, heroStat3Number: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-white border border-[#B3B6B9] text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={siteTexts.heroStat3Label || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, heroStat3Label: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-white border border-[#B3B6B9] text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: NOSOTROS Y SERVICIOS */}
            {contentSubTab === 'nosotros_servicios' && (
              <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-[#1E242B]">Sección de Fundamento Técnico & Ámbitos de Aplicación</h3>
                  <p className="text-xs text-[#4A545E]">
                    Textos de presentación institucional y tarjetas de servicios en la página principal.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9] space-y-3">
                    <span className="font-bold text-xs text-[#1E242B] block">Bloque "Quiénes Somos y Cómo Trabajamos":</span>
                    <div>
                      <label className="block text-[11px] font-medium text-[#4A545E] mb-1">Título de Sección</label>
                      <input
                        type="text"
                        value={siteTexts.aboutTitle || ''}
                        onChange={(e) => setSiteTexts({ ...siteTexts, aboutTitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#B3B6B9] text-xs font-bold text-[#1E242B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#4A545E] mb-1">Párrafo 1</label>
                      <textarea
                        rows={2}
                        value={siteTexts.aboutParagraph1 || ''}
                        onChange={(e) => setSiteTexts({ ...siteTexts, aboutParagraph1: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#4A545E] mb-1">Párrafo 2</label>
                      <textarea
                        rows={2}
                        value={siteTexts.aboutParagraph2 || ''}
                        onChange={(e) => setSiteTexts({ ...siteTexts, aboutParagraph2: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9] space-y-3">
                    <span className="font-bold text-xs text-[#1E242B] block">Tarjetas de Áreas de Aplicación (Portada):</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[#4A545E] mb-1">Título General de Servicios</label>
                        <input
                          type="text"
                          value={siteTexts.servicesTitle || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, servicesTitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#B3B6B9] text-xs font-bold text-[#1E242B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#4A545E] mb-1">Subtítulo General</label>
                        <input
                          type="text"
                          value={siteTexts.servicesSubtitle || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, servicesSubtitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B]"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-3 rounded-lg bg-white border border-[#B3B6B9] space-y-1">
                        <label className="block text-[11px] font-bold text-[#1E242B]">Tarjeta 1: Automotriz</label>
                        <input
                          type="text"
                          value={siteTexts.serviceAutoTitle || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, serviceAutoTitle: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-semibold"
                        />
                        <textarea
                          rows={2}
                          value={siteTexts.serviceAutoDesc || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, serviceAutoDesc: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs"
                        />
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-[#B3B6B9] space-y-1">
                        <label className="block text-[11px] font-bold text-[#1E242B]">Tarjeta 2: Hogares y Residencial</label>
                        <input
                          type="text"
                          value={siteTexts.serviceHomeTitle || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, serviceHomeTitle: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-semibold"
                        />
                        <textarea
                          rows={2}
                          value={siteTexts.serviceHomeDesc || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, serviceHomeDesc: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs"
                        />
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-[#B3B6B9] space-y-1">
                        <label className="block text-[11px] font-bold text-[#1E242B]">Tarjeta 3: Comercios y Empresas</label>
                        <input
                          type="text"
                          value={siteTexts.serviceCommTitle || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, serviceCommTitle: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-semibold"
                        />
                        <textarea
                          rows={2}
                          value={siteTexts.serviceCommDesc || ''}
                          onChange={(e) => setSiteTexts({ ...siteTexts, serviceCommDesc: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs"
                        />
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-[#B3B6B9] space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold text-[#1E242B]">
                            Tarjeta 4: + Servicios Profesionales (Arquitectura, Cómputos, Asesoría)
                          </label>
                          <span className="text-[10px] text-[#4A545E] font-medium">Nueva categoría</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-[#4A545E] block mb-0.5">Etiqueta Badge</span>
                            <input
                              type="text"
                              value={siteTexts.masServiciosBadge || ''}
                              onChange={(e) => setSiteTexts({ ...siteTexts, masServiciosBadge: e.target.value })}
                              placeholder="+ Servicios"
                              className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-[#4A545E] block mb-0.5">Título Tarjeta</span>
                            <input
                              type="text"
                              value={siteTexts.masServiciosTitle || ''}
                              onChange={(e) => setSiteTexts({ ...siteTexts, masServiciosTitle: e.target.value })}
                              placeholder="Arquitectura & Asesoría"
                              className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-semibold"
                            />
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#4A545E] block mb-0.5">Subtítulo Resumen</span>
                          <input
                            type="text"
                            value={siteTexts.masServiciosSubtitle || ''}
                            onChange={(e) => setSiteTexts({ ...siteTexts, masServiciosSubtitle: e.target.value })}
                            placeholder="Estudios de asoleamiento, balances térmicos, cómputos y licitaciones"
                            className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#4A545E] block mb-0.5">Descripción Institucional de la Categoría</span>
                          <textarea
                            rows={3}
                            value={siteTexts.masServiciosDesc || ''}
                            onChange={(e) => setSiteTexts({ ...siteTexts, masServiciosDesc: e.target.value })}
                            placeholder="Los titulares de Luminadia aúnan formación en arquitectura, diseño y finanzas..."
                            className="w-full px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#B3B6B9] text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 5: TEXTOS LIBRES PERSONALIZADOS (CUALQUIER TEXTO QUE EL ADMIN ELIJA) */}
            {contentSubTab === 'personalizados' && (
              <div className="space-y-6">
                <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-4">
                  <div>
                    <h3 className="font-bold text-sm text-[#1E242B]">Crear Nuevo Texto Libre Personalizado</h3>
                    <p className="text-xs text-[#4A545E]">
                      El administrador puede agregar cualquier texto que necesite (garantías, avisos de taller, políticas de medición o promociones).
                    </p>
                  </div>

                  <form onSubmit={handleAddCustomText} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[#1E242B] mb-1">Clave Única (Identificador)</label>
                        <input
                          type="text"
                          required
                          placeholder="ej: garantia_polarizado o aviso_verano"
                          value={newCustomKey}
                          onChange={(e) => setNewCustomKey(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#1E242B] mb-1">Etiqueta / Descripción para Reconocerlo</label>
                        <input
                          type="text"
                          placeholder="ej: Garantía Escrita de Láminas Térmicas"
                          value={newCustomLabel}
                          onChange={(e) => setNewCustomLabel(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#1E242B] mb-1">Contenido del Texto</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Escribí aquí el texto que querés almacenar y gestionar..."
                        value={newCustomValue}
                        onChange={(e) => setNewCustomValue(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar Texto al Diccionario</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Lista de textos libres guardados */}
                <div className="space-y-3">
                  <span className="font-bold text-xs text-[#1E242B] block">Textos Personalizados Activos:</span>
                  {(!siteTexts.customTexts || siteTexts.customTexts.length === 0) ? (
                    <div data-ui="true" className="p-8 rounded-2xl bg-white border border-[#B3B6B9] text-center text-xs text-[#4A545E]">
                      Aún no creaste textos libres personalizados. Usá el formulario superior para crear el primero.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {siteTexts.customTexts.map((item, idx) => (
                        <div
                          key={`admin-custom-${item.id || item.key || idx}-${idx}`}
                          data-ui="true"
                          className="p-4 rounded-xl bg-white border border-[#B3B6B9] shadow-xs space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs text-[#1E242B]">{item.label}</span>
                              <code className="text-[10px] px-2 py-0.5 rounded bg-[#F8F9FA] text-[#4A545E] border border-[#B3B6B9]/60 font-mono">
                                {item.key}
                              </code>
                            </div>

                            <textarea
                              rows={3}
                              value={item.value}
                              onChange={(e) => handleCustomTextChange(item.id, e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
                            />
                          </div>

                          <div data-ui="true" className="flex items-center justify-between pt-2 border-t border-[#B3B6B9]/40">
                            <span className="text-[10px] text-[#4A545E]">Guardado en el motor CMS</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomText(item.id)}
                              className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PARÁMETROS DEL MOTOR DE LA CALCULADORA */}
        {activeTab === 'calculadora' && (
          <form onSubmit={handleSaveCalculator} className="space-y-6">
            <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#1E242B]">Configuración Técnica de la Calculadora de Materiales</h2>
                <p className="text-xs text-[#4A545E]">
                  Ajustá anchos de rollos, sobrantes de corte y porcentajes de merma técnica. Los cambios se aplican automáticamente en /calculadora-materiales.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetCalculator}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#B3B6B9] hover:bg-[#F8F9FA] text-[#1E242B] font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restablecer Fábrica</span>
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Parámetros de Calculadora</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tarjeta 1: Medidas físicas de la bobina */}
              <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#1E242B]" />
                  <h3 className="font-bold text-sm text-[#1E242B]">Dimensiones Físicas de Bobina y Rollos</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">
                      Ancho Total de Bobina (m)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.5"
                      max="3.0"
                      value={calcConfig.rollWidthMeters}
                      onChange={(e) => setCalcConfig({ ...calcConfig, rollWidthMeters: parseFloat(e.target.value) || 1.52 })}
                      className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-bold text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                    <span className="text-[10px] text-[#4A545E] block mt-1">Estándar mundial: 1.52 m (60 pulgadas).</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">
                      Ancho Útil de Corte (m)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.4"
                      max="3.0"
                      value={calcConfig.usableWidthMeters}
                      onChange={(e) => setCalcConfig({ ...calcConfig, usableWidthMeters: parseFloat(e.target.value) || 1.50 })}
                      className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-bold text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                    <span className="text-[10px] text-[#4A545E] block mt-1">Descuenta orillos laterales (típico: 1.50 m).</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">
                      Margen de Recorte Perimetral (cm)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="10"
                      value={calcConfig.cuttingMarginCm}
                      onChange={(e) => setCalcConfig({ ...calcConfig, cuttingMarginCm: parseFloat(e.target.value) || 2.5 })}
                      className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-bold text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                    <span className="text-[10px] text-[#4A545E] block mt-1">Sobrante por arista para refilado con cutter en obra.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1E242B] mb-1">
                      Longitud Estándar de Rollo Cerrado (m)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="5"
                      max="100"
                      value={calcConfig.standardRollLengthMeters}
                      onChange={(e) => setCalcConfig({ ...calcConfig, standardRollLengthMeters: parseInt(e.target.value, 10) || 30 })}
                      className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-[#B3B6B9] text-xs font-bold text-[#1E242B] focus:bg-white focus:outline-none"
                    />
                    <span className="text-[10px] text-[#4A545E] block mt-1">Metros lineales en rollo cerrado nuevo (típico: 30 m).</span>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: Mermas técnicas por categoría */}
              <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#1E242B]" />
                  <h3 className="font-bold text-sm text-[#1E242B]">Factores de Merma Técnica y Curvatura (%)</h3>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-[#1E242B]">
                        Merma Automotriz: <strong className="tabular-nums">{calcConfig.automotiveSafetyMarginPercent}%</strong>
                      </label>
                      <span className="text-[10px] text-[#4A545E]">Termoformado luneta y cristales curvos</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={calcConfig.automotiveSafetyMarginPercent}
                      onChange={(e) => setCalcConfig({ ...calcConfig, automotiveSafetyMarginPercent: parseInt(e.target.value, 10) || 15 })}
                      className="w-full accent-[#1E242B]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-[#1E242B]">
                        Merma Residencial / Hogares: <strong className="tabular-nums">{calcConfig.residentialSafetyMarginPercent}%</strong>
                      </label>
                      <span className="text-[10px] text-[#4A545E]">Ventanales planos y paños fijos</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={calcConfig.residentialSafetyMarginPercent}
                      onChange={(e) => setCalcConfig({ ...calcConfig, residentialSafetyMarginPercent: parseInt(e.target.value, 10) || 10 })}
                      className="w-full accent-[#1E242B]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-[#1E242B]">
                        Merma Comercios & Empresas: <strong className="tabular-nums">{calcConfig.commercialSafetyMarginPercent}%</strong>
                      </label>
                      <span className="text-[10px] text-[#4A545E]">Vidrieras comerciales de gran formato</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={calcConfig.commercialSafetyMarginPercent}
                      onChange={(e) => setCalcConfig({ ...calcConfig, commercialSafetyMarginPercent: parseInt(e.target.value, 10) || 12 })}
                      className="w-full accent-[#1E242B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta 3: Disclaimer y Aclaración Técnica para los Clientes */}
            <div data-ui="true" className="p-6 rounded-2xl bg-white border border-[#B3B6B9] shadow-xs space-y-3">
              <div>
                <h3 className="font-bold text-sm text-[#1E242B]">Nota Técnica & Aclaración Legal (Visible en la Calculadora)</h3>
                <p className="text-xs text-[#4A545E]">
                  Este texto se muestra a los usuarios justo debajo de sus resultados de cálculo para aclarar condiciones de corte, instalación y presupuesto.
                </p>
              </div>

              <textarea
                rows={2}
                value={calcConfig.disclaimer}
                onChange={(e) => setCalcConfig({ ...calcConfig, disclaimer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9] text-xs text-[#1E242B] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Tarjeta 4: Resumen de Parámetros Activos del Motor */}
            <div data-ui="true" className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B3B6B9] space-y-3">
              <span className="font-bold text-xs text-[#1E242B] block">Resumen del Motor de Cálculo Activo:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[#4A545E] block">Bobina activa:</span>
                  <strong className="text-[#1E242B] tabular-nums font-bold">{calcConfig.rollWidthMeters} m ({calcConfig.usableWidthMeters} m útil)</strong>
                </div>
                <div>
                  <span className="text-[#4A545E] block">Margen de refilado:</span>
                  <strong className="text-[#1E242B] tabular-nums font-bold">{calcConfig.cuttingMarginCm} cm / arista</strong>
                </div>
                <div>
                  <span className="text-[#4A545E] block">Merma automotor:</span>
                  <strong className="text-[#1E242B] tabular-nums font-bold">{calcConfig.automotiveSafetyMarginPercent}%</strong>
                </div>
                <div>
                  <span className="text-[#4A545E] block">Merma arquitectura:</span>
                  <strong className="text-[#1E242B] tabular-nums font-bold">{calcConfig.residentialSafetyMarginPercent}% (Hogar) / {calcConfig.commercialSafetyMarginPercent}% (Comercio)</strong>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 5: GESTIÓN DE PARTICIPACIONES EN EXPOS & EVENTOS OFICIALES */}
        {activeTab === 'participaciones' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#1E242B]">
                  Participaciones en Exposiciones y Encuentros Oficiales
                </h2>
                <p className="text-xs text-[#4A545E]">
                  Los eventos listados se muestran automáticamente en la cinta continua animada de la portada principal (Expo Catamarca, Expo Buenos Aires, etc.).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetParticipations}
                  className="px-3.5 py-2 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-[#1E242B] border border-[#B3B6B9] font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restablecer Oficiales</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddingParticipation(!isAddingParticipation)}
                  className="px-4 py-2 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  {isAddingParticipation ? (
                    <>
                      <X className="w-3.5 h-3.5" />
                      <span>Cancelar</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Participación</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modal / Formulario para agregar nueva participación */}
            {isAddingParticipation && (
              <form
                onSubmit={handleAddParticipation}
                data-ui="true"
                className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#1E242B] space-y-4"
              >
                <div data-ui="true" className="flex items-center justify-between border-b border-[#B3B6B9] pb-3">
                  <h3 className="text-sm font-bold text-[#1E242B]">
                    Nueva Participación en Exposición o Encuentro Técnico
                  </h3>
                  <span className="text-[11px] text-[#4A545E]">
                    Aparecerá en la cinta móvil de la portada
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E242B] mb-1">
                      Título o Rol Oficial *
                    </label>
                    <input
                      type="text"
                      required
                      value={newParticipation.title}
                      onChange={(e) => setNewParticipation({ ...newParticipation, title: e.target.value })}
                      placeholder="Ej: Expositor Oficial en Construcción & Minería"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1E242B] mb-1">
                      Nombre de la Exposición / Evento *
                    </label>
                    <input
                      type="text"
                      required
                      value={newParticipation.event}
                      onChange={(e) => setNewParticipation({ ...newParticipation, event: e.target.value })}
                      placeholder="Ej: Expo Productiva Catamarca 2026"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1E242B] mb-1">
                      Ciudad y Provincia / Región *
                    </label>
                    <input
                      type="text"
                      required
                      value={newParticipation.city}
                      onChange={(e) => setNewParticipation({ ...newParticipation, city: e.target.value })}
                      placeholder="Ej: San Fernando del Valle de Catamarca"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1E242B] mb-1">
                        Año del Evento *
                      </label>
                      <input
                        type="text"
                        required
                        value={newParticipation.year}
                        onChange={(e) => setNewParticipation({ ...newParticipation, year: e.target.value })}
                        placeholder="2026"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1E242B] mb-1">
                        Etiqueta / Badge
                      </label>
                      <input
                        type="text"
                        value={newParticipation.badge}
                        onChange={(e) => setNewParticipation({ ...newParticipation, badge: e.target.value })}
                        placeholder="Expo Oficial"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E242B] mb-1">
                    Descripción Breve o Logro (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={newParticipation.description}
                    onChange={(e) => setNewParticipation({ ...newParticipation, description: e.target.value })}
                    placeholder="Presentación de innovaciones en láminas cerámicas y control solar para edificaciones sustentables."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#B3B6B9] text-xs text-[#1E242B] focus:border-[#1E242B] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingParticipation(false)}
                    className="px-4 py-2 rounded-xl bg-white border border-[#B3B6B9] text-xs font-semibold text-[#1E242B]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1E242B] text-white text-xs font-bold hover:bg-[#2E3742] transition-colors"
                  >
                    Guardar y Publicar en la Cinta
                  </button>
                </div>
              </form>
            )}

            {/* Grilla de participaciones actuales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {participations && participations.length > 0 ? (
                participations.map((item, idx) => (
                  <div
                    key={`admin-part-${item.id || idx}-${idx}`}
                    data-ui="true"
                    className="p-5 rounded-2xl bg-white border border-[#B3B6B9] flex flex-col justify-between space-y-4 hover:border-[#1E242B] transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1E242B] text-white text-[10px] font-bold">
                          <Award className="w-3 h-3 text-white" />
                          <span>{item.badge || 'Participación Oficial'}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4A545E]">
                          <Calendar className="w-3 h-3 text-[#4A545E]" />
                          <span>{item.year}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#1E242B] leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs font-semibold text-[#1E242B]">
                        {item.event}
                      </p>

                      {item.description && (
                        <p className="text-xs text-[#4A545E] leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div data-ui="true" className="pt-3 border-t border-[#B3B6B9]/60 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-[#4A545E] truncate max-w-[200px]">
                        <MapPin className="w-3 h-3 text-[#1E242B] shrink-0" />
                        <span className="truncate">{item.city}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteParticipation(item.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar participación de la cinta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div data-ui="true" className="col-span-full p-12 text-center rounded-2xl bg-[#F8F9FA] border border-[#B3B6B9]">
                  <p className="text-sm text-[#4A545E]">
                    No hay participaciones cargadas actualmente. Usá el botón "Agregar Participación" para sumar exposiciones y ferias a la cinta móvil.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal interactivo de recorte de fotos */}
      <ImageCropModal
        isOpen={cropModalState.isOpen}
        file={cropModalState.file}
        targetSectionName={cropModalState.targetName}
        onClose={() => setCropModalState({ isOpen: false, file: null, targetType: 'section', targetKey: '', targetName: '' })}
        onCropComplete={handleCropComplete}
        onUseOriginal={handleUseOriginal}
      />
    </div>
  );
}
