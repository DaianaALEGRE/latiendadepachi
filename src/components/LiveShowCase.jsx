import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";

const slides = [
  {
    category: "01 // MERCH: LLAVEROS AKA",
    title: "Lote Llaveros AKA con Packaging",
    badge: "Fotos Reales",
    image: "/img/Llaveros/Llavero1.jpg",
    color: "text-cyan-400",
    resolution: "0.20mm",
    finish: "Multi-color",
    makerLevel: "Batch-PRO",
  },
  {
    category: "02 // FIGURAS: MARIO, LUIGI & TOAD",
    title: "Colección Clásicos Nintendo 3D",
    badge: "Fotos Reales",
    image: "/img/Figuras/mario_luigi_toad.jpg",
    color: "text-emerald-400",
    resolution: "0.12mm",
    finish: "Satinado Fino",
    makerLevel: "Detail-UP",
  },
  {
    category: "03 // TOPPERS: CARLITOS & SPIKE",
    title: "Kit Topper Torta en Festejo Real",
    badge: "Fotos Reales",
    image: "/img/Figuras/Kit de torta Carlitos.jpg",
    color: "text-pink-400",
    resolution: "0.16mm",
    finish: "Satinado",
    makerLevel: "1-UP",
  },
  {
    category: "04 // DECO & HOGAR: JABONERA",
    title: "JABONERA 3D con Diseño Propio",
    badge: "Diseño Propio",
    image: "/img/Hogar/Jabonera.jpg",
    color: "text-amber-400",
    resolution: "0.12mm",
    finish: "Pintado a Mano",
    makerLevel: "Custom",
  },
];

export const LiveShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay cada 4.5 segundos si el usuario no tiene el cursor encima
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <div
      className="w-full bg-[#111119] border border-cyan-500/20 rounded-2xl p-4 sm:p-5 shadow-2xl relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* HEADER DECORATIVO DE TERMINAL MAKER */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-[11px] font-mono text-slate-400 ml-2">
            // TALLER DE PACHI // LIVE SHOWCASE
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          EXTRUYENDO
        </span>
      </div>

      {/* CONTENEDOR PRINCIPAL DE IMAGEN */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#07070c] border border-slate-800 flex items-center justify-center group">
        {/* Imagen Activa con transición suave */}
        <img
          key={active.image}
          src={active.image}
          alt={active.title}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradiente sutil inferior para legibilidad del texto sin oscurecer la pieza */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/95 via-[#0a0a12]/30 to-transparent pointer-events-none" />

        {/* Badges superiores flotantes */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
          <span
            className={`px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[11px] font-bold ${active.color}`}
          >
            {active.category}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md">
            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
            {active.badge}
          </span>
        </div>

        {/* Título y descripción en la parte inferior */}
        <div className="absolute bottom-3 left-4 right-16 z-10 pointer-events-none">
          <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug drop-shadow-md">
            {active.title}
          </h3>
        </div>

        {/* Flecha Anterior */}
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/20 hover:border-cyan-400 flex items-center justify-center backdrop-blur-sm transition-all shadow-lg z-20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Flecha Siguiente */}
        <button
          onClick={nextSlide}
          aria-label="Siguiente slide"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/20 hover:border-cyan-400 flex items-center justify-center backdrop-blur-sm transition-all shadow-lg z-20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Puntos Indicadores (Dots) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-4 bg-cyan-400"
                  : "w-1.5 bg-slate-500 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* METADATOS TÉCNICOS DE IMPRESIÓN (PIE DEL SHOWCASE) */}
      <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-slate-800/80 text-center font-mono">
        <div>
          <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
            Resolución
          </span>
          <span className="text-xs font-bold text-white">
            {active.resolution}
          </span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
            Acabado
          </span>
          <span className="text-xs font-bold text-emerald-400">
            {active.finish}
          </span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
            Nivel Maker
          </span>
          <span className="text-xs font-bold text-cyan-400">
            {active.makerLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveShowcase;