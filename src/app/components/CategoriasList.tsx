"use client";

import {
  useGetCategoriasQuery,
  useDeleteCategoriaMutation,
} from "../state/api";
import { Categoria } from "../models/Categoria";
import { Plus } from "lucide-react";

export default function CategoriasList() {
  const {
    data: categorias,
    error,
    isLoading,
  } = useGetCategoriasQuery(undefined);
  const [deleteCategoria] = useDeleteCategoriaMutation();

  if (isLoading)
    return (
      <div className="p-8 text-gray-600 dark:text-gray-300">
        Cargando categorías...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-red-500">Error al cargar las categorías.</div>
    );

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
      await deleteCategoria(id);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-90px)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Categorías
            </h1>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {categorias?.length || 0} categorías
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "/categorias/nuevo")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nueva Categoría
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="grid grid-cols-[2fr,1fr] gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
            <div>Nombre</div>
            <div>Acciones</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categorias?.map((categoria: Categoria) => (
              <div
                key={categoria.id}
                className="grid grid-cols-[2fr,1fr] gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {categoria.nombre}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      (window.location.href = `/categorias/${categoria.id}/editar`)
                    }
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id)}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
