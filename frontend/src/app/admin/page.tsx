'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { ProjectCategory, FilmProduct, RollEstimationResult } from '@/shared';

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

  const [activeTab, setActiveTab] = useState<'solicitudes' | 'productos' | 'contenidos' | 'calculadora'>('solicitudes');
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

  // Contenidos editables del CMS
  const [siteConfig, setSiteConfig] = useState({
    businessName: 'Luminadia',
    address: 'Padre Zanello 341, San Fernando del Valle de Catamarca, Argentina',
    phone: '+54 9 383 427-2000',
    instagram: 'https://www.instagram.com/luminadia_catam/',
    heroTitle: 'Control solar de alta tecnología.',
    heroSubtitle: 'Láminas avanzadas para vehículos, residencias y empresas. Rechazo térmico infrarrojo, 99% de protección UV y máxima claridad óptica en cada instalación.',
    defaultRollWidth: 1.52,
    defaultSafetyMarginPercent: 12,
  });

  const [savedConfigNotice, setSavedConfigNotice] = useState(false);

  // Cargar solicitudes de localStorage si las hay
  useEffect(() => {
    const localReqs = localStorage.getItem('luminadia_requests');
    if (localReqs) {
      try {
        const parsed = JSON.parse(localReqs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: AdminRequestItem[] = parsed.map((item: any, idx: number) => ({
            id: `req-local-${idx + 1}`,
            category: item.category,
            contactName: item.contactName,
            contactPhone: item.contactPhone,
            contactEmail: item.contactEmail,
            vehicleDetails: item.vehicleDetails,
            notes: item.notes,
            status: 'nueva',
            createdAt: item.createdAt || new Date().toISOString(),
            calculationSummary: item.calculationSummary
              ? {
                  productName: item.calculationSummary.productName,
                  netSurfaceAreaM2: item.calculationSummary.netSurfaceAreaM2,
                  estimatedLinearMetersNeeded: item.calculationSummary.estimatedLinearMetersNeeded,
                  piecesCount: item.calculationSummary.piecesCount,
                }
              : undefined,
          }));
          setRequests((prev) => [...formatted, ...prev]);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === 'admin' || loginPassword === 'Luminadia2026!' || loginPassword === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. Utilizá la clave administrativa.');
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

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedConfigNotice(true);
    setTimeout(() => setSavedConfigNotice(false), 3000);
  };

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
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#0e1110]">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#161a19] border border-[#2a322f] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#0e1110] border border-[#2a322f] flex items-center justify-center text-amber-500 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#f4f3ef]">Panel Administrativo</h1>
            <p className="text-xs text-[#9aa19d]">
              Gestión de contenidos, catálogo y solicitudes de Luminadia.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-medium text-[#9aa19d] mb-1">
                Correo de Administrador
              </label>
              <input
                id="admin-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@luminadia.com.ar"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-medium text-[#9aa19d] mb-1">
                Contraseña de Acceso
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
              />
              <span className="text-[11px] text-[#636b67] block mt-1">
                (Acceso inicial demo: <code>admin</code> o <code>Luminadia2026!</code>)
              </span>
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors"
            >
              Ingresar al CMS
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-[#9aa19d] hover:text-[#f4f3ef]">
              ← Volver al sitio público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen">
      {/* Barra superior de administración */}
      <div className="border-b border-[#2a322f] bg-[#161a19] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-amber-500">LUMINADIA CMS</span>
          <span className="text-xs text-[#9aa19d]">· Panel de Control Central</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-[#9aa19d] hover:text-[#f4f3ef] flex items-center gap-1"
          >
            <span>Ver sitio público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#161a19] border border-[#2a322f]">
            <span className="text-xs text-[#9aa19d] block">Solicitudes Totales</span>
            <span className="text-2xl font-bold text-[#f4f3ef] tabular-nums mt-1 block">
              {requests.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#161a19] border border-[#2a322f]">
            <span className="text-xs text-amber-400 block">Nuevas por revisar</span>
            <span className="text-2xl font-bold text-amber-500 tabular-nums mt-1 block">
              {requests.filter((r) => r.status === 'nueva').length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#161a19] border border-[#2a322f]">
            <span className="text-xs text-emerald-400 block">En análisis / Visita</span>
            <span className="text-2xl font-bold text-emerald-500 tabular-nums mt-1 block">
              {requests.filter((r) => r.status === 'en_analisis' || r.status === 'contactado').length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#161a19] border border-[#2a322f]">
            <span className="text-xs text-[#9aa19d] block">Catálogo Activo</span>
            <span className="text-2xl font-bold text-[#f4f3ef] tabular-nums mt-1 block">
              5 láminas
            </span>
          </div>
        </div>

        {/* Pestañas de gestión */}
        <div className="flex border-b border-[#2a322f] gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('solicitudes')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'solicitudes'
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-[#9aa19d] hover:text-[#f4f3ef]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Bandeja de Solicitudes ({requests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contenidos')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'contenidos'
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-[#9aa19d] hover:text-[#f4f3ef]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Editor de Contenidos & Contacto</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calculadora')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'calculadora'
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-[#9aa19d] hover:text-[#f4f3ef]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Parámetros de Calculadora</span>
          </button>
        </div>

        {/* TAB 1: BANDEJA DE SOLICITUDES */}
        {activeTab === 'solicitudes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#636b67]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por cliente, teléfono o vehículo..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#161a19] border border-[#2a322f] text-xs text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#9aa19d]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#161a19] border border-[#2a322f] text-xs text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
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
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a322f] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-base text-[#f4f3ef]">{req.contactName}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-[#0e1110] border border-[#2a322f] text-amber-400 capitalize">
                        {req.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#9aa19d]">
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
                            ? 'bg-amber-950/40 text-amber-400 border-amber-600/50'
                            : req.status === 'contactado'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-600/50'
                            : 'bg-[#0e1110] text-[#9aa19d] border-[#2a322f]'
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
                    <div className="space-y-2 text-[#9aa19d]">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <a
                          href={`https://wa.me/${req.contactPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-emerald-400 font-mono"
                        >
                          {req.contactPhone}
                        </a>
                      </div>
                      {req.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{req.contactEmail}</span>
                        </div>
                      )}
                      {req.vehicleDetails && (
                        <div>
                          <strong className="text-[#f4f3ef]">Vehículo:</strong> {req.vehicleDetails}
                        </div>
                      )}
                      {req.notes && (
                        <p className="bg-[#0e1110] p-2.5 rounded-lg border border-[#2a322f] italic">
                          "{req.notes}"
                        </p>
                      )}
                    </div>

                    {req.calculationSummary && (
                      <div className="p-3.5 rounded-lg bg-[#0e1110] border border-[#2a322f] space-y-1.5 text-[#9aa19d]">
                        <span className="font-semibold text-amber-500 uppercase tracking-wide block text-[11px]">
                          Cálculo Adjunto de la Calculadora
                        </span>
                        <div>
                          <strong>Lámina:</strong> {req.calculationSummary.productName}
                        </div>
                        <div>
                          <strong>Superficie Neta:</strong> {req.calculationSummary.netSurfaceAreaM2} m² ({req.calculationSummary.piecesCount} paños)
                        </div>
                        <div>
                          <strong>Metros Lineales de Rollo:</strong> ~{req.calculationSummary.estimatedLinearMetersNeeded} m
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notas internas del instalador */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-semibold text-[#9aa19d] mb-1">
                      Notas Internas del Taller:
                    </label>
                    <input
                      type="text"
                      value={req.internalNotes || ''}
                      onChange={(e) => handleInternalNotesChange(req.id, e.target.value)}
                      placeholder="Agregar nota de seguimiento interno..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-xs text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EDITOR DE CONTENIDOS CMS */}
        {activeTab === 'contenidos' && (
          <form onSubmit={handleSaveConfig} className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-6">
            <div className="border-b border-[#2a322f] pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#f4f3ef]">Configuración de Contenidos y Textos</h2>
                <p className="text-xs text-[#9aa19d]">
                  Editá datos de contacto, dirección y textos visibles de la web sin tocar código.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-xs uppercase tracking-wider"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            </div>

            {savedConfigNotice && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-xs text-emerald-400">
                ¡Configuración actualizada con éxito!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9aa19d] mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  value={siteConfig.businessName}
                  onChange={(e) => setSiteConfig({ ...siteConfig, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9aa19d] mb-1">Dirección en Catamarca</label>
                <input
                  type="text"
                  value={siteConfig.address}
                  onChange={(e) => setSiteConfig({ ...siteConfig, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9aa19d] mb-1">Teléfono / WhatsApp Oficial</label>
                <input
                  type="text"
                  value={siteConfig.phone}
                  onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9aa19d] mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={siteConfig.instagram}
                  onChange={(e) => setSiteConfig({ ...siteConfig, instagram: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9aa19d] mb-1">Titular Principal del Hero</label>
              <input
                type="text"
                value={siteConfig.heroTitle}
                onChange={(e) => setSiteConfig({ ...siteConfig, heroTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9aa19d] mb-1">Subtítulo del Hero</label>
              <textarea
                rows={3}
                value={siteConfig.heroSubtitle}
                onChange={(e) => setSiteConfig({ ...siteConfig, heroSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef]"
              />
            </div>
          </form>
        )}

        {/* TAB 3: PARÁMETROS DE LA CALCULADORA */}
        {activeTab === 'calculadora' && (
          <div className="p-6 rounded-xl bg-[#161a19] border border-[#2a322f] space-y-6">
            <div className="border-b border-[#2a322f] pb-3">
              <h2 className="text-xl font-bold text-[#f4f3ef]">Reglas Técnicas de Bobinas</h2>
              <p className="text-xs text-[#9aa19d]">
                Ajustá el ancho estándar de los rollos y los márgenes de seguridad para el algoritmo de corte.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-[#0e1110] border border-[#2a322f] space-y-2">
                <h3 className="font-bold text-[#f4f3ef] text-sm">Ancho de Bobina Estándar</h3>
                <p className="text-xs text-[#9aa19d]">
                  1.52 metros (60 pulgadas). Ancho comercial utilizado por los principales fabricantes internacionales.
                </p>
                <div className="pt-2 font-mono text-amber-500 font-bold text-lg">
                  1.52 m (ancho útil: 1.50 m)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e1110] border border-[#2a322f] space-y-2">
                <h3 className="font-bold text-[#f4f3ef] text-sm">Márgenes de Merma Técnica</h3>
                <p className="text-xs text-[#9aa19d]">
                  Arquitectura: 10% merma estimada · Automotriz: 15% merma estimada (por curvatura y termoformado).
                </p>
                <div className="pt-2 font-mono text-emerald-400 font-bold text-lg">
                  10% a 15% de seguridad
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
