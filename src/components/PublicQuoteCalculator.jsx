
import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Cake,
  Coffee,
  Tag,
  Lamp,
  Cpu,
  HelpCircle,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  pieceTypes,
  sizes,
  finishes,
  business,
} from "../config/quoteConfig";
import { fetchPublicQuote } from "../lib/supabase";

const renderIcon = (iconName, className) => {
  const props = { className: `${className} w-5 h-5` };

  switch (iconName) {
    case "Gamepad2":
      return <Gamepad2 {...props} />;
    case "Cake":
      return <Cake {...props} />;
    case "Coffee":
      return <Coffee {...props} />;
    case "Tag":
      return <Tag {...props} />;
    case "Lamp":
      return <Lamp {...props} />;
    case "Cpu":
      return <Cpu {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};

const formatPrice = (value) => {
  if (value === null || value === undefined) return "";
  return Number(value).toLocaleString("es-AR");
};

export const PublicQuoteCalculator = () => {
  const [type, setType] = useState(pieceTypes[0]);
  const [size, setSize] = useState("mediano");
  const [finish, setFinish] = useState(finishes[0]);
  const [quantity, setQuantity] = useState(1);

  const [quoteResult, setQuoteResult] = useState({
    min: null,
    max: null,
    loading: false,
    error: false,
  });

  const selectedSizeObj = sizes.find((s) => s.id === size);

  useEffect(() => {
    if (size === "custom") {
      setQuoteResult({
        min: null,
        max: null,
        loading: false,
        error: false,
      });
      return;
    }

    const preset = type.sizes[size];

    if (!preset) {
      setQuoteResult({
        min: null,
        max: null,
        loading: false,
        error: true,
      });
      return;
    }

    let isMounted = true;

    setQuoteResult({
      min: null,
      max: null,
      loading: true,
      error: false,
    });

    const hours =
      preset.printHours + preset.printMinutes / 60;

    const laborHours = preset.laborHours || 0.25;

    fetchPublicQuote({
      grams: preset.grams,
      printHours: hours,
      laborHours: laborHours,
      finishMultiplier:
        finish.laborMultiplier || 1.0,
      quantity: quantity,
    })
      .then((res) => {
        if (!isMounted) return;

        if (!res) {
          setQuoteResult({
            min: null,
            max: null,
            loading: false,
            error: true,
          });
          return;
        }

        setQuoteResult({
          min: res.estimado_min,
          max: res.estimado_max,
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.error("Error al cotizar:", err);

        if (!isMounted) return;

        setQuoteResult({
          min: null,
          max: null,
          loading: false,
          error: true,
        });
      });

    return () => {
      isMounted = false;
    };
  }, [type, size, finish, quantity]);

  const whatsappPrice =
    quoteResult.min !== null &&
    quoteResult.max !== null
      ? `Estimado orientativo en web: $${formatPrice(
          quoteResult.min
        )} - $${formatPrice(
          quoteResult.max
        )} ARS`
      : "No se pudo obtener un estimado automático.";

  const whatsappMessage = encodeURIComponent(
    `Hola Pachi! Estuve usando el cotizador en la web de La Tienda de Pachi:\n\n` +
      `• Pieza: ${type.name}\n` +
      `• Tamaño: ${
        selectedSizeObj?.name || size
      } (${selectedSizeObj?.measurement || ""})\n` +
      `• Terminación: ${finish.name}\n` +
      `• Cantidad: ${quantity} u.\n\n` +
      `${
        size === "custom"
          ? "Quisiera cotizar una pieza a medida."
          : whatsappPrice
      }\n\n` +
      `¿Me confirmás presupuesto final según el modelo?`
  );

  return (
    <section
      id="cotizador"
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6"
    >
      {/* HEADER DE SECCIÓN */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] uppercase tracking-wider font-semibold">
          Cotizador Rápido y Seguro
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mt-3">
          Calculá tu Presupuesto 3D
        </h2>

        <p className="text-slate-400 text-sm mt-2">
          Elegí tu tipo de proyecto y obtené un rango
          orientativo al instante.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CONTROLES PÚBLICOS */}
        <div className="lg:col-span-7 bg-[#0f131a] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">

          {/* 1. TIPO DE PIEZA */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#00F0FF] mb-3 font-semibold">
              1. Tipo de pieza
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pieceTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item)}
                  className={`p-3 rounded-xl bg-[#161c26] border-2 text-left transition-all ${
                    type.id === item.id
                      ? "border-[#25D366] bg-[#162520]/40 shadow-md"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className={`${item.color} mb-1.5`}>
                    {renderIcon(
                      item.iconName,
                      item.color
                    )}
                  </div>

                  <div className="text-xs font-bold text-white leading-tight">
                    {item.name}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {item.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. TAMAÑO */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#00F0FF] mb-3 font-semibold">
              2. Tamaño
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sizes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSize(item.id)}
                  className={`p-3 rounded-xl bg-[#161c26] border-2 text-center transition-all ${
                    size === item.id
                      ? "border-[#25D366] bg-[#162520]/40"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-white">
                    {item.name}
                  </div>

                  {item.measurement && (
                    <div className="text-[10px] font-mono text-[#25D366] mt-1 font-semibold">
                      {item.measurement}
                    </div>
                  )}

                  <div className="text-[9px] text-slate-400 mt-1">
                    {item.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. TERMINACIÓN */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#00F0FF] mb-3 font-semibold">
              3. Terminación de color
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {finishes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFinish(item)}
                  className={`p-4 rounded-xl bg-[#161c26] border-2 text-left transition-all ${
                    finish.id === item.id
                      ? "border-[#25D366] bg-[#162520]/40"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>{item.name}</span>

                    {finish.id === item.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                    )}
                  </div>

                  <div className="text-xs text-slate-400 mt-1">
                    {item.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. CANTIDAD */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase text-[#00F0FF] font-semibold">
                4. Cantidad
              </label>

              <span className="text-xs font-mono text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded border border-[#25D366]/30 font-bold">
                {quantity}{" "}
                {quantity === 1
                  ? "unidad"
                  : "unidades"}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="w-full accent-[#25D366] cursor-pointer"
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {[1, 5, 10, 25, 50].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setQuantity(v)}
                  className={`px-3 py-1 rounded-lg border text-xs font-mono transition-all ${
                    quantity === v
                      ? "border-[#25D366] bg-[#25D366]/20 text-white font-bold"
                      : "border-slate-800 bg-[#161c26] text-slate-400 hover:text-white"
                  }`}
                >
                  {v} u
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESUMEN PÚBLICO */}
        <div className="lg:col-span-5 bg-[#0f131a] border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-24">

          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              // RESUMEN ESTIMADO
            </span>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] uppercase font-bold">
              Online
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono mt-6">
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">
                Pieza:
              </span>

              <span className="text-white font-bold">
                {type.name}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">
                Tamaño:
              </span>

              <span className="text-[#00F0FF] font-bold">
                {selectedSizeObj?.name}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">
                Terminación:
              </span>

              <span className="text-pink-400 font-bold">
                {finish.name}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">
                Cantidad:
              </span>

              <span className="text-white font-bold">
                {quantity} u.
              </span>
            </div>
          </div>

          {/* RANGO ESTIMATIVO */}
          <div className="p-5 rounded-2xl bg-[#161c26] border border-slate-800 text-center mt-6">

            {size === "custom" ? (
              <>
                <div className="text-xl font-bold text-white">
                  Pieza a Medida
                </div>

                <p className="text-[11px] text-slate-400 mt-2">
                  Escribinos con tu archivo o medidas
                  para darte el valor justo.
                </p>
              </>
            ) : quoteResult.loading ? (
              <>
                <div className="flex items-center justify-center gap-2 text-white font-bold">
                  <Loader2 className="w-5 h-5 animate-spin text-[#25D366]" />
                  Calculando...
                </div>

                <p className="text-[11px] text-slate-400 mt-2">
                  Consultando el cotizador.
                </p>
              </>
            ) : quoteResult.error ? (
              <>
                <div className="text-lg font-bold text-red-300">
                  No se pudo calcular
                </div>

                <p className="text-[11px] text-slate-400 mt-2">
                  Intentá nuevamente en unos segundos.
                </p>
              </>
            ) : (
              <>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Rango orientativo
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  ${formatPrice(quoteResult.min)} - $
                  {formatPrice(quoteResult.max)}

                  <span className="text-xs font-mono text-[#25D366] ml-1.5 font-bold">
                    ARS
                  </span>
                </div>
              </>
            )}

            {/* ADVERTENCIA */}
            <div className="mt-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />

              <p className="text-[10px] text-amber-300/90 leading-relaxed font-sans">
                <strong>Importante:</strong> El valor
                mostrado es{" "}
                <strong>
                  estrictamente estimativo
                </strong>
                . El presupuesto definitivo se
                confirma una vez evaluada la geometría
                del modelo 3D y densidad en taller.
              </p>
            </div>
          </div>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${business.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 mt-6 transition-all shadow-lg hover:shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Consultar y Confirmar con Pachi
          </a>
        </div>
      </div>
    </section>
  );
};

export default PublicQuoteCalculator;
