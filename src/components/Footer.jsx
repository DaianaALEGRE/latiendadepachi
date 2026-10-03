import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import {
  Instagram,
  MessageCircle,
  MapPin,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Footer = () => {
  const {
    setIsAdminModalOpen,
    isAdmin,
    gramRate,
  } = useWorkshop();

  const [clicks, setClicks] = useState(0);

  // Easter Egg: 3 clics rápidos en el logo abren el panel de Juan
  const handleEasterEgg = () => {
    const nextClicks = clicks + 1;

    if (nextClicks >= 3) {
      setIsAdminModalOpen(true);
      setClicks(0);
    } else {
      setClicks(nextClicks);

      // Reinicia el contador si no hace el tercer clic en 1.8 segundos
      setTimeout(() => setClicks(0), 1800);
    }
  };

  return (
    <footer className="bg-[#0b0b12] border-t border-slate-800/80 pt-12 pb-8 px-6 text-slate-400 text-sm mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Identidad de Marca & Disparador Oculto para Juan */}
        <div
          onClick={handleEasterEgg}
          className="flex items-center gap-4 cursor-pointer select-none group"
          title="La Tienda de Pachi - Taller Artesanal (3 clics para acceso de tallerista)"
        >
          <div className="w-12 h-12 rounded-full border border-slate-700 group-hover:border-cyan-400 overflow-hidden bg-slate-900 flex items-center justify-center transition shadow-lg shrink-0">

            {/* Si tenés el logo en public/logo-pachi.png o podés usar el avatar vectorizado */}
            <img
              src="/logo-pachi.png"
              alt="Logo La Tienda de Pachi"
              onError={(e) => {
                // Fallback visual si aún no colocaste la imagen en public/
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML =
                  '<span class="text-cyan-400 font-bold font-mono text-xs">LTDP</span>';
              }}
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-white font-bold tracking-wider group-hover:text-cyan-300 transition">
                LA TIENDA DE PACHI
              </h4>

              {isAdmin && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  ADMIN
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Taller de impresión 3D & custom mods • Bariloche - Patagonia Argentina
            </p>
          </div>
        </div>

        {/* Enlaces de Contacto y Redes */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
          <a
            href="https://instagram.com/la.tienda.de.pachi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>@la.tienda.de.pachi</span>
          </a>

          <span className="text-slate-700 hidden sm:inline">
            •
          </span>

          <a
            href="https://wa.me/542944905560?text=Hola%20Juan!%20Te%20escribo%20desde%20la%20web%20de%20La%20Tienda%20de%20Pachi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Taller</span>
          </a>

          <span className="text-slate-700 hidden sm:inline">
            •
          </span>

          <span className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Bariloche - Patagonia Argentina
          </span>
        </div>

        {/* Estado en vivo & Botón de apertura de Modal */}
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()}
          </span>

          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            <span className="font-mono text-[11px] tracking-wide">
              TALLER ACTIVO
            </span>

            {isAdmin && (
              <span className="text-cyan-400 font-mono font-bold ml-1 group-hover:underline">
                (${gramRate}/g)
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900/80 text-center text-[11px] text-slate-600">
        Piezas de alta precisión en PLA de primera calidad. Envíos y retiros coordinados en Bariloche - Patagonia Argentina.
      </div>
    </footer>
  );
};