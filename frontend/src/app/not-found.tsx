import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-white text-[#1E242B]">
      <div className="max-w-lg text-center space-y-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center mx-auto shrink-0">
          <Image
            src="/images/luminadia-logo.png"
            alt="LuminADia"
            width={80}
            height={80}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <p className="text-xs font-bold text-[#1E242B]/70 block">
          Error 404
        </p>

        <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.035em] text-[#1E242B]">
          Página no encontrada.
        </h1>

        <p className="text-sm sm:text-base text-[#4A545E] leading-relaxed">
          El enlace que intentaste abrir no existe o fue trasladado. Te invitamos a explorar nuestros servicios de control solar o utilizar la calculadora de materiales.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] text-sm font-semibold text-[#1E242B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>

          <Link
            href="/calculadora-materiales"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E242B] hover:bg-[#2E3742] text-white font-bold text-sm transition-colors"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculadora de Materiales</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
