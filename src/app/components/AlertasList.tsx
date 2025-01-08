"use client";

import { useGetAlertasQuery } from "../state/api";
import { Alerta } from "../models/Alerta";
import { Bell } from "lucide-react";

function AlertasList() {
  const { data: alertas, isLoading, error } = useGetAlertasQuery(undefined);

  if (isLoading) return (
    <div className="p-8 text-gray-600 dark:text-gray-300">
      Cargando alertas...
    </div>
  );
  if (error) return (
    <div className="p-8 text-red-500">
      Error al cargar las alertas
    </div>
  );

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resuelto':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'urgente':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-90px)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Alertas
            </h1>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {alertas?.length || 0} alertas
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
            <div>Producto</div>
            <div>Estado</div>
            <div>Fecha</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {alertas?.map((alerta: Alerta) => (
              <div
                key={alerta.id}
                className="grid grid-cols-[2fr,1fr,1fr] gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {alerta.producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Código: {alerta.producto.codigo}
                  </p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(alerta.estado)}`}>
                    {alerta.estado}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(alerta.fecha).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertasList;