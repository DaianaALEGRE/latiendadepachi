import React from 'react';
import {
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  MessageCircle,
  MapPin,
  ArrowRight,
  Zap,
  CheckCircle2,
  Wrench,
} from 'lucide-react';

import { ProductPlaceholder } from '../components/ProductPlaceholder';

export const Home = () => {
  const featuredProducts = [
    {
      id: 'gpu-bracket',
      title: 'Soporte Anti-Sag para Placas de Video (GPU)',
      category: 'Gamer & Setup',
      badge: 'Bestseller Taller',
      description:
        'Estructura geométrica reforzada en PLA para evitar la flexión de placas RTX y Radeon. Altura regulable a medida.',
      image: '/productos/gpu-support.jpg',
    },
    {
      id: 'mate-termico',
      title: 'Mate Térmico Poligonal con Interior Extraíble',
      category: 'Deco & Cotidiano',
      badge: 'Diseño Propio',
      description:
        'Diseño facetado de alto agarre con cámara térmica de aire. Incluye vaso interno de polímero apto consumo.',
      image: '/productos/mate-termico.jpg',
    },
    {
      id: 'figuras-anime',
      title: 'Figuras Anime, Chibi & Personajes Pop',
      category: 'Coleccionables',
      badge: 'Detalle Fino',
      description:
        'Impresiones con altura de capa 0.12mm para máxima suavidad. Modelos de Mario, Hello Kitty, Pokémon y más.',
      image: '/productos/figura-anime.jpg',
    },
    {
      id: 'jabonera-hoja',
      title: 'Jaboneras con Drenaje Cascada Autolimpiante',
      category: 'Hogar & Baño',
      badge: 'Funcional',
      description:
        'Diseño orgánico en forma de hoja que escurre el agua directamente a la bacha, conservando el jabón seco.',
      image: '/productos/jabonera-hoja.jpg',
    },
    {
      id: 'repuestos-mecanicos',
      title: 'Repuestos & Piezas Mecánicas a Medida',
      category: 'Técnico & Custom',
      badge: 'Alta Resistencia',
      description:
        'Engranajes, trabas de auto, perillas y soportes para electrodomésticos descatalogados o difíciles de conseguir.',
      image: '/productos/repuesto-moto.jpg',
    },
    {
      id: 'llaveros-merch',
      title: 'Llaveros y Merchandising en Relieve',
      category: 'Corporativo & Eventos',
      badge: 'Lotes x Mayor',
      description:
        'Llaveros corporativos bicolores para marcas, ferias, hoteles y eventos gamers en la Patagonia.',
      image: '/productos/llavero-merch.jpg',
    },
  ];

  return (
    <div className="space-y-24 pb-20">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative rounded-3xl bg-gradient-to-b from-[#161622] to-[#0d0d16] border border-cyan-500/20 p-8 md:p-14 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5" />
            TALLER EN NEUQUÉN CAPITAL • ENVÍOS Y RETIROS
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            IMPRESIÓN 3D
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500">
              PERSONALIZADA & GAMER
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Desde figuras coleccionables y mates térmicos hasta soportes de GPU
            a medida y regalos corporativos por volumen. Fabricación aditiva de
            precisión en filamento de primera calidad.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">

            <a
              href="https://wa.me/5492990000000?text=Hola%20Juan!%20Te%20contacto%20desde%20la%20web%20para%20consultar%20por%20una%20impresi%C3%B3n%203D"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-cyan-500/25"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              Pedir Presupuesto por WhatsApp
            </a>

            <a
              href="https://instagram.com/la.tienda.de.pachi"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#1b1b26] hover:bg-[#232332] text-slate-300 hover:text-white border border-slate-700 font-bold text-sm flex items-center gap-2 transition"
            >
              Ver Instagram @la.tienda.de.pachi
            </a>

          </div>
        </div>
      </section>

      {/* =========================================================
          CATÁLOGO DE PRODUCTOS
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
            Cada pieza se imprime con parámetros ajustados a su función: desde
            alta resistencia mecánica hasta acabado fino para colección.
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
              Un enlace de Thingiverse/Printables, un archivo .STL o
              simplemente una foto de referencia de lo que necesitás.
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
              Calculamos el peso exacto en gramos de filamento y te pasamos el
              presupuesto final con opciones de colores en stock.
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
              Fabricación en cama caliente, posprocesado artesanal de rebabas y
              retiro coordinado en Neuquén Capital.
            </p>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;