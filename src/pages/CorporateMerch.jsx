import React, { useState } from 'react';

import { useWorkshop } from '../context/WorkshopContext';

import {
  Building2,
  Briefcase,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Clock,
  Gift,
  Award,
  BadgePercent,
  FileCheck2,
} from 'lucide-react';

export const CorporateMerch = () => {
  // Consumimos los precios y descuentos configurados por Juan
  const { corpPricing, corpDiscounts } = useWorkshop();

  // Selector interactivo para cotización estimada por volumen
  const [packType, setPackType] = useState('keychain');

  const [quantity, setQuantity] = useState(50);

  // Datos dinámicos de los packs usando los precios del taller
  const packs = {
    keychain: {
      name: 'Llaveros con Logo en Relieve',
      desc: 'Ideales para ferias, entregas a clientes, hoteles y packaging.',
      basePerUnit: corpPricing.keychain,
      minQty: 20,
    },

    trophy: {
      name: 'Trofeos & Reconocimientos Gamer/Pyme',
      desc: 'Premios para torneos de esports, aniversarios y reconocimientos internos.',
      basePerUnit: corpPricing.trophy,
      minQty: 5,
    },

    desk: {
      name: 'Soportes de Escritorio / Celular con Marca',
      desc: 'Regalo útil de alto impacto visual para el setup de trabajo de clientes.',
      basePerUnit: corpPricing.desk,
      minQty: 15,
    },
  };

  // Cálculo de descuento por escala configurado por Juan
  const getDiscountPercent = (qty) => {
    if (qty >= 150) return corpDiscounts.tier3;
    if (qty >= 100) return corpDiscounts.tier2;
    if (qty >= 50) return corpDiscounts.tier1;

    return 0;
  };

  const discount = getDiscountPercent(quantity);

  const activePack = packs[packType] || packs.keychain;

  const unitPrice = Math.round(
    activePack.basePerUnit * (1 - discount / 100)
  );

  const totalPrice = unitPrice * quantity;

  const whatsappCorpMessage = encodeURIComponent(
    `¡Hola Juan! Te consulto por un pedido corporativo para una empresa/evento:\n` +
      `• Producto: ${activePack.name}\n` +
      `• Cantidad estimada: ${quantity} unidades\n` +
      `• Estimado web: ~$${totalPrice.toLocaleString(
        'es-AR'
      )} (${
        discount > 0
          ? discount + '% desc. aplicado'
          : 'Precio base'
      })\n` +
      `¿Podemos coordinar para enviarte nuestro logo y ver opciones de colores?`
  );

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20 pt-4">
      {/* ENCABEZADO CORPORATIVO */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
          <Building2 className="w-3.5 h-3.5" />
          VENTA MAYORISTA & MERCHANDISING B2B
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Regalos Corporativos &
          <br />

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500">
            Piezas con tu Marca en Relieve
          </span>
        </h1>

        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Diseñamos y producimos objetos tangibles que tus
          clientes y equipo conservan. Fabricación en Neuquén
          con muestra física previa y descuentos por lote.
        </p>
      </section>

      {/* CALCULADORA DE VOLUMEN INTERACTIVA */}
      <section className="bg-[#13131b] border border-cyan-500/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
              Simulador de Pedido
            </span>

            <h2 className="text-2xl font-bold text-white mt-1">
              Estimador de Presupuesto por Volumen
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-mono">
            <BadgePercent className="w-4 h-4 text-emerald-400" />
            Hasta {corpDiscounts.tier3}% de descuento en lotes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Opciones de Producto */}
          <div className="md:col-span-7 space-y-6">
            {/* Selector de Tipo */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-slate-300">
                1. Elegí el tipo de producto:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'keychain',
                    label: 'Llaveros',
                    icon: Gift,
                  },
                  {
                    id: 'desk',
                    label: 'Soportes Desk',
                    icon: Briefcase,
                  },
                  {
                    id: 'trophy',
                    label: 'Trofeos',
                    icon: Award,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPackType(item.id)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                        packType === item.id
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-sm shadow-cyan-500/25'
                          : 'bg-[#181822] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          packType === item.id
                            ? 'text-cyan-400'
                            : 'text-slate-500'
                        }`}
                      />

                      <span className="text-xs font-bold">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector de Cantidad */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-slate-300">
                  2. Cantidad de unidades:
                </label>

                <span className="font-mono text-cyan-400 font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
                  {quantity} unidades
                </span>
              </div>

              <input
                type="range"
                min="20"
                max="250"
                step="10"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>20 u. (Base)</span>
                <span>
                  50 u. ({corpDiscounts.tier1}% OFF)
                </span>
                <span>
                  100 u. ({corpDiscounts.tier2}% OFF)
                </span>
                <span>
                  150+ u. ({corpDiscounts.tier3}% OFF)
                </span>
              </div>
            </div>

            {/* Detalle descriptivo */}
            <div className="bg-[#181824] border border-slate-800 rounded-xl p-4 text-xs text-slate-400">
              <div className="text-white font-bold text-sm mb-1">
                {activePack.name}
              </div>

              <p>{activePack.desc}</p>
            </div>
          </div>

          {/* Bloque de Resumen */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#181826] to-[#0f0f18] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-5 text-center shadow-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Presupuesto Estimado
            </span>

            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight">
                ${totalPrice.toLocaleString('es-AR')}
              </div>

              <div className="text-xs font-mono text-cyan-400">
                (~${unitPrice.toLocaleString('es-AR')} por unidad)
              </div>
            </div>

            {discount > 0 && (
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold">
                ✓ {discount}% de descuento por volumen incluido
              </div>
            )}

            <div className="text-left text-xs space-y-2 border-t border-slate-800 pt-4 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Muestra previa de prueba sin costo</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Colores institucionales a elección</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>
                  Entrega coordinada en Neuquén y Alto Valle
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/5492990000000?text=${whatsappCorpMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/25"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              Consultar Disponibilidad con Juan
            </a>
          </div>
        </div>
      </section>

      {/* 3 VENTAJAS DEL TALLER PARA EMPRESAS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13131b] border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>

          <h3 className="text-white font-bold text-base">
            Modelado 3D de tu Logo
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Solo nos enviás el logo en imagen o vector y
            nosotros nos encargamos de adaptarlo a relieve 3D
            listo para impresión.
          </p>
        </div>

        <div className="bg-[#13131b] border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
            <FileCheck2 className="w-5 h-5" />
          </div>

          <h3 className="text-white font-bold text-base">
            Prototipo de Aprobación
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Antes de arrancar la producción del lote, imprimimos
            una muestra física para que veas el tamaño, color y
            terminación en mano.
          </p>
        </div>

        <div className="bg-[#13131b] border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>

          <h3 className="text-white font-bold text-base">
            Tiempos Claros de Entrega
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Coordinamos fechas reales según la capacidad de camas
            del taller. Sin sorpresas ni demoras de envíos lejanos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CorporateMerch;