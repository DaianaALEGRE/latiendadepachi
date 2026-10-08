
import React, { useState } from "react";
import {
  Calculator,
  Home as HomeIcon,
  MessageCircle,
  Instagram,
  Menu,
  X,
} from "lucide-react";

export const Navbar = ({
  currentPage,
  setCurrentPage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            BARRA PRINCIPAL
        ====================================================== */}
        <div className="flex items-center justify-between gap-3">

          {/* LOGO / MARCA */}
          <button
            type="button"
            onClick={() => navigateTo("home")}
            className="flex items-center gap-3 group text-left min-w-0"
          >
            <div className="w-10 h-10 rounded-full border border-cyan-500/50 p-0.5 overflow-hidden group-hover:scale-105 transition shadow-[0_0_15px_-3px_rgba(0,240,255,0.4)] shrink-0">
              <img
                src="/logo-pachi.png"
                alt="Logo La Tienda de Pachi"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="min-w-0">
              <span className="font-bold text-sm sm:text-base tracking-wider text-white group-hover:text-cyan-400 transition flex items-center gap-2 whitespace-nowrap">
                LA TIENDA DE PACHI
              </span>

              <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono block truncate">
                Bariloche - Patagonia Argentina • Taller 3D
              </span>
            </div>
          </button>

          {/* =================================================
              NAVEGACIÓN DESKTOP
          ================================================== */}
          <nav className="hidden md:flex items-center gap-1 bg-[#13131b] p-1 rounded-xl border border-slate-800">

            {/* INICIO */}
            <button
              type="button"
              onClick={() => navigateTo("home")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                currentPage === "home"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>

            {/* COTIZADOR */}
            <button
              type="button"
              onClick={() => navigateTo("quote")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                currentPage === "quote"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Cotizador</span>
            </button>

          </nav>

          {/* =================================================
              INSTAGRAM + WHATSAPP DESKTOP
          ================================================== */}
          <div className="hidden sm:flex items-center gap-2">

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/la.tienda.de.pachi"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram La Tienda de Pachi"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 transition hover:shadow-[0_0_15px_-3px_rgba(236,72,153,0.3)]"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/542944905560?text=Hola%20Pachi!%20Te%20escribo%20desde%20la%20web%20de%20La%20Tienda%20de%20Pachi"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp Taller"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />

              <span>
                WhatsApp Taller
              </span>
            </a>

          </div>

          {/* =================================================
              BOTÓN MENÚ MOBILE
          ================================================== */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen
                ? "Cerrar menú"
                : "Abrir menú"
            }
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#13131b] border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>

        {/* =====================================================
            MENÚ MOBILE
        ====================================================== */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-slate-800/80 space-y-2">

            {/* INICIO */}
            <button
              type="button"
              onClick={() => navigateTo("home")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                currentPage === "home"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-300 bg-[#13131b] border border-slate-800 hover:text-white"
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            {/* COTIZADOR */}
            <button
              type="button"
              onClick={() => navigateTo("quote")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                currentPage === "quote"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-300 bg-[#13131b] border border-slate-800 hover:text-white"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Cotizador</span>
            </button>

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/la.tienda.de.pachi"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 bg-[#13131b] border border-slate-800 hover:text-pink-300 transition"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Instagram</span>
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/542944905560?text=Hola%20Pachi!%20Te%20escribo%20desde%20la%20web%20de%20La%20Tienda%20de%20Pachi"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 bg-[#13131b] border border-slate-800 hover:text-emerald-300 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Taller</span>
            </a>

          </nav>
        )}

      </div>
    </header>
  );
};

export default Navbar;
