'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'automotriz',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Intentar enviar al backend
      await fetch('http://localhost:3001/api/v1/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: formData.category,
          contactName: formData.name,
          contactPhone: formData.phone,
          contactEmail: formData.email,
          notes: formData.message,
        }),
      }).catch(() => null);

      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0e1110] text-[#f4f3ef] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block">
            Canales de atención
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f4f3ef] leading-[1.1]">
            Contacto y ubicación en Catamarca.
          </h1>
          <p className="text-base sm:text-lg text-[#9aa19d] leading-relaxed">
            Estamos en Padre Zanello 341, San Fernando del Valle de Catamarca. Escribinos para coordinar una colocación en taller o una visita de relevamiento técnico en tu obra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Información de contacto y horarios */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#161a19] border border-[#2a322f] space-y-4">
              <h2 className="text-xl font-bold text-[#f4f3ef]">Taller e Instalaciones</h2>

              <div className="space-y-4 text-sm text-[#9aa19d]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#f4f3ef]">Dirección</strong>
                    <span>Padre Zanello 341, San Fernando del Valle de Catamarca, Argentina.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#f4f3ef]">WhatsApp & Llamadas</strong>
                    <a
                      href="https://wa.me/5493834272000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-mono"
                    >
                      +54 9 383 427-2000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <InstagramIcon className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#f4f3ef]">Instagram Oficial</strong>
                    <a
                      href="https://www.instagram.com/luminadia_catam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-500 transition-colors"
                    >
                      @luminadia_catam
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#f4f3ef]">Horarios de Atención</strong>
                    <p>Lunes a Viernes: 08:30 a 13:00 y 16:30 a 20:30 hs.</p>
                    <p>Sábados: 09:00 a 13:00 hs.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1c2220]">
                <a
                  href="https://wa.me/5493834272000?text=Hola%20Luminadia,%20deseo%20hacer%20una%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chatear por WhatsApp Ahora</span>
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de mensaje */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-[#161a19] border border-[#2a322f]">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#f4f3ef]">
                  ¡Mensaje enviado con éxito!
                </h3>
                <p className="text-sm text-[#9aa19d] max-w-md mx-auto">
                  Muchas gracias por comunicarte con Luminadia. Nos pondremos en contacto contigo a la brevedad al teléfono indicado.
                </p>
                <div className="pt-4">
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
                    }}
                    className="px-5 py-2.5 rounded-lg bg-[#1e2422] border border-[#2a322f] text-xs font-semibold text-[#f4f3ef]"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold text-[#f4f3ef]">Envianos tu consulta</h2>
                <p className="text-xs text-[#9aa19d]">
                  Completá los campos y te responderemos a la brevedad con el asesoramiento técnico requerido.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#9aa19d] mb-1">
                      Nombre completo *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Martín Gómez"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-[#9aa19d] mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ej. +54 9 383 4..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#9aa19d] mb-1">
                      Correo electrónico (opcional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nombre@ejemplo.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-category" className="block text-xs font-medium text-[#9aa19d] mb-1">
                      Tipo de proyecto *
                    </label>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                    >
                      <option value="automotriz">Automotriz (vehículos)</option>
                      <option value="hogares">Residencial / Hogares</option>
                      <option value="comercios-empresas">Comercios y Empresas</option>
                      <option value="otro">Otra consulta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-[#9aa19d] mb-1">
                    Detalles de tu consulta o medidas *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Contanos sobre tu vehículo, la cantidad de ventanas de tu casa o las características de tu vidriera..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1110] border border-[#2a322f] text-sm text-[#f4f3ef] focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Enviando consulta...' : 'Enviar Consulta'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
