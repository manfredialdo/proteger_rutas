//  interfaces Product y CartItem
// src/types/product.ts
import type { Icategoria } from "./categoria";

/**
 * Interfaz principal para los productos del catálogo.
 * Basada en la estructura de data.ts
 */
export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categorias: ICategory[]; 
  createdAt: string;
  eliminado: boolean;
}

/**
 * Interfaz para los elementos del carrito.
 * Extiende Product agregando la propiedad de cantidad.
 */
export interface CartItem extends Product {
  quantity: number; 
}