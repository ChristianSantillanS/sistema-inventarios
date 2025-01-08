import { Producto } from "./Productos";

export interface Alerta {
  id: number;
  productoId: number;
  fecha: string;
  estado: string;
  producto: Producto;
}
