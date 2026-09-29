import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { 
  Calculator, 
  Layers, 
  Scale, 
  Clock, 
  MessageCircle, 
  AlertCircle, 
  Sparkles,
  Info,
  CheckCircle2,
  FileCode2
} from 'lucide-react';

export const StlQuote = () => {
  const { gramRate } = useWorkshop();

  // Estados del cotizador
  const [weight, setWeight] = useState(65); // gramos estimados
  const [printQuality, setPrintQuality] = useState('standard'); // draft, standard, fine
  const [infillPreset, setInfillPreset] = useState('20'); // 15%, 20%, 50%, 100%
  const [colorType, setColorType] = useState('mono'); // mono, duo

  // Factores multiplicadores orientativos por calidad/tiempo de máquina
  const qualityMultipliers = {
    draft: 0.9,     // 0.28mm (más rápido)
    standard: 1.0,  // 0.20mm (balance perfecto)
    fine: 1.25      // 0.12mm (alta resolución / figuras)
  };

  const colorAddon = colorType === 'duo' ? 1.15 : 1.0;

  // Cálculo en vivo del costo estimado
  const baseCost = Math.round(weight * gramRate * (qualityMultipliers[printQuality] || 1) * colorAddon);
  // Costo mínimo operativo de máquina ($1500 ARS base para piezas chicas)
  const finalCost = Math.max(baseCost, 1500);

  // Estimación de tiempo aproximado en horas
  const estimatedHours = Math.max(1, Math.round((weight / 15) * (qualityMultipliers[printQuality] || 1)));

  // Mensaje preconfigurado para WhatsApp
  const whatsappMessage = encodeURIComponent(
    `¡Hola Juan! Estuve probando el cotizador de la web:\n` +
    `• Peso estimado: ${weight}g\n` +
    `• Calidad: ${printQuality === 'fine' ? 'Fina (0.12mm)' : printQuality === 'draft' ? 'Rápida (0.28mm)' : 'Estándar (0.20mm)'}\n` +
    `• Relleno aproximado: ${infillPreset}%\n` +
    `• Estimado web: ~$${finalCost.toLocaleString('es-AR')}\n` +
    `Te consulto para pasarte el archivo STL y confirmarlo.`
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 pt-4">
      
      {/* Encabezado */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
          <Calculator className="w-3.5 h-3.5" />
          COTIZADOR INSTANTÁNEO • PLA PREMIUM
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Cotizá tu archivo <span className="text-cyan-400">STL / 3MF</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Ingresá el peso en gramos estimado por tu slicer (Bambu Studio, Cura, PrusaSlicer) 
          y calculá el valor al costo actual de taller.
        </p>
      </div>

      {/* Grid del Cotizador */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Panel de Controles (Izquierda) */}
        <div className="md:col-span-7 bg-[#13131b] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          
          {/* Slider de Peso en Gramos */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono uppercase text-slate-300 flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                Peso del Modelo (Gramos)
              </label>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-3 py-1 rounded-xl">
                <input
                  type="number"
                  min="5"
                  max="2000"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                  className="w-16 bg-transparent text-right font-mono font-bold text-cyan-400 text-base focus:outline-none"
                />
                <span className="text-xs text-slate-500 font-mono">g</span>
              </div>
            </div>

            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>5g (Llavero pequeño)</span>
              <span>150g (Mate/Soporte)</span>
              <span>500g+ (Figura grande)</span>
            </div>
          </div>

          {/* Calidad de Capa */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono uppercase text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Resolución de Capa
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'draft', label: 'Rápida', desc: '0.28mm • Prototipos' },
                { id: 'standard', label: 'Estándar', desc: '0.20mm • Recomendado' },
                { id: 'fine', label: 'Fina / Detalle', desc: '0.12mm • Figuras' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPrintQuality(opt.id)}
                  className={`p-3 rounded-xl border text-left transition ${
                    printQuality === opt.id
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                      : 'bg-[#181822] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`text-xs font-bold ${printQuality === opt.id ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {opt.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Relleno Orientativo (Infill) */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono uppercase text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Densidad de Relleno (Infill)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: '15', label: '15%', note: 'Figuras' },
                { val: '20', label: '20%', note: 'Estándar' },
                { val: '40', label: '40%', note: 'Mecánico' },
                { val: '100', label: '100%', note: 'Sólido' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setInfillPreset(item.val)}
                  className={`py-2 px-2 rounded-xl border text-center transition ${
                    infillPreset === item.val
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                      : 'bg-[#181822] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-mono font-bold">{item.label}</div>
                  <div className="text-[9px] text-slate-500">{item.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Color */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono uppercase text-slate-300">Esquema de Color</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setColorType('mono')}
                className={`p-3 rounded-xl border text-left text-xs transition ${
                  colorType === 'mono'
                    ? 'bg-cyan-950/40 border-cyan-400 text-white'
                    : 'bg-[#181822] border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold text-slate-200">Monocolor (1 Color)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Negro, blanco, rojo, cyan, etc.</div>
              </button>

              <button
                type="button"
                onClick={() => setColorType('duo')}
                className={`p-3 rounded-xl border text-left text-xs transition ${
                  colorType === 'duo'
                    ? 'bg-cyan-950/40 border-cyan-400 text-white'
                    : 'bg-[#181822] border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold text-slate-200">Doble Color (+15%)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Cambio de capa o bicolor</div>
              </button>
            </div>
          </div>

        </div>

        {/* Resumen & Tarjeta de Presupuesto (Derecha) */}
        <div className="md:col-span-5 space-y-5">
          
          <div className="bg-gradient-to-b from-[#1b1b26] to-[#14141d] border border-cyan-500/30 rounded-2xl p-6 md:p-7 shadow-2xl relative overflow-hidden">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Presupuesto Orientativo
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight">
                ${finalCost.toLocaleString('es-AR')}
              </span>
              <span className="text-xs font-mono text-cyan-400">ARS</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Tarifa activa taller:</span>
                <span className="font-mono text-white">${gramRate}/g</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gramos a imprimir:</span>
                <span className="font-mono text-white">{weight}g PLA</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tiempo de máquina est.:</span>
                <span className="font-mono text-cyan-300">~{estimatedHours} hs aprox.</span>
              </div>
            </div>

            {/* Botón WhatsApp con Cotización */}
            <a
              href={`https://wa.me/5492990000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-3.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/25"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              Confirmar Archivo con Juan
            </a>

            <p className="text-[11px] text-slate-500 text-center mt-3 leading-relaxed">
              El valor final se confirma una vez revisada la geometría del archivo STL.
            </p>
          </div>

          {/* Card explicativa de cómo obtener los gramos */}
          <div className="bg-[#13131b] border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              ¿No tenés el slicer o no sabés el peso?
            </div>
            <p className="leading-relaxed">
              No te preocupes: podés mandarle el link del modelo de Printables/Thingiverse directo a Juan por WhatsApp y él lo lamina en 2 minutos para darte el valor exacto.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StlQuote;