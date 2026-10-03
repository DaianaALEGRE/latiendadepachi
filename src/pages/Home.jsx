import React from 'react';
import {
  Zap,
  MessageCircle,
  MapPin,
  Instagram,
  ArrowRight
} from 'lucide-react';

import { ProductPlaceholder } from '../components/ProductPlaceholder';

import LiveShowCase from '../components/LiveShowCase'; // <-- Componente del Carrusel

export const Home = ({ onNavigate }) => {
  const featuredProducts = [
    {
      id: 'figuras-pop-tortas',
      title: 'Figuras Pop & Kits de Torta Personalizados',
      category: '01 // Pop & Eventos',
      badge: 'Bestseller',
      description:
        'Toppers para tortas de cumple, figuras Mini-Tú de personas y mascotas, y personajes de anime y videojuegos (Mario, Friends, Booba).',
      image: '/img/catalogo/torta-carlitos.jpg', // o /productos/figura-anime.jpg
    },
    {
      id: 'tradicion-vehiculos',
      title: 'Mates Térmicos, Naipes & Vehículos a Escala',
      category: '02 // Tradición & Juegos',
      badge: 'Apto Alimentos',
      description:
        'Mates térmicos con vaso interior lavable, kits anotadores de Truco grabados y réplicas de camionetas y colectivos de turismo.',
      image: '/img/catalogo/kit-truco.jpg', // o /productos/mate-termico.jpg
    },
    {
      id: 'deco-setup-hardware',
      title: 'Deco Hogar, Veladores & Setup Gamer',
      category: '03 // Hogar & Setup',
      badge: 'Diseño Propio',
      description:
        'Soportes anti-sag para placas de video GPU, veladores geométricos 3D, posavasos temáticos y jaboneras botánicas.',
      image: '/img/catalogo/congas-deco.jpg', // o /productos/gpu-support.jpg
    },
    {
      id: 'merch-llaveros',
      title: 'Llaveros y Merchandising en Serie x Mayor',
      category: '04 // Pymes & Merch',
      badge: 'Lotes x Mayor',
      description:
        'Llaveros institucionales con packaging sellado para emprendimientos, medallas deportivas y nombres en relieve para útiles.',
      image: '/img/catalogo/llaveros-aka.jpg', // o /productos/llavero-merch.jpg
    },
    {
      id: 'mascotas-mini-tu',
      title: 'Mascotas Esculpidas & Mini-Tú Custom',
      category: '05 // Personalizado',
      badge: '100% Exclusivo',
      description:
        'Modelado 3D a partir de tus fotos reales de perros, gatos y familiares para regalar un recuerdo inolvidable.',
      image: '/img/catalogo/mascota-yorkshire.jpg',
    },
    {
      id: 'repuestos-tecnicos',
      title: 'Piezas Técnicas & Repuestos a Medida',
      category: '06 // Técnico & Prototipos',
      badge: 'Alta Resistencia',
      description:
        'Engranajes, trabas y adaptadores mecánicos impresos en filamento reforzado para piezas discontinuadas.',
      image: '/img/catalogo/repuesto-tecnico.jpg',
    },
  ];

  return (
    <div className="space-y-24 pb-20">

      {/* =========================================================
          HERO SECTION CON CARRUSEL SHOWCASE EN VIVO
      ========================================================= */}
      <section className="relative rounded-3xl bg-gradient-to-b from-[#161622] to-[#0d0d16] border border-cyan-500/20 p-6 md:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Cuadrícula de 2 columnas: Texto a la izquierda, Carrusel a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

          {/* Columna Izquierda: Información y llamados a la acción */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5" />
              TALLER EN BARILOCHE - PATAGONIA ARGENTINA • ENVÍOS A TODO EL PAÍS
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase">
              De tu imaginación a tus manos en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                3D
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              Desde figuras coleccionables y kits de torta personalizados, hasta mates térmicos y soportes para setup gamer. Fabricación aditiva artesanal con filamento de alta calidad en Bariloche - Patagonia Argentina.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
            <button
  type="button"
  onClick={() => onNavigate("quote")}
  className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-cyan-500/25"
>
  <Zap className="w-4 h-4" />
  Calcular Presupuesto
</button>

              <a
                href="https://wa.me/5492944905560?text=Hola%20Juan!%20Te%20contacto%20desde%20la%20web%20de%20La%20Tienda%20de%20Pachi%20para%20consultar%20por%20una%20impresi%C3%B3n%203D"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#1b1b26] hover:bg-[#232332] text-slate-300 hover:text-white border border-slate-700 font-bold text-sm flex items-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Directo
              </a>

              <a
                href="https://instagram.com/la.tienda.de_pachi"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#1b1b26] hover:bg-[#232332] text-slate-300 hover:text-white border border-slate-700 font-bold text-sm flex items-center gap-2 transition"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                Instagram
              </a>
            </div>
          </div>

          {/* Columna Derecha: Renderizado del Carrusel LiveShowCase */}
          <div className="lg:col-span-5 w-full">
            <LiveShowCase />
          </div>

        </div>
      </section>


      {/* =========================================================
          CATÁLOGO DE PRODUCTOS / ESPECIALIDADES
      ========================================================= */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              Catálogo de Especialidades
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Trabajos del Taller & Modelos Populares
            </h2>
          </div>

          <p className="text-xs text-slate-400 max-w-md font-mono">
            Cada pieza se imprime con parámetros ajustados a su función: desde alta resistencia mecánica hasta acabado fino para colección.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductPlaceholder
              key={product.id}
              title={product.title}
              category={product.category}
              badge={product.badge}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      </section>


      {/* =========================================================
          COTIZADOR SEGURO E INTELIGENTE
      ========================================================= */}
     


      {/* =========================================================
          CÓMO ENCARGAR
      ========================================================= */}
      <section className="bg-[#13131b] border border-slate-800 rounded-3xl p-8 md:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase">
            Sin Vueltas
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            ¿Cómo encargar tu pieza?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PASO 01 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 font-mono font-bold flex items-center justify-center">
              01
            </div>
            <h3 className="text-white font-bold text-base">
              Envianos tu idea o archivo
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Un enlace de Thingiverse/Printables, un archivo .STL o simplemente una foto de referencia de lo que necesitás.
            </p>
          </div>

          {/* PASO 02 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 font-mono font-bold flex items-center justify-center">
              02
            </div>
            <h3 className="text-white font-bold text-base">
              Cotización transparente
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              El cotizador o los makers analizan los parámetros del laminador y te pasamos el presupuesto cerrado sin sorpresas.
            </p>
          </div>

          {/* PASO 03 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 font-mono font-bold flex items-center justify-center">
              03
            </div>
            <h3 className="text-white font-bold text-base">
              Impresión y entrega
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fabricación en cama caliente, posprocesado artesanal de rebabas y retiro o envío seguro desde Bariloche - Patagonia Argentina.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;