
// ============================================================
// CONFIGURACIÓN DE PRODUCTOS Y PRESETS PÚBLICOS
// La Tienda de Pachi - Taller de Impresión 3D
// ============================================================

export const business = {
  name: "La Tienda de Pachi",
  whatsapp: "5492944905560",
  instagram: "la.tienda.de_pachi",
  location: "Neuquén Capital, Argentina",
};

export const pieceTypes = [
  {
    id: "figura",
    name: "Figuras & Pop",
    subtitle: "Personajes, Anime & Coleccionables",
    color: "text-[#00F0FF]",
    iconName: "Gamepad2",
    sizes: {
      chico: {
        name: "Chico (8-10cm)",
        grams: 35,
        printHours: 3,
        printMinutes: 30,
        laborHours: 0.5,
      },
      mediano: {
        name: "Mediano (12-15cm)",
        grams: 85,
        printHours: 7,
        printMinutes: 0,
        laborHours: 1.0,
      },
      grande: {
        name: "Grande (18-22cm)",
        grams: 180,
        printHours: 14,
        printMinutes: 0,
        laborHours: 1.5,
      },
      custom: {
        name: "A medida",
        grams: 0,
        printHours: 0,
        printMinutes: 0,
        laborHours: 0,
      },
    },
  },

  {
    id: "torta",
    name: "Kits de Torta",
    subtitle: "Toppers temáticos & nombres",
    color: "text-pink-400",
    iconName: "Cake",
    sizes: {
      chico: {
        name: "Chico (8-10cm)",
        grams: 30,
        printHours: 2,
        printMinutes: 30,
        laborHours: 0.5,
      },
      mediano: {
        name: "Mediano (12-15cm)",
        grams: 65,
        printHours: 5,
        printMinutes: 0,
        laborHours: 0.8,
      },
      grande: {
        name: "Grande (18-22cm)",
        grams: 130,
        printHours: 10,
        printMinutes: 0,
        laborHours: 1.2,
      },
      custom: {
        name: "A medida",
        grams: 0,
        printHours: 0,
        printMinutes: 0,
        laborHours: 0,
      },
    },
  },

  {
    id: "mate",
    name: "Mates & Vasos",
    subtitle: "Polímero térmico lavable",
    color: "text-amber-400",
    iconName: "Coffee",
    sizes: {
      chico: {
        name: "Estándar",
        grams: 90,
        printHours: 8,
        printMinutes: 0,
        laborHours: 0.8,
      },
      mediano: {
        name: "Térmico Pro",
        grams: 120,
        printHours: 10,
        printMinutes: 0,
        laborHours: 1.0,
      },
      grande: {
        name: "Maxi",
        grams: 160,
        printHours: 13,
        printMinutes: 0,
        laborHours: 1.2,
      },
      custom: {
        name: "A medida",
        grams: 0,
        printHours: 0,
        printMinutes: 0,
        laborHours: 0,
      },
    },
  },

  {
    id: "merch",
    name: "Llaveros x Lote",
    subtitle: "Marcas, logos y souvenirs",
    color: "text-[#25D366]",
    iconName: "Tag",
    sizes: {
      chico: {
        name: "Pack 10u",
        grams: 80,
        printHours: 4,
        printMinutes: 0,
        laborHours: 0.5,
      },
      mediano: {
        name: "Pack 25u",
        grams: 190,
        printHours: 9,
        printMinutes: 0,
        laborHours: 1.0,
      },
      grande: {
        name: "Pack 50u",
        grams: 380,
        printHours: 17,
        printMinutes: 0,
        laborHours: 1.8,
      },
      custom: {
        name: "A medida",
        grams: 0,
        printHours: 0,
        printMinutes: 0,
        laborHours: 0,
      },
    },
  },

  {
    id: "deco",
    name: "Deco & Veladores",
    subtitle: "Lámparas, macetas y setup",
    color: "text-purple-400",
    iconName: "Lamp",
    sizes: {
      chico: {
        name: "Chico (10cm)",
        grams: 70,
        printHours: 6,
        printMinutes: 0,
        laborHours: 0.5,
      },
      mediano: {
        name: "Mediano (15cm)",
        grams: 140,
        printHours: 11,
        printMinutes: 0,
        laborHours: 1.0,
      },
      grande: {
        name: "Grande (20cm+)",
        grams: 260,
        printHours: 19,
        printMinutes: 0,
        laborHours: 1.5,
      },
      custom: {
        name: "A medida",
        grams: 0,
        printHours: 0,
        printMinutes: 0,
        laborHours: 0,
      },
    },
  },

  {
    id: "tecnico",
    name: "Hardware & Repuestos",
    subtitle: "GPU support, engranajes y piezas",
    color: "text-blue-400",
    iconName: "Cpu",
    sizes: {
      chico: {
        name: "Pieza chica",
        grams: 40,
        printHours: 3,
        printMinutes: 0,
        laborHours: 0.5,
      },
      mediano: {
        name: "Pieza media",
        grams: 95,
        printHours: 7,
        printMinutes: 30,
        laborHours: 1.0,
      },
      grande: {
        name: "Pieza grande",
        grams: 210,
        printHours: 15,
        printMinutes: 0,
        laborHours: 1.5,
      },
      custom: {
        name: "A medida",
        grams: 0,
        printHours: 0,
        printMinutes: 0,
        laborHours: 0,
      },
    },
  },
];

export const sizes = [
  {
    id: "chico",
    name: "Chico",
    measurement: "8-10 cm",
    subtitle: "Souvenir / Detalle",
  },
  {
    id: "mediano",
    name: "Mediano",
    measurement: "12-15 cm",
    subtitle: "Más pedido",
  },
  {
    id: "grande",
    name: "Grande",
    measurement: "18-22 cm",
    subtitle: "Pieza destacada",
  },
  {
    id: "custom",
    name: "A Medida",
    measurement: "Custom",
    subtitle: "Adjuntar STL",
  },
];

export const finishes = [
  {
    id: "1color",
    name: "Color Único",
    description: "Impresión limpia en filamento monocromo",
    laborMultiplier: 1.0,
  },
  {
    id: "multicolor",
    name: "Multicolor ",
    description: "Cambio de filamento por capas /color",
    laborMultiplier: 1.4,
  },
];

