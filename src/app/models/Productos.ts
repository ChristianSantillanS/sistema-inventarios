import { Alerta } from "./Alerta";
import { Categoria } from "./Categoria";
import { Proveedor } from "./Proveedor";

export interface Producto {
  id: number;
  nombre: string;
  codigo: string;
  categoriaId: number;
  proveedorId: number;
  precio: number;
  cantidad: number;
  minStock: number;
  createdAt: string;
  updatedAt: string;
  categoria: Categoria;
  proveedor: Proveedor;
  alertas: Alerta[];
}
