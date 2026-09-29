import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { supabase } from '../lib/supabase';

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  // 1. Tarifa PLA por gramo
  const [gramRate, setGramRate] = useState(() => {
    return (
      parseFloat(localStorage.getItem('pachi_gram_rate')) || 45.0
    );
  });

  // 2. Precios base por unidad de merchandising corporativo (ARS)
  const [corpPricing, setCorpPricing] = useState(() => {
    const saved = localStorage.getItem('pachi_corp_pricing');

    return saved
      ? JSON.parse(saved)
      : {
          keychain: 1400, // Llaveros
          desk: 3900, // Soportes
          trophy: 7800, // Trofeos
        };
  });

  // 3. Descuentos por volumen (% según cantidad: 50u, 100u, 150u+)
  const [corpDiscounts, setCorpDiscounts] = useState(() => {
    const saved = localStorage.getItem('pachi_corp_discounts');

    return saved
      ? JSON.parse(saved)
      : {
          tier1: 10, // A partir de 50 u. (10%)
          tier2: 15, // A partir de 100 u. (15%)
          tier3: 20, // A partir de 150 u. (20%)
        };
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('pachi_is_admin') === 'true';
  });

  const [isAdminModalOpen, setIsAdminModalOpen] =
    useState(false);

  const [isLoadingRate, setIsLoadingRate] = useState(false);

  // Cargar configuraciones guardadas
  useEffect(() => {
    const fetchConfig = async () => {
      if (!supabase) return;

      try {
        setIsLoadingRate(true);

        const { data, error } = await supabase
          .from('taller_config')
          .select('clave, valor');

        if (data && !error) {
          data.forEach((item) => {
            if (item.clave === 'precio_gramo') {
              setGramRate(parseFloat(item.valor));
            }

            if (item.clave === 'corp_pricing') {
              setCorpPricing(JSON.parse(item.valor));
            }

            if (item.clave === 'corp_discounts') {
              setCorpDiscounts(JSON.parse(item.valor));
            }
          });
        }
      } catch (err) {
        console.warn('Usando configuración local:', err);
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchConfig();
  }, []);

  // Actualizar todo con validación de clave/PIN
  const updateSettings = async ({
    newGramRate,
    newCorpPricing,
    newCorpDiscounts,
    enteredPin,
  }) => {
    // Validación de PIN
    if (enteredPin !== '1984' && enteredPin !== 'pachi') {
      return {
        success: false,
        message: 'PIN incorrecto (el PIN por defecto es 1984)',
      };
    }

    if (newGramRate !== undefined) {
      setGramRate(parseFloat(newGramRate));
      localStorage.setItem('pachi_gram_rate', newGramRate);
    }

    if (newCorpPricing) {
      setCorpPricing(newCorpPricing);

      localStorage.setItem(
        'pachi_corp_pricing',
        JSON.stringify(newCorpPricing)
      );
    }

    if (newCorpDiscounts) {
      setCorpDiscounts(newCorpDiscounts);

      localStorage.setItem(
        'pachi_corp_discounts',
        JSON.stringify(newCorpDiscounts)
      );
    }

    setIsAdmin(true);
    localStorage.setItem('pachi_is_admin', 'true');

    return {
      success: true,
    };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('pachi_is_admin');
  };

  return (
    <WorkshopContext.Provider
      value={{
        gramRate,
        corpPricing,
        corpDiscounts,
        updateSettings,
        isAdmin,
        logoutAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isLoadingRate,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => useContext(WorkshopContext);