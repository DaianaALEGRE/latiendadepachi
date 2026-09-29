import React from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import {
  ShieldCheck,
  LogOut,
  Settings,
} from 'lucide-react';

export const AdminBanner = () => {
  const {
    isAdmin,
    gramRate,
    setIsAdminModalOpen,
    logoutAdmin,
  } = useWorkshop();

  if (!isAdmin) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-950 via-[#162536] to-cyan-950 border-b border-cyan-500/40 px-4 py-2 text-xs flex items-center justify-between text-cyan-200 sticky top-0 z-50">

      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />

        <span className="font-bold">
          Modo Tallerista Juan Activo
        </span>

        <span className="text-slate-400">
          •
        </span>

        <span>
          Tarifa actual:{' '}
          <strong className="text-white font-mono">
            ${gramRate} ARS/g
          </strong>
        </span>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => setIsAdminModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-400/30 transition text-[11px]"
        >
          <Settings className="w-3.5 h-3.5" />

          <span>
            Editar Precio
          </span>
        </button>

        <button
          onClick={logoutAdmin}
          className="flex items-center gap-1 text-slate-400 hover:text-rose-300 transition text-[11px]"
          title="Cerrar modo admin"
        >
          <LogOut className="w-3.5 h-3.5" />

          <span>
            Salir
          </span>
        </button>

      </div>
    </div>
  );
};