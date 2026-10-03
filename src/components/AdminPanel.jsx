import React, { useEffect, useState } from "react";
import {
  Settings,
  Save,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useWorkshop } from "../context/WorkshopContext";

export const AdminPanel = () => {
  const {
    isAdmin,
    config,
    updateSettings,
    logoutAdmin,
  } = useWorkshop();

  const [form, setForm] = useState({
    gramRate: "",
    costPerKwh: "",
    machineWatts: "",
    machineWear: "",
    laborRate: "",
    marginMultiplier: "",
    minimumPrice: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!config) return;

    setForm({
      gramRate: Number(config.costo_filamento_kg) / 1000,
      costPerKwh: config.costo_kwh,
      machineWatts: config.consumo_watts,
      machineWear: config.desgaste_maquina_hora,
      laborRate: config.costo_mano_obra_hora,
      marginMultiplier: config.margen_multiplicador,
      minimumPrice: config.precio_minimo_venta,
    });
  }, [config]);

  if (!isAdmin) {
    return null;
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage(null);

    const result = await updateSettings({
      newGramRate: form.gramRate,
      newCostPerKwh: form.costPerKwh,
      newMachineWatts: form.machineWatts,
      newMachineWear: form.machineWear,
      newLaborRate: form.laborRate,
      newMarginMultiplier: form.marginMultiplier,
      newMinimumPrice: form.minimumPrice,
    });

    setSaving(false);

    if (result.success) {
      setMessage({
        type: "success",
        text: "Configuración guardada correctamente.",
      });
    } else {
      setMessage({
        type: "error",
        text: result.message || "No se pudo guardar.",
      });
    }
  };

  return (
    <section className="border-b border-cyan-400/10 bg-[#090912] px-4 py-8">
      <div className="mx-auto max-w-5xl">

        {/* CABECERA */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-cyan-400/20 bg-[#11111c] p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Settings size={24} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Administración
              </p>

              <h2 className="text-xl font-bold text-white">
                Configuración del cotizador
              </h2>

              <p className="text-sm text-gray-400">
                Estos valores son internos y afectan el cálculo de precios.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logoutAdmin}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
          >
            <LogOut size={17} />
            Cerrar sesión
          </button>

        </div>

        {/* FORMULARIO */}

        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/10 bg-[#11111c] p-5 sm:p-6"
        >

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <AdminField
              label="Filamento"
              description="Costo del PLA por gramo"
              value={form.gramRate}
              onChange={(value) =>
                handleChange("gramRate", value)
              }
              suffix="ARS / g"
            />

            <AdminField
              label="Electricidad"
              description="Costo de la energía"
              value={form.costPerKwh}
              onChange={(value) =>
                handleChange("costPerKwh", value)
              }
              suffix="ARS / kWh"
            />

            <AdminField
              label="Consumo"
              description="Consumo eléctrico de la impresora"
              value={form.machineWatts}
              onChange={(value) =>
                handleChange("machineWatts", value)
              }
              suffix="W"
            />

            <AdminField
              label="Desgaste"
              description="Costo interno por hora de máquina"
              value={form.machineWear}
              onChange={(value) =>
                handleChange("machineWear", value)
              }
              suffix="ARS / h"
            />

            <AdminField
              label="Mano de obra"
              description="Costo interno por hora"
              value={form.laborRate}
              onChange={(value) =>
                handleChange("laborRate", value)
              }
              suffix="ARS / h"
            />

            <AdminField
              label="Margen"
              description="Multiplicador aplicado al costo"
              value={form.marginMultiplier}
              onChange={(value) =>
                handleChange("marginMultiplier", value)
              }
              suffix="×"
              step="0.1"
            />

            <AdminField
              label="Precio mínimo"
              description="Piso mínimo de venta"
              value={form.minimumPrice}
              onChange={(value) =>
                handleChange("minimumPrice", value)
              }
              suffix="ARS"
            />

          </div>

          {/* MENSAJE */}

          {message && (
            <div
              className={`mt-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                message.type === "success"
                  ? "border-green-400/20 bg-green-400/10 text-green-300"
                  : "border-red-400/20 bg-red-400/10 text-red-300"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}

              {message.text}
            </div>
          )}

          {/* GUARDAR */}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar configuración
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};

const AdminField = ({
  label,
  description,
  value,
  onChange,
  suffix,
  step = "1",
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white">
        {label}
      </label>

      <p className="mb-2 text-xs text-gray-500">
        {description}
      </p>

      <div className="relative">
        <input
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pr-20 text-white outline-none transition focus:border-cyan-400/50"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          {suffix}
        </span>
      </div>
    </div>
  );
};

export default AdminPanel;