import React from 'react';
import {
  Calculator,
  Briefcase,
  Home as HomeIcon,
  MessageCircle,
} from 'lucide-react';

import { useWorkshop } from '../context/WorkshopContext';

export const Navbar = ({ currentPage, setCurrentPage }) => {
  const { gramRate } = useWorkshop();

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Marca / Logo */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-full border border-cyan-500/50 p-0.5 overflow-hidden group-hover:scale-105 transition shadow-[0_0_15px_-3px_rgba(0,240,255,0.4)]">
            <img
              src="/logo-pachi.png"
              alt="Logo La Tienda de Pachi"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <span className="font-bold text-base tracking-wider text-white group-hover:text-cyan-400 transition flex items-center gap-2">
              LA TIENDA DE PACHI
            </span>

            <span className="text-[11px] text-slate-400 font-mono block">
              Neuquén Capital • Taller 3D
            </span>
          </div>
        </button>

        {/* Links de Rutas */}
        <nav className="hidden md:flex items-center gap-1 bg-[#13131b] p-1 rounded-xl border border-slate-800">

          <button
            onClick={() => setCurrentPage('home')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              currentPage === 'home'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => setCurrentPage('quote')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              currentPage === 'quote'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />

            <span>Cotizador STL</span>

            <span className="px-1.5 py-0.2 text-[10px] rounded bg-cyan-950 text-cyan-400 font-mono border border-cyan-800/50">
              ${gramRate}/g
            </span>
          </button>

          <button
            onClick={() => setCurrentPage('corporate')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              currentPage === 'corporate'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Empresas & Merch</span>
          </button>

        </nav>

        {/* Botón WhatsApp */}
        <a
          href="https://wa.me/5492990000000?text=Hola%20Juan,%20quiero%20hacer%20una%20consulta%20por%20impresión%203D"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />

          <span className="hidden sm:inline">
            WhatsApp Taller
          </span>

          <span className="sm:hidden">
            WhatsApp
          </span>
        </a>

      </div>
    </header>
  );
};