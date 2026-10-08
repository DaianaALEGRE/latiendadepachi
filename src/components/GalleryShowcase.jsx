import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Layers, 
  Maximize2, 
  X,
  ExternalLink 
} from 'lucide-react';

// ============================================================================
// BASE DE DATOS DE FOTOGRAFÍAS REALES DEL TALLER
// Nota de Calidad de Imagen:
// En Postimages, las URLs 'https://i.postimg.cc/...' entregan la imagen real.
// Para evitar que en pantallas grandes de PC se vean borrosas o pixeladas:
// 1. Usamos 'object-contain' con fondo de contraste técnico o 'object-cover' con encuadre nítido.
// 2. Se implementa un Modal / Lightbox de Zoom para ver la foto en tamaño completo nativo en PC.
// ============================================================================
export const galleryCategories = [
  {
    id: 'figuras-pop-tortas',
    categoryNumber: '01',
    categoryName: 'Pop & Eventos',
    title: 'Figuras Pop & Kits de Torta Personalizados',
    badge: 'Bestseller',
    badgeColor: 'cyan',
    description: 'Toppers para tortas de cumple, figuras Mini-Tú de personas y mascotas, y personajes de anime y videojuegos (Mario, Friends, Booba).',
    whatsappText: 'Hola Pachi! Te consulto por una figura o kit de torta personalizado.',
    items: [
      { name: 'Bender Rodríguez (Futurama)', tag: 'Figura impresion 3D', img: 'https://i.postimg.cc/FdmZCtS0/Bender-Rodriguez.jpg' },
      { name: 'Booba (Adorno Infantil)', tag: 'Adorno Torta 3D', img: 'https://i.postimg.cc/YGk3Dcgc/Booba-(personaje-torta).jpg' },
      { name: 'Carlitos (Rugrats)', tag: 'Topper 3D', img: 'https://i.postimg.cc/LYRTQdPr/carlitos.jpg' },
      { name: 'Kit de Torta Carlitos', tag: 'Set Temático', img: 'https://i.postimg.cc/hh2rs5tY/Kit-de-torta-Carlitos.jpg' },
      { name: 'Mario, Luigi & Toad', tag: 'Set Temático', img: 'https://i.postimg.cc/N5LxzkKV/mario-luigi-toad.jpg' },
      { name: 'Bob Esponja', tag: 'Detalle Fiel', img: 'https://i.postimg.cc/dLD9xj7Y/Personaje-Bob-Esponja.jpg' },
      { name: 'Hello Kitty', tag: 'Custom 3D', img: 'https://i.postimg.cc/ctLcZQXh/Figura-Hello-Kitty.jpg' },
      { name: 'Demogorgon (Stranger Things)', tag: 'Modelado Fino', img: 'https://i.postimg.cc/WtN8MvTD/Figura-Demogorgon-(torta).jpg' },
      { name: 'Friends (Sillón & Marco)', tag: 'Serie TV', img: 'https://i.postimg.cc/Yjd3RsCy/friends.jpg' },
      { name: 'Congas Musicales para Torta', tag: 'Evento Especial', img: 'https://i.postimg.cc/WFjnYRZH/Congas-(diseno-torta).jpg' },
      { name: 'Pesebre Navideño Minimalista', tag: 'Edición Festiva', img: 'https://i.postimg.cc/ZWdxTYFV/Pesebre-navideno.jpg' },
    ]
  },
  {
    id: 'tradicion-vehiculos',
    categoryNumber: '02',
    categoryName: 'Tradición & Juegos',
    title: 'Mates , Naipes & Vehículos a Escala',
    badge: 'Apto Alimentos',
    badgeColor: 'amber',
    description: 'Mates personalizados, kits anotadores de Truco grabados y réplicas a escala.',
    whatsappText: 'Hola Pachi! Quiero consultar por mates personalizados o réplicas a escala.',
    items: [
      { name: 'Mate Térmico Personalizado Zodiaco', tag: 'Mate Diseño', img: 'https://i.postimg.cc/JDygmC0G/Mate-Personalizado.jpg' },
      { name: 'Mate Personalizado Modelo Zodiaco', tag: 'Mate Personalizable', img: 'https://i.postimg.cc/RJKD61wc/Mate-Perzonalizado-2.jpg' },
      { name: 'Micro Turismo Vivencias a Escala', tag: 'Modelo Fiel', img: 'https://i.postimg.cc/sX81Y9zm/Micro-personalizado-Vivencias-Turismo.jpg' },
      { name: 'Caja Naipes personalizada', tag: 'Juego Cartas', img: 'https://i.postimg.cc/9Mq7zFRx/20250908-212536.jpg' },
      { name: 'Caja Truco personalizada', tag: 'Juego Cartas', img: 'https://i.postimg.cc/gJ6ZrkXg/20250908-212642.jpg' },
      { name: 'Contador Truco', tag: 'SET Truco', img: 'https://i.postimg.cc/gJ6ZrkXt/20250911-154523.jpg' },
      { name: 'Set truco', tag: 'Juego Cartas', img: 'https://i.postimg.cc/5trzxF0R/20250911-154558.jpg' },
    ]
  },
  {
    id: 'deco-setup-hardware',
    categoryNumber: '03',
    categoryName: 'Hogar & Setup',
    title: 'Deco Hogar, Veladores & Setup',
    badge: 'Diseño Propio',
    badgeColor: 'emerald',
    description: 'Soportes anti-sag para placas de video GPU, veladores litofanía 3D con tus fotos reales, posavasos temáticos y utilidades.',
    whatsappText: 'Hola Pachi! Me interesa encargar accesorios para deco / setup gamer.',
    items: [
      { name: 'Velador Litofanía Paola & Dalma', tag: 'Foto Real 3D', img: 'https://i.postimg.cc/G9xNCKhF/Velador-clienta-1-Paola-1-Dalma.jpg' },
      { name: 'Posavasos Cervecería The Rookie', tag: 'Bar & Local', img: 'https://i.postimg.cc/y6rPkwSn/Posavasos-Cerveceria-The-Rookie.jpg' },
      { name: 'Posavasos Mario Bros Pixel', tag: 'Gamer Retro', img: 'https://i.postimg.cc/34gX2tbn/Posavasos-Mario-Bros.jpg' },
      { name: 'Soporte Graduado con Niveles Monitor', tag: 'Ergonomía', img: 'https://i.postimg.cc/6TXSggKj/Soporte-con-niveles-para-Monitor.jpg' },
      { name: 'Soporte Plancha y Secador de Pelo', tag: 'Organizador Baño', img: 'https://i.postimg.cc/2LGnKVYh/Soporte-Plancha-de-pelo-y-secador.jpg' },
      { name: 'Soporte Tarjeta Gráfica GPU Anti-Sag', tag: 'Hardware PC', img: 'https://i.postimg.cc/QV3PwwDv/Soporte-tarjeta-grafica.jpg' },
      { name: 'Jabonera Botánica Drenante', tag: 'Drenaje Rápido', img: 'https://i.postimg.cc/S20LXBVq/Jabonera.jpg' },
      { name: 'Maceta Geométrica Flotante', tag: 'Deco Minimal', img: 'https://i.postimg.cc/7Jwg9Sp1/Maseta-flotante.jpg' },
      { name: 'Porta Sahumerios Zen', tag: 'Aromaterapia', img: 'https://i.postimg.cc/cthfbrWG/Porta-sahumerios.jpg' },
      { name: 'Lapicero Comercial Agua & Gas', tag: 'Doble Color', img: 'https://i.postimg.cc/2VdQ19B1/Lapicero-personalizado-Agua-Gas.jpg' },
      { name: 'Nombres en Relieve para Lápices 1', tag: 'Personalizado', img: 'https://i.postimg.cc/QK1y9gcP/Nombres-para-lapices.jpg' },
      { name: 'Topes Identificadores para Lápices 2', tag: 'Escolar', img: 'https://i.postimg.cc/dZrxkRGN/Nombre-para-lapices-2.jpg' },
    ]
  },
  {
    id: 'merch-llaveros',
    categoryNumber: '04',
    categoryName: 'Pymes & Merch',
    title: 'Llaveros , Merchandising y Eventos en Serie x Mayor',
    badge: 'Lotes x Mayor',
    badgeColor: 'purple',
    description: 'Llaveros institucionales con packaging sellado para comercios y turismo, argollas sinfín y relieves de alta durabilidad.',
    whatsappText: 'Hola Pachi! Quisiera cotizar una tirada de llaveros o merchandising en serie por mayor.',
    items: [
      { name: 'Llavero  RH Construcciones', tag: 'LLavero Personalizado', img: 'https://i.postimg.cc/0b96Bkb1/Llaveros-RH-Construcciones.jpg' },
      { name: 'Llaveros Cúbicos Ferretería Aoniken', tag: 'Grabado 3D', img: 'https://i.postimg.cc/pyfhChVQ/Llaveros-Ferreteria-Aoniken.jpg' },
      { name: 'Llaveros Giratorios 360° Agua & Gas', tag: 'Mecanismo Móvil', img: 'https://i.postimg.cc/jDszP6zZ/Llaveros-giratorios-Agua-Gas.jpg' },
      { name: 'Llaveros La Pera Loca', tag: 'Bicapa 4 Colores', img: 'https://i.postimg.cc/CzwZQhd4/Llaveros-La-Pera-Loca.jpg' },
      { name: 'Llavero Pistón Biela Móvil Taller Contreras', tag: 'Pieza Articulada', img: 'https://i.postimg.cc/XpxZMRCg/Llaveros-Taller-Contreras.jpg' },
      { name: 'Llaveros Cubiertas J&S', tag: 'Empaque Individual', img: 'https://i.postimg.cc/VdzSVf5V/Llaveros-Cubiertas-J-S.jpg' },
      { name: 'Llaveros Barra con Relieve Corporativo', tag: 'Tirada en Bolsa', img: 'https://i.postimg.cc/5QVH11gg/Llavero1.jpg' },
      { name: 'Empaque y Presentación Mercado del Lago', tag: 'Listo Exhibidor', img: 'https://i.postimg.cc/tRtLVRNw/Empaque-llaveros-Mercado-del-lago.jpg' },
      { name: 'Llaveros 5 Esquinas Mercado del Lago', tag: 'Turismo Bariloche', img: 'https://i.postimg.cc/jj71qRj9/Llaveros-5-Esquinas-Mercado-del-Lago.jpg' },
      { name: 'Llaveros Mercado del Lago V2', tag: 'Serie Mayorista', img: 'https://i.postimg.cc/YSWP2tSZ/Llaveros-Mercado-del-Lago-2.jpg' },
      { name: 'Llaveros Mercado del Lago V3', tag: 'Tirada Doble Cara', img: 'https://i.postimg.cc/TYdBj8k3/Llaveros-Mercado-del-Lago-3.jpg' },
      { name: 'Llavero Claqueta de Cine', tag: 'Relieve Blanco/Negro', img: 'https://i.postimg.cc/NMh0J8LG/llaverocine.jpg' },
      { name: 'Llavero Claqueta cine Dorso', tag: 'Detalles personalizados', img: 'https://i.postimg.cc/d1TyDtkS/Image-20261007-2206481223894489655431820.jpg' },
      { name: 'Llaveros Minecraft Pixel Art', tag: 'Pixel Art', img: 'https://i.postimg.cc/tY91MqYQ/Llaveros-Mine-Craft.jpg' },
      { name: 'Jefe en Pañales & Souvenirs', tag: 'Cumpleaños', img: 'https://i.postimg.cc/zVpLmsgW/Llaveros-Mine-Craft-Jefe-en-Panales.jpg' },
    
    ]
  },
  {
    id: 'mascotas-mini-tu',
    categoryNumber: '05',
    categoryName: 'Personalizado',
    title: 'Mascotas Esculpidas & Mini-Tú Custom',
    badge: '100% Exclusivo',
    badgeColor: 'rose',
    description: 'Modelado 3D a partir de tus fotos reales de perros, gatos y familiares para regalar un recuerdo inolvidable.',
    whatsappText: 'Hola Pachi! Quiero encargar una figura personalizada a partir de una foto (mascota / mini-tú).',
    items: [
      { name: 'Perchero Silueta Correas Mascotas', tag: 'Pared Silueta', img: 'https://i.postimg.cc/fSDxCYGh/Perchero-para-correas-de-mascotas.jpg' },
      { name: 'Escultura Mascota Alejandra', tag: 'Foto a Escultura', img: 'https://i.postimg.cc/N94xWN7c/Diseno-Exclusivo-mascota-(Alejandra).jpg' },
      { name: 'Figura Homenaje Gobernador', tag: 'Busto Conmemorativo', img: 'https://i.postimg.cc/23kG4Dr6/Figura-especial-para-el-gobernador.jpg' },
      { name: 'Figura Familiar de Clienta', tag: 'Recuerdo Familiar', img: 'https://i.postimg.cc/dDs68Yws/Figura-Familia-de-Clienta.jpg' },
      { name: 'Mini-Tú Papá con Mascota', tag: 'Mini-Tú Custom', img: 'https://i.postimg.cc/z3xj7cGw/Figura-Papa-y-mascota-de-cliente.jpg' },
      { name: 'Dueño Vivencias Turismo (Cuerpo Entero)', tag: 'Modelado Integral', img: 'https://i.postimg.cc/Kz4R3p6h/Diseno-exclusivo-Dueno-de-Vivencias.jpg' },
      { name: 'Busto Vivencias Turismo 1', tag: 'Fisonomía Fiel', img: 'https://i.postimg.cc/SQ3gZJfW/Dueno-Vivencias-1.jpg' },
      { name: 'Busto Vivencias Turismo 2', tag: 'Acabado Pro', img: 'https://i.postimg.cc/44qW8mQv/Dueno-Vivencias-2.jpg' },
    ]
  },
  {
    id: 'repuestos-tecnicos',
    categoryNumber: '06',
    categoryName: 'Técnico & Prototipos',
    title: 'Piezas Técnicas & Repuestos a Medida',
    badge: 'Alta Resistencia',
    badgeColor: 'blue',
    description: 'Engranajes, trabas y adaptadores mecánicos impresos para piezas discontinuadas.',
    whatsappText: 'Hola Pachi! Tengo una pieza rota ... .',
    items: [
      { name: 'Réplicas Entrenamiento 9mm Caruso', tag: 'Armería Caruso', img: 'https://i.postimg.cc/34Pqxf0G/Replicas-de-balas-9mm-(Armeria-Caruso).jpg' },
  
    ]
  }
];

export const GalleryShowcase = () => {
  const [expandedId, setExpandedId] = useState(galleryCategories[0].id);
  // Estado para el modal de visualización en alta resolución (para pantallas de PC)
  const [modalItem, setModalItem] = useState(null);

  const toggleCategory = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getBadgeClasses = (color) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/40';
      case 'emerald':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40';
      case 'purple':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/40';
      case 'rose':
        return 'bg-rose-950/70 text-rose-300 border-rose-500/40';
      case 'blue':
        return 'bg-blue-950/70 text-blue-300 border-blue-500/40';
      default:
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <section className="space-y-8" id="galeria-taller">
      {/* Encabezado de la Sección de Galería */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            Galería Fotográfica Real del Taller
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Trabajos Entregados & Modelos Populares
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md font-mono">
          Explora los modelos reales impresos en nuestro taller de Bariloche. Haz clic en cualquier imagen para verla en resolución nítida.
        </p>
      </div>

      {/* Lista de Categorías de la Galería */}
      <div className="space-y-4">
        {galleryCategories.map((cat) => {
          const isExpanded = expandedId === cat.id;
          const badgeStyle = getBadgeClasses(cat.badgeColor);

          return (
            <div
              key={cat.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-[#151724] border-cyan-500/40 shadow-xl shadow-cyan-950/20'
                  : 'bg-[#12131d] border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Barra de título clickeable para colapsar / expandir */}
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className="w-full text-left p-5 md:p-6 flex items-start sm:items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                      {cat.categoryNumber}
                    </span>
                    <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>

                  <span className="text-xs text-slate-400 font-mono hidden md:inline-block">
                    • {cat.items.length} fotos reales
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                  <span className="text-xs font-mono text-cyan-400 hidden sm:inline-block">
                    {isExpanded ? 'Ocultar' : 'Ver fotos'}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isExpanded ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Contenido Desplegable: Descripción + Carrusel de Fotos Reales */}
              {isExpanded && (
                <div className="px-5 pb-6 md:px-6 md:pb-6 space-y-4 border-t border-slate-800/80 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <p className="text-slate-300 max-w-2xl leading-relaxed">
                      {cat.description}
                    </p>
                    <a
                      href={`https://wa.me/5492944905560?text=${encodeURIComponent(cat.whatsappText)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition shrink-0 font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Pedir similar por WhatsApp
                    </a>
                  </div>

                  {/* Carrusel Deslizable Horizontal con dimensiones calibradas para PC y Mobile */}
                  <div className="relative">
                    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                      {cat.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="shrink-0 w-64 md:w-72 bg-[#0d0f17] border border-slate-800 rounded-xl overflow-hidden snap-start hover:border-cyan-500/50 transition duration-200 group flex flex-col"
                        >
                          {/* Contenedor de la Imagen: 
                              - aspect-[4/3] en lugar de cuadrado forzado para respetar fotos apaisadas
                              - image-rendering calibrado y sin estiramiento pixelado
                          */}
                          <div 
                            className="relative aspect-[4/3] w-full overflow-hidden bg-[#07090e] cursor-pointer flex items-center justify-center group/img"
                            onClick={() => setModalItem({ ...item, categoryTitle: cat.title })}
                            title="Clic para ver en tamaño completo"
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              loading="lazy"
                              decoding="async"
                              style={{ imageRendering: '-webkit-optimize-contrast' }}
                              className="w-full h-full object-contain p-1 group-hover/img:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Tag de la pieza */}
                            <div className="absolute top-2 left-2 pointer-events-none">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                                {item.tag}
                              </span>
                            </div>

                            {/* Botón flotante para ampliar en PC */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-950/80 p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* Pie de Foto con Título y Botón Directo */}
                          <div className="p-3.5 flex flex-col justify-between flex-1 gap-2.5 bg-[#0e101a]">
                            <p className="text-xs font-semibold text-slate-200 line-clamp-1 title" title={item.name}>
                              {item.name}
                            </p>
                            
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/5492944905560?text=${encodeURIComponent(`Hola Pachi! Me gustó la pieza "${item.name}" (${cat.title}) de la web. ¿Cuánto costaría hacerla?`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#181a26] hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-700/80 text-[11px] font-medium flex items-center justify-center gap-1.5 transition text-center"
                              >
                                <MessageCircle className="w-3 h-3 text-[#25D366]" />
                                Consultar
                              </a>
                              
                              <button
                                type="button"
                                onClick={() => setModalItem({ ...item, categoryTitle: cat.title })}
                                className="p-1.5 rounded-lg bg-[#181a26] hover:bg-slate-700 text-slate-400 hover:text-cyan-400 border border-slate-700/80 transition"
                                title="Ver foto ampliada"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =========================================================
          MODAL LIGHTBOX: VISUALIZADOR EN ALTA DEFINICIÓN PARA PC
      ========================================================= */}
      {modalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setModalItem(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#0d0f17] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#121420]">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                  {modalItem.categoryTitle} • {modalItem.tag}
                </span>
                <h4 className="text-base font-bold text-white">
                  {modalItem.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Imagen en resolución nativa completa */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07090e]">
              <img
                src={modalItem.img}
                alt={modalItem.name}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Footer con CTA directo */}
            <div className="p-4 border-t border-slate-800 bg-[#121420] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <a
                href={modalItem.img}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Abrir foto original en nueva pestaña
              </a>

              <a
                href={`https://wa.me/5492944905560?text=${encodeURIComponent(`Hola Pachi! Me gustó la foto de "${modalItem.name}" (${modalItem.categoryTitle}) en la web. ¿Cuánto costaría hacerla?`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
              >
                <MessageCircle className="w-4 h-4 text-emerald-950" />
                Consultar presupuesto para esta pieza
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryShowcase;
