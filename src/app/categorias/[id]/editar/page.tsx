"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useUpdateCategoriaMutation,
  useGetCategoriaByIdQuery,
} from "../../../state/api";
interface Params {
  id: string;
}
export default function EditarCategoriaPage() {
  const params = useParams() as unknown as Params;
  const { id } = params;
  const { data: categoria } = useGetCategoriaByIdQuery(Number(id));
  const [updateCategoria] = useUpdateCategoriaMutation();

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
    }
  }, [categoria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCategoria({ id: Number(id), nombre });
    window.location.href = "/categorias";
  };

  return (
    <div className="min-h-[calc(100vh-90px)] bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Editar Categoría
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Modifica el nombre de la categoría
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="Nombre de la categoría"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
