import { Producto } from "./Productos";

export interface Proveedor {
  id: number;
  nombre: string;
  contacto?: string;
  productos: Producto[];
}
