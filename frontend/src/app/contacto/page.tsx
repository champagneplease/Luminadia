'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import LocationMap, { LocationLink } from '@/components/LocationMap';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'automotriz',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Validación de formato de correo
  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailStr.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    // 1. Validación de Nombre (Obligatorio, máx 30 caracteres)
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'El nombre completo es obligatorio (hasta 30 caracteres).';
    } else if (trimmedName.length > 30) {
      newErrors.name = 'El nombre no puede superar los 30 caracteres.';
    }

    // 2. Validación de Teléfono (Obligatorio, exactamente 10 dígitos: característica + número)
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'El teléfono es obligatorio.';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Ingresá 10 dígitos: código de área (característica) + número restante, sin 0 ni 15.';
    }

    // 3. Validación de Correo electrónico (Opcional, pero si se escribe debe ser válido)
    const trimmedEmail = formData.email.trim();
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      newErrors.email = 'Ingresá un correo electrónico válido (ej: nombre@ejemplo.com).';
    }

    // 4. Validación de Detalles (Obligatorio, máx 250 caracteres)
    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Por favor contanos los detalles o medidas de tu consulta (hasta 250 caracteres).';
    } else if (trimmedMessage.length > 250) {
      newErrors.message = 'Los detalles no pueden superar los 250 caracteres.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const categoryLabels: Record<string, string> = {
      automotriz: 'Automotriz (vehículos)',
      hogares: 'Residencial / Hogares',
      'comercios-empresas': 'Comercios y Empresas',
      otro: 'Otra consulta',
    };

    // Mensaje generado estructurado hacia el WhatsApp del responsable oficial
    const lines = [
      `*CONSULTA DESDE LA WEB — LUMINADIA*`,
      `Hola Luminadia, me comunico a través del sitio web para solicitar asesoramiento técnico:`,
      ``,
      `*Nombre:* ${trimmedName}`,
      `*Teléfono:* ${cleanPhone}`,
      `*Correo:* ${trimmedEmail || 'No especificado (opcional)'}`,
      `*Tipo de proyecto:* ${categoryLabels[formData.category] || formData.category}`,
      `*Detalles de la consulta:*`,
      `${trimmedMessage}`,
      ``,
      `_Quedo a la espera de su respuesta para coordinar cotización o turno en Catamarca._`,
    ];

    const messageText = lines.join('\n');
    const waUrl = `https://wa.me/5493834272000?text=${encodeURIComponent(messageText)}`;
    setSubmittedUrl(waUrl);

    // Guardado silencioso de respaldo en segundo plano
    fetch('http://localhost:3001/api/v1/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: formData.category,
        contactName: trimmedName,
        contactPhone: cleanPhone,
        contactEmail: trimmedEmail || undefined,
        notes: trimmedMessage,
      }),
    }).catch(() => null);

    // Abrir WhatsApp directamente en una nueva pestaña
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white text-[#1E242B] min-h-[100dvh] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-6">
          <div className="animate-hero-location flex items-center gap-2 text-sm font-semibold text-[#1E242B]">
            <MapPin className="w-4 h-4 text-[#1E242B]" />
            <span>Canales de Atención Presencial y Telefónica</span>
          </div>
          <TextReveal
            as="h1"
            text="Contacto y ubicación en Catamarca."
            className="animate-hero-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1E242B] leading-[1.04] text-balance"
          />
          <p className="animate-hero-subtitle text-base sm:text-lg text-[#4A545E] leading-relaxed max-w-2xl text-balance">
            Estamos en{' '}
            <LocationLink className="text-[#1E242B] font-semibold underline-offset-4">
              Padre Zanello 341, San Fernando del Valle de Catamarca
            </LocationLink>
            . Instalador y distribuidor oficial de <strong>American Tint · Surface Innovation</strong> (Window Films, Smart Film, PPF y Vinilos). Escribinos para coordinar una colocación en taller o un relevamiento técnico en obra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Información de contacto y horarios */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white space-y-6 border border-[#B3B6B9]/40">
              <ScrollReveal blur={true} durationMs={950}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E242B] tracking-[-0.025em]">
                  Taller e Instalaciones
                </h2>
              </ScrollReveal>

              <div className="space-y-5 text-sm text-[#4A545E]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1E242B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E242B]">Dirección del Taller</strong>
                    <LocationLink className="text-[#4A545E] hover:text-[#1E242B] text-sm group mt-0.5">
                      Padre Zanello 341, Catamarca
                    </LocationLink>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1E242B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E242B]">WhatsApp & Llamadas Directas</strong>
                    <a
                      href="https://wa.me/5493834272000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E242B] hover:underline font-bold tabular-nums"
                    >
                      +54 9 383 427-2000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <InstagramIcon className="w-5 h-5 text-[#1E242B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E242B]">Instagram Oficial</strong>
                    <a
                      href="https://www.instagram.com/luminadia_catam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#1E242B] text-[#4A545E] transition-colors"
                    >
                      @luminadia_catam
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1E242B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E242B]">Horarios de Atención</strong>
                    <p>Lunes a Viernes: 08:30 a 13:00 y 16:30 a 20:30 hs.</p>
                    <p>Sábados: 09:00 a 13:00 hs.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20hacer%20una%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#1E242B] hover:bg-[#283039] text-white font-bold text-sm transition-colors shadow-sm"
                >
                  <WhatsAppIcon className="w-5 h-5" variant="color" />
                  <span>Chatear por WhatsApp Ahora</span>
                </a>
              </div>
            </div>

            {/* Mapa interactivo de Google Maps */}
            <LocationMap variant="card" height="h-64 sm:h-80" />
          </div>

          {/* Columna Derecha: Formulario de consulta con envío a WhatsApp */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-[#B3B6B9]/40">
            {submitted ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#1E242B]">
                    ¡Consulta preparada con éxito!
                  </h3>
                  <p className="text-sm text-[#4A545E] max-w-md mx-auto leading-relaxed">
                    Hemos generado tu mensaje con todos los detalles para enviarlo directamente al WhatsApp oficial de Luminadia.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#B3B6B9]/30 text-left text-xs space-y-1.5 max-w-md mx-auto">
                  <div className="font-semibold text-[#1E242B] border-b border-[#B3B6B9]/30 pb-1.5 flex items-center justify-between">
                    <span>Resumen de tu consulta:</span>
                    <span className="text-[11px] text-[#6C7680]">WhatsApp Oficial</span>
                  </div>
                  <p><strong className="text-[#1E242B]">Nombre:</strong> {formData.name}</p>
                  <p><strong className="text-[#1E242B]">Teléfono:</strong> {formData.phone}</p>
                  {formData.email && <p><strong className="text-[#1E242B]">Correo:</strong> {formData.email}</p>}
                  <p className="line-clamp-2"><strong className="text-[#1E242B]">Detalles:</strong> {formData.message}</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={submittedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-md shadow-[#25D366]/20"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" variant="white" />
                    <span>Abrir Conversación en WhatsApp</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        category: 'automotriz',
                        message: '',
                      });
                      setErrors({});
                    }}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-xs font-semibold text-[#1E242B] transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <ScrollReveal blur={true} durationMs={950}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E242B] tracking-[-0.025em]">
                      Envianos tu consulta directa
                    </h2>
                  </ScrollReveal>
                  <p className="text-xs text-[#4A545E] mt-1.5 leading-relaxed">
                    Completá tus datos y tu consulta será enviada directamente al WhatsApp del encargado para una respuesta inmediata.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Campo Nombre (máximo 30 caracteres) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="contact-name" className="block text-xs font-medium text-[#1E242B]">
                        Nombre completo *
                      </label>
                      <span className={`text-[11px] tabular-nums font-medium ${30 - formData.name.length === 0 ? 'text-amber-600 font-bold' : 'text-[#6C7680]'}`}>
                        {30 - formData.name.length} restantes
                      </span>
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      maxLength={30}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value.slice(0, 30) });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Ej. Martín Gómez"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border text-sm text-[#1E242B] focus:bg-white focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#B3B6B9] focus:border-[#1E242B]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Campo Teléfono (máximo 10 caracteres) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-[#1E242B]">
                        Teléfono / WhatsApp *
                      </label>
                      <span className={`text-[11px] tabular-nums font-medium ${10 - formData.phone.length === 0 ? 'text-emerald-700 font-bold' : 'text-[#6C7680]'}`}>
                        {10 - formData.phone.length} restantes
                      </span>
                    </div>
                    <input
                      id="contact-phone"
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, phone: digits });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="Ej. 3834272000"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border text-sm text-[#1E242B] focus:bg-white focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#B3B6B9] focus:border-[#1E242B]'
                      }`}
                    />
                    <p className="mt-1 text-[11px] text-[#6C7680] leading-tight">
                      Ej: <strong>3834272000</strong>. Ingresá código de área (característica) + número restante, sin el 0 ni el 15 (máx 10 dígitos).
                    </p>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Campo Correo electrónico con validación */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="contact-email" className="block text-xs font-medium text-[#1E242B]">
                        Correo electrónico (opcional)
                      </label>
                      <span className="text-[11px] text-[#6C7680] tabular-nums font-medium">
                        {50 - formData.email.length} restantes
                      </span>
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      maxLength={50}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value.slice(0, 50) });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="nombre@ejemplo.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border text-sm text-[#1E242B] focus:bg-white focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#B3B6B9] focus:border-[#1E242B]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Selección de Categoría */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="contact-category" className="block text-xs font-medium text-[#1E242B]">
                        Tipo de proyecto *
                      </label>
                    </div>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#B3B6B9] text-sm text-[#1E242B] focus:border-[#1E242B] focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="automotriz">Automotriz (vehículos)</option>
                      <option value="hogares">Residencial / Hogares</option>
                      <option value="comercios-empresas">Comercios y Empresas</option>
                      <option value="otro">Otra consulta</option>
                    </select>
                  </div>
                </div>

                {/* Campo Detalles de consulta (máximo 250 caracteres) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="contact-message" className="block text-xs font-medium text-[#1E242B]">
                      Detalles de tu consulta o medidas *
                    </label>
                    <span className={`text-[11px] tabular-nums font-medium ${250 - formData.message.length === 0 ? 'text-amber-600 font-bold' : 'text-[#6C7680]'}`}>
                      {250 - formData.message.length} restantes
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    maxLength={250}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value.slice(0, 250) });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Contanos sobre tu vehículo, la cantidad de ventanas de tu casa o las características de tu vidriera..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border text-sm text-[#1E242B] focus:bg-white focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#B3B6B9] focus:border-[#1E242B]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-md shadow-[#25D366]/20 disabled:opacity-50"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" variant="white" />
                    <span>{loading ? 'Preparando consulta...' : 'Enviar Consulta por WhatsApp'}</span>
                  </button>
                  <p className="text-[11px] text-[#6C7680] mt-2">
                    * Tu consulta abrirá una conversación directa por WhatsApp con el encargado oficial de Luminadia (+54 9 383 427-2000).
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
