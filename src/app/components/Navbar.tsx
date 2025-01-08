"use client";

import { useState, useEffect } from "react";
import { useLoginMutation } from "../state/api";
import { ChevronDown, X } from "lucide-react";

export default function Navbar({
  onToggleDarkMode,
}: {
  onToggleDarkMode: () => void;
}) {
  const [userLogged, setUserLogged] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError, error }] = useLoginMutation();

  useEffect(() => {
    const user = localStorage.getItem("userLogged");
    setUserLogged(user);
    console.log(user);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      console.log(response);
      localStorage.setItem("userLogged", response.usuario.nombre);
      setUserLogged(response.usuario.nombre);
      setShowLoginModal(false);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogged");
    setUserLogged(null);
    setShowDropdown(false);
  };

  return (
    <nav className="w-full px-4 py-2 bg-white border-b dark:border-gray-700 dark:bg-gray-900 transition-colors duration-200">
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Sistema de inventarios
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          {userLogged ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{userLogged}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2">
                  <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                    {new Date().toLocaleString()}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Iniciar sesión
              </h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent outline-none transition-colors"
                />
              </div>

              {isError && (
                <p className="text-red-500 text-sm">
                  Error:{" "}
                  {"data" in (error as { data: { message: string } })
                    ? (error as { data: { message: string } }).data.message
                    : "Error al iniciar sesión"}
                </p>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t dark:border-gray-700">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? "Iniciando..." : "Iniciar sesión"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
