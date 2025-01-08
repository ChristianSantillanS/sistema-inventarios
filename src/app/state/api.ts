import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: [
    "Productos",
    "Categorias",
    "Proveedores",
    "Usuarios",
    "Alertas",
    "DashboardMetrics",
    "Auth",
  ],
  endpoints: (builder) => ({
    // Productos
    getProductos: builder.query({
      query: () => "/productos",
      providesTags: ["Productos"],
    }),
    getProductoById: builder.query({
      query: (id) => `/productos/${id}`,
      providesTags: ["Productos"],
    }),
    createProducto: builder.mutation({
      query: (nuevoProducto) => ({
        url: "/productos",
        method: "POST",
        body: nuevoProducto,
      }),
      invalidatesTags: ["Productos"],
    }),
    updateProducto: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/productos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Productos"],
    }),
    deleteProducto: builder.mutation({
      query: (id) => ({
        url: `/productos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Productos"],
    }),

    // Categorías
    getCategorias: builder.query({
      query: () => "/categorias",
      providesTags: ["Categorias"],
    }),
    getCategoriaById: builder.query({
      query: (id) => `/categorias/${id}`,
      providesTags: ["Categorias"],
    }),
    createCategoria: builder.mutation({
      query: (nuevaCategoria) => ({
        url: "/categorias",
        method: "POST",
        body: nuevaCategoria,
      }),
      invalidatesTags: ["Categorias"],
    }),
    updateCategoria: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categorias/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categorias"],
    }),
    deleteCategoria: builder.mutation({
      query: (id) => ({
        url: `/categorias/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categorias"],
    }),

    // Proveedores
    getProveedores: builder.query({
      query: () => "/proveedores",
      providesTags: ["Proveedores"],
    }),
    getProveedorById: builder.query({
      query: (id) => `/proveedores/${id}`,
      providesTags: ["Proveedores"],
    }),
    createProveedor: builder.mutation({
      query: (nuevoProveedor) => ({
        url: "/proveedores",
        method: "POST",
        body: nuevoProveedor,
      }),
      invalidatesTags: ["Proveedores"],
    }),
    updateProveedor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/proveedores/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Proveedores"],
    }),
    deleteProveedor: builder.mutation({
      query: (id) => ({
        url: `/proveedores/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Proveedores"],
    }),

    // Usuarios
    getUsuarios: builder.query({
      query: () => "/usuarios",
      providesTags: ["Usuarios"],
    }),
    getUsuarioById: builder.query({
      query: (id) => `/usuarios/${id}`,
      providesTags: ["Usuarios"],
    }),
    createUsuario: builder.mutation({
      query: (nuevoUsuario) => ({
        url: "/usuarios",
        method: "POST",
        body: nuevoUsuario,
      }),
      invalidatesTags: ["Usuarios"],
    }),
    updateUsuario: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/usuarios/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Usuarios"],
    }),
    deleteUsuario: builder.mutation({
      query: (id) => ({
        url: `/usuarios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Usuarios"],
    }),

    // Alertas
    getAlertas: builder.query({
      query: () => "/alertas",
      providesTags: ["Alertas"],
    }),
    getAlertaById: builder.query({
      query: (id) => `/alertas/${id}`,
      providesTags: ["Alertas"],
    }),
    createAlerta: builder.mutation({
      query: (nuevaAlerta) => ({
        url: "/alertas",
        method: "POST",
        body: nuevaAlerta,
      }),
      invalidatesTags: ["Alertas"],
    }),
    updateAlerta: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/alertas/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Alertas"],
    }),
    deleteAlerta: builder.mutation({
      query: (id) => ({
        url: `/alertas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Alertas"],
    }),
    getDashboardMetrics: builder.query({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  // Login
  useLoginMutation,
  //Dashboard
  useGetDashboardMetricsQuery,
  // Productos
  useGetProductosQuery,
  useGetProductoByIdQuery,
  useCreateProductoMutation,
  useUpdateProductoMutation,
  useDeleteProductoMutation,
  // Categorías
  useGetCategoriasQuery,
  useGetCategoriaByIdQuery,
  useCreateCategoriaMutation,
  useUpdateCategoriaMutation,
  useDeleteCategoriaMutation,
  // Proveedores
  useGetProveedoresQuery,
  useGetProveedorByIdQuery,
  useCreateProveedorMutation,
  useUpdateProveedorMutation,
  useDeleteProveedorMutation,
  // Usuarios
  useGetUsuariosQuery,
  useGetUsuarioByIdQuery,
  useCreateUsuarioMutation,
  useUpdateUsuarioMutation,
  useDeleteUsuarioMutation,
  // Alertas
  useGetAlertasQuery,
  useGetAlertaByIdQuery,
  useCreateAlertaMutation,
  useUpdateAlertaMutation,
  useDeleteAlertaMutation,
} = api;
