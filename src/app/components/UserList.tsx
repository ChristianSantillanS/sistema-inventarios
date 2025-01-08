"use client";

import { Usuario } from "../models/Usuario";
import { useGetUsuariosQuery, useDeleteUsuarioMutation } from "../state/api";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

function UserList() {
  const { data: usuarios, error, isLoading } = useGetUsuariosQuery(undefined);
  const [deleteUsuario] = useDeleteUsuarioMutation();
  const router = useRouter();

  if (isLoading) return (
    <div className="p-8 text-gray-600 dark:text-gray-300">
      Cargando usuarios...
    </div>
  );
  if (error) return (
    <div className="p-8 text-red-500">
      Error al cargar los usuarios
    </div>
  );

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      await deleteUsuario(id);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-90px)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Usuarios
            </h1>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {usuarios?.length || 0} usuarios
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/usuarios/nuevo")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo Usuario
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="grid grid-cols-[1.5fr,2fr,1fr,1fr] gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
            <div>Nombre</div>
            <div>Email</div>
            <div>Rol</div>
            <div>Acciones</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {usuarios?.map((usuario: Usuario) => (
              <div
                key={usuario.id}
                className="grid grid-cols-[1.5fr,2fr,1fr,1fr] gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {usuario.nombre}
                  </h3>
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {usuario.email}
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {usuario.rol}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/usuarios/${usuario.id}/editar`)}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
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

export default UserList;