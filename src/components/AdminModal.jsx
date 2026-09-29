import React, { useState } from 'react';

import { useWorkshop } from '../context/WorkshopContext';

import {
  KeyRound,
  X,
  CheckCircle2,
  AlertCircle,
  Scale,
  Building2,
  Percent,
} from 'lucide-react';

export const AdminModal = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdmin,
    logoutAdmin,
    gramRate,
    corpPricing,
    corpDiscounts,
    updateSettings,
  } = useWorkshop();

  const [activeTab, setActiveTab] = useState('filament');

  const [pin, setPin] = useState('');

  // Estados editables del formulario
  const [rateInput, setRateInput] = useState(gramRate);
  const [pricingInput, setPricingInput] = useState(corpPricing);
  const [discountsInput, setDiscountsInput] =
    useState(corpDiscounts);

  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatusMessage(null);

    const res = await updateSettings({
      newGramRate: rateInput,
      newCorpPricing: pricingInput,
      newCorpDiscounts: discountsInput,
      enteredPin: pin,
    });

    setIsSubmitting(false);

    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: '✓ Precios y descuentos actualizados con éxito',
      });

      setPin('');

      setTimeout(() => {
        setStatusMessage(null);
        setIsAdminModalOpen(false);
      }, 1300);
    } else {
      setStatusMessage({
        type: 'error',
        text: res.message || 'Clave no válida',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#1b1b23] border border-cyan-500/40 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
        {/* Botón cerrar */}
        <button
          onClick={() => {
            setIsAdminModalOpen(false);
            setStatusMessage(null);
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <KeyRound className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-lg tracking-wide">
              Panel de Tallerista
            </h3>

            <p className="text-xs text-slate-400">
              Configuración rápida para Juan
              (@la.tienda.de.pachi)
            </p>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-slate-700/80 mb-5 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('filament')}
            className={`pb-2 px-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'filament'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            1. Tarifa PLA ($/g)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('corporate')}
            className={`pb-2 px-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'corporate'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            2. Packs & Descuentos
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* TAB 1: FILAMENTO PLA */}
          {activeTab === 'filament' && (
            <div className="space-y-3 bg-[#13131b] p-4 rounded-xl border border-slate-800">
              <label className="text-xs text-slate-400 font-mono uppercase block">
                Precio por gramo PLA (ARS)
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-cyan-400 font-bold">
                  $
                </span>

                <input
                  type="number"
                  step="0.5"
                  required
                  value={rateInput}
                  onChange={(e) =>
                    setRateInput(e.target.value)
                  }
                  className="w-full bg-[#181822] border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-14 py-2.5 text-white font-mono text-lg focus:outline-none transition"
                />

                <span className="absolute right-3.5 top-3 text-xs text-slate-500 font-mono">
                  / gramo
                </span>
              </div>

              <p className="text-[11px] text-slate-500">
                Afecta directamente al cotizador STL
                interactivo.
              </p>
            </div>
          )}

          {/* TAB 2: PACKS CORPORATIVOS & DESCUENTOS */}
          {activeTab === 'corporate' && (
            <div className="space-y-4">
              {/* Precios Unitarios Base */}
              <div className="bg-[#13131b] p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs text-cyan-400 font-mono uppercase block font-bold">
                  Precios Base por Unidad (ARS)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Llaveros (c/u)
                    </label>

                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-cyan-400 text-xs">
                        $
                      </span>

                      <input
                        type="number"
                        step="50"
                        value={pricingInput.keychain}
                        onChange={(e) =>
                          setPricingInput({
                            ...pricingInput,
                            keychain: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#181822] border border-slate-700 focus:border-cyan-400 rounded-lg pl-6 pr-2 py-1.5 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Soporte Desk (c/u)
                    </label>

                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-cyan-400 text-xs">
                        $
                      </span>

                      <input
                        type="number"
                        step="100"
                        value={pricingInput.desk}
                        onChange={(e) =>
                          setPricingInput({
                            ...pricingInput,
                            desk: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#181822] border border-slate-700 focus:border-cyan-400 rounded-lg pl-6 pr-2 py-1.5 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Trofeos (c/u)
                    </label>

                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-cyan-400 text-xs">
                        $
                      </span>

                      <input
                        type="number"
                        step="200"
                        value={pricingInput.trophy}
                        onChange={(e) =>
                          setPricingInput({
                            ...pricingInput,
                            trophy: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#181822] border border-slate-700 focus:border-cyan-400 rounded-lg pl-6 pr-2 py-1.5 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Escalas de Descuento por Volumen */}
              <div className="bg-[#13131b] p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs text-cyan-400 font-mono uppercase block font-bold flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5" />
                  Descuentos por Lote (%)
                </span>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Desde 50 u.
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={discountsInput.tier1}
                        onChange={(e) =>
                          setDiscountsInput({
                            ...discountsInput,
                            tier1: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#181822] border border-slate-700 focus:border-cyan-400 rounded-lg pl-3 pr-6 py-1.5 text-white font-mono text-xs focus:outline-none"
                      />

                      <span className="absolute right-2.5 top-2 text-slate-500 text-xs">
                        %
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Desde 100 u.
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={discountsInput.tier2}
                        onChange={(e) =>
                          setDiscountsInput({
                            ...discountsInput,
                            tier2: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#181822] border border-slate-700 focus:border-cyan-400 rounded-lg pl-3 pr-6 py-1.5 text-white font-mono text-xs focus:outline-none"
                      />

                      <span className="absolute right-2.5 top-2 text-slate-500 text-xs">
                        %
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Desde 150+ u.
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={discountsInput.tier3}
                        onChange={(e) =>
                          setDiscountsInput({
                            ...discountsInput,
                            tier3: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#181822] border border-slate-700 focus:border-cyan-400 rounded-lg pl-3 pr-6 py-1.5 text-white font-mono text-xs focus:outline-none"
                      />

                      <span className="absolute right-2.5 top-2 text-slate-500 text-xs">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Campo de PIN obligatorio */}
          <div className="pt-2">
            <label className="text-xs text-slate-400 font-mono uppercase block mb-1.5">
              PIN de Tallerista
            </label>

            <input
              type="password"
              placeholder="Ingresá tu PIN (ej: 1984)..."
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-[#13131b] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-white tracking-widest font-mono text-center focus:outline-none transition text-sm"
            />
          </div>

          {/* Mensajes de feedback */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}

              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-2.5 rounded-xl transition font-sans shadow-lg shadow-cyan-500/25 text-sm"
            >
              {isSubmitting
                ? 'Guardando...'
                : 'Guardar Todo'}
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 hover:text-rose-300 text-xs text-slate-400 transition"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};