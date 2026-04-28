//  interfaces Product y CartItem
import type { Icategoria } from "./categoria";

export interface Product {
  id: number;
  nombre: string;     // Obligatorio para data.ts
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categorias: Icategoria[]; 
  createdAt: string;
  eliminado: boolean;
  title?: string;     // Opcional para tu código
  alt?: string;
}
export interface CartItem extends Product {
  quantity: number; 
}