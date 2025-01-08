import { Producto } from "./Productos";

export interface Categoria {
  id: number;
  nombre: string;
  productos: Producto[]; // Relación con productos
}
