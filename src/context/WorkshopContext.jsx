import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const WorkshopContext = createContext(null);

export const WorkshopProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [config, setConfig] = useState(null);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLoadingRate, setIsLoadingRate] = useState(true);

  // --------------------------------------------------
  // SESIÓN DE SUPABASE AUTH
  // --------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(session);
      setIsAdmin(!!session);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!mounted) return;

        setSession(newSession);
        setIsAdmin(!!newSession);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // --------------------------------------------------
  // CONFIGURACIÓN PRIVADA
  // --------------------------------------------------

  const loadConfig = async () => {
    if (!session) {
      setConfig(null);
      setIsLoadingRate(false);
      return;
    }

    try {
      setIsLoadingRate(true);

      const { data, error } = await supabase
        .from("taller_config_privada")
        .select(`
          id,
          costo_filamento_kg,
          costo_kwh,
          consumo_watts,
          desgaste_maquina_hora,
          costo_mano_obra_hora,
          margen_multiplicador,
          precio_minimo_venta
        `)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(
          "Error cargando configuración privada:",
          error
        );

        setConfig(null);
        return;
      }

      setConfig(data);
    } catch (error) {
      console.error(
        "Error inesperado cargando configuración:",
        error
      );

      setConfig(null);
    } finally {
      setIsLoadingRate(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadConfig();
    } else {
      setConfig(null);
      setIsLoadingRate(false);
    }
  }, [session]);

  // --------------------------------------------------
  // ACTUALIZAR CONFIGURACIÓN
  // --------------------------------------------------

  const updateSettings = async ({
    newGramRate,
    newCostPerKwh,
    newMachineWatts,
    newMachineWear,
    newLaborRate,
    newMarginMultiplier,
    newMinimumPrice,
  }) => {
    if (!session) {
      return {
        success: false,
        message: "No hay una sesión de administrador activa.",
      };
    }

    if (!config?.id) {
      return {
        success: false,
        message: "No se encontró la configuración del taller.",
      };
    }

    const updates = {};

    if (newGramRate !== undefined) {
      updates.costo_filamento_kg =
        Number(newGramRate) * 1000;
    }

    if (newCostPerKwh !== undefined) {
      updates.costo_kwh = Number(newCostPerKwh);
    }

    if (newMachineWatts !== undefined) {
      updates.consumo_watts = Number(newMachineWatts);
    }

    if (newMachineWear !== undefined) {
      updates.desgaste_maquina_hora =
        Number(newMachineWear);
    }

    if (newLaborRate !== undefined) {
      updates.costo_mano_obra_hora =
        Number(newLaborRate);
    }

    if (newMarginMultiplier !== undefined) {
      updates.margen_multiplicador =
        Number(newMarginMultiplier);
    }

    if (newMinimumPrice !== undefined) {
      updates.precio_minimo_venta =
        Number(newMinimumPrice);
    }

    const { data, error } = await supabase
      .from("taller_config_privada")
      .update(updates)
      .eq("id", config.id)
      .select()
      .single();

    if (error) {
      console.error(
        "Error actualizando configuración:",
        error
      );

      return {
        success: false,
        message: error.message,
      };
    }

    setConfig(data);

    return {
      success: true,
      message: "Configuración guardada correctamente.",
    };
  };

  // --------------------------------------------------
  // CERRAR SESIÓN
  // --------------------------------------------------

  const logoutAdmin = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(
        "Error cerrando sesión:",
        error
      );
    }
  };

  // --------------------------------------------------
  // VALORES COMPATIBLES CON EL RESTO DEL PROYECTO
  // --------------------------------------------------

  const gramRate = config
    ? Number(config.costo_filamento_kg) / 1000
    : 0;

  return (
    <WorkshopContext.Provider
      value={{
        session,

        isAdmin,

        config,

        gramRate,

        corpPricing: {},
        corpDiscounts: {},

        updateSettings,

        logoutAdmin,

        isAdminModalOpen,
        setIsAdminModalOpen,

        isLoadingRate,

        reloadConfig: loadConfig,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);

  if (!context) {
    throw new Error(
      "useWorkshop debe utilizarse dentro de WorkshopProvider"
    );
  }

  return context;
};