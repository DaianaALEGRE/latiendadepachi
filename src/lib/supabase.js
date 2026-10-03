import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export async function fetchPublicQuote({
  grams,
  printHours,
  laborHours,
  finishMultiplier,
  quantity,
}) {
  const { data, error } = await supabase.rpc(
    "calcular_cotizacion_estimada",
    {
      p_gramos: grams,
      p_horas_impresion: printHours,
      p_horas_mano_obra: laborHours,
      p_multiplicador_acabado: finishMultiplier,
      p_cantidad: quantity,
    }
  );

  if (error) {
    console.error("Error al calcular cotización:", error);
    throw error;
  }

  return {
    estimado_min: data.precio_estimado_min,
    estimado_max: data.precio_estimado_max,
  };
}