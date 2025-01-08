"use client";

import { useGetDashboardMetricsQuery } from "../state/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Package, Tag, ShoppingCart } from "lucide-react";

const COLORS = ["#3b82f6", "#e11d48", "#22c55e", "#eab308"];

function Dashboard() {
  const { data, error, isLoading } = useGetDashboardMetricsQuery(undefined);

  if (isLoading)
    return (
      <div className="p-8 text-gray-600 dark:text-gray-300">
        Cargando métricas...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-red-500">
        Error al cargar métricas del Dashboard
      </div>
    );

  // Datos para el gráfico circular de usuarios
  const usuariosData = [
    { name: "Activos", value: data?.totalUsuarios || 0 },
    { name: "Inactivos", value: Math.floor((data?.totalUsuarios || 0) * 0.2) }, // Simulamos usuarios inactivos
  ];

  // Datos para el gráfico circular de alertas
  const alertasData = [
    { name: "Pendientes", value: data?.totalAlertasPendientes || 0 },
    {
      name: "Resueltas",
      value: Math.floor((data?.totalAlertasPendientes || 0) * 1.5),
    }, // Simulamos alertas resueltas
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-90px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sistema de Inventario
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">Total Productos</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {data?.totalProductos || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm">Total Categorías</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {data?.totalCategorias || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">Total Proveedores</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {data?.totalProveedores || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                <span className="text-sm">Estado de Usuarios</span>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usuariosData}
                      innerRadius={25}
                      outerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {usuariosData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                Total: {data?.totalUsuarios || 0}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                <span className="text-sm">Estado de Alertas</span>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={alertasData}
                      innerRadius={25}
                      outerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {alertasData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                Pendientes: {data?.totalAlertasPendientes || 0}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data?.graficaProductosPorCategoria && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Productos por Categoría
                </h2>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.graficaProductosPorCategoria}>
                    <XAxis
                      dataKey="categoria"
                      stroke="#94a3b8"
                      tick={{ fill: "#94a3b8" }}
                    />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cantidad"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Cantidad"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {data?.graficaAlertasPorTipo && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Alertas por Tipo
                </h2>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.graficaAlertasPorTipo}>
                    <XAxis
                      dataKey="tipo"
                      stroke="#94a3b8"
                      tick={{ fill: "#94a3b8" }}
                    />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cantidad"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Cantidad"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
