import React, { useState } from "react";
import { X, LockKeyhole, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useWorkshop } from "../context/WorkshopContext";

export const AdminModal = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
  } = useWorkshop();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAdminModalOpen) return null;

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    setEmail("");
    setPassword("");
    setIsAdminModalOpen(false);
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    setIsAdminModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-[#11111c] p-6 shadow-2xl">

        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <LockKeyhole size={24} />
            </div>

            <h2 className="text-xl font-bold text-white">
              Acceso administrador
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Ingresá con tu cuenta de administración.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminModal;