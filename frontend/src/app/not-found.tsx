import React from 'react';
import Link from 'next/link';
import { Sun, ArrowLeft, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-[#0e1110] text-[#f4f3ef]">
      <div className="max-w-lg text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#161a19] border border-[#2a322f] flex items-center justify-center text-amber-500 mx-auto">
          <Sun className="w-8 h-8 stroke-[2.2]" />
        </div>

        <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f3ef]">
          Página no encontrada.
        </h1>

        <p className="text-sm sm:text-base text-[#9aa19d] leading-relaxed">
          El enlace que intentaste abrir no existe o fue trasladado. Te invitamos a explorar nuestros servicios de control solar o utilizar la calculadora de materiales.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#161a19] border border-[#2a322f] hover:border-amber-500 text-sm font-semibold text-[#f4f3ef] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>

          <Link
            href="/calculadora-materiales"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-[#0e1110] font-bold text-sm transition-colors"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculadora de Materiales</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
