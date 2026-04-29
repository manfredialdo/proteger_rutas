import type { Product as IProduct } from "../types/product";
import type { IUser } from "../types/IUser";

// Interfaz para el carrito
export interface ICartItem extends IProduct {
    cantidad: number;
}

// --- FUNCIONES DE USUARIOS ---
export const getUsuarios = (): any[] => {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
};

export const saveListaUsuarios = (usuarios: any[]) => {
    localStorage.setItem("users", JSON.stringify(usuarios));
};

// --- FUNCIONES DE SESIÓN ---
export const saveUser = (user: IUser) => {
    localStorage.setItem("userData", JSON.stringify(user));
};

export const getUSer = () => {
    return localStorage.getItem("userData");
};

export const removeUser = () => {
    localStorage.removeItem("userData");
};

// --- FUNCIONES DEL CARRITO ---

export const getCarrito = (): ICartItem[] => {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
};

export const saveCarrito = (carrito: ICartItem[]): void => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

export const agregarProductoAlCarrito = (producto: IProduct): void => {
  const carrito = getCarrito();
  
  // El "Cajero" busca si el producto ya está en la bolsa
  const itemExistente = carrito.find(item => item.id === producto.id);

  if (itemExistente) {
      // --- SI YA ESTÁ: SUMA Y ACTUALIZA ---
      
      itemExistente.cantidad++; // 1. Suma 1 a la cantidad (ej: de 1 a 2)
      
      // 2. Multiplica el precio fijo por la nueva cantidad
      itemExistente.total = itemExistente.precioUnidad * itemExistente.cantidad;
      
      console.log(`Actualizando: ${itemExistente.nombre} x${itemExistente.cantidad}. Total: $${itemExistente.total}`);
  } else {
      // --- SI NO ESTÁ: LO CREA DESDE CERO ---
      const nuevoItem = {
          id: producto.id,
          nombre: producto.nombre,
          precioUnidad: producto.precio,
          cantidad: 1, // Empieza en 1
          total: producto.precio
      };
      carrito.push(nuevoItem as any);
  }

  saveCarrito(carrito); // Guarda el resultado final
};