import React, { useState } from 'react';

import {
  Camera,
  Sparkles,
} from 'lucide-react';

export const ProductPlaceholder = ({
  title,
  category,
  description,
  image,
  badge,
}) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = Boolean(image && !imageError);

  const whatsappInquiryMessage = encodeURIComponent(
    `¡Hola Pachi! Vi este trabajo en tu web y me gustaría consultar por uno similar:\n` +
      `• Producto: ${title} (${category})\n` +
      `¿Tenés disponibilidad o qué colores de filamento tenés en taller?`
  );

  return (
    <div className="bg-[#1b1b23] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-cyan-500/10">
      {/* SLOT CONTENEDOR DE IMAGEN */}
      <div className="relative h-60 w-full bg-[#12121a] overflow-hidden flex items-center justify-center border-b border-slate-800/80">
        {hasValidImage ? (
          <>
            {/* Foto real con efecto zoom hover */}
            <img
              src={image}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradiente oscuro inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b23] via-transparent to-transparent opacity-80" />

            {/* Badge opcional */}
            {badge && (
              <span className="absolute top-3 right-3 text-[10px] font-mono uppercase bg-black/75 backdrop-blur-md border border-cyan-500/50 text-cyan-300 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {badge}
              </span>
            )}
          </>
        ) : (
          /* Placeholder cuando aún no se cargó la imagen */
          <div className="p-6 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 shadow-inner">
              <Camera className="w-6 h-6 stroke-[1.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-300 block font-semibold">
                Slot listo para foto
              </span>

              <span className="text-[11px] text-slate-500 font-mono block">
                {image || 'subir a /public/productos/'}
              </span>
            </div>
          </div>
        )}

        {/* Categoría flotante */}
        <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-black/80 backdrop-blur-md border border-cyan-500/40 px-2.5 py-1 rounded-md">
          {category}
        </span>
      </div>

      {/* CONTENIDO DE LA TARJETA */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* BOTÓN DIRECTO A WHATSAPP */}
        <a
          href={`https://wa.me/542944905560?text=${whatsappInquiryMessage}`}
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-200 transition-all duration-200 text-center block"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductPlaceholder;