// lógica: render, búsqueda, filtros
import { ICategory, IProduct } from "./types/modelos";
import { categorias, menu } from "./data/data"; // Tus arrays de datos

const cargarCategorias = (lista: ICategory[]): void => {
    const ul = document.getElementById("lista-categorias") as HTMLUListElement;
    if (!ul) return;

    ul.replaceChildren();

    lista.forEach(cat => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        
        a.href = "#";
        a.textContent = cat.nombre;
        a.dataset.id = cat.id; // dataset siempre guarda strings

        li.append(a);
        ul.append(li);
    });
};

const mostrarMenu = (datos: IProduct[]): void => {
    const contenedor = document.getElementById("contenedor-productos") as HTMLElement;
    if (!contenedor) return;

    contenedor.replaceChildren();

    datos.forEach((p) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        // Creamos la imagen
        const img = document.createElement("img");
        img.src = p.imagen;
        img.alt = p.alt || p.titulo;
        
        const h3 = document.createElement("h3");
        h3.textContent = p.titulo;

        const pDesc = document.createElement("p");
        pDesc.textContent = p.descripcion;

        const pPrecio = document.createElement("p");
        pPrecio.innerHTML = `<strong>$${p.precio}</strong>`;

        const btn = document.createElement("button");
        btn.className = "btn-agregar";
        btn.textContent = "Agregar";
        btn.dataset.nombre = p.titulo;

        tarjeta.append(img, h3, pDesc, pPrecio, btn);
        contenedor.append(tarjeta);
    });
};

// Eventos con Delegación
document.addEventListener("click", (e: MouseEvent) => {
    const el = e.target as HTMLElement;

    // Lógica para el botón agregar
    if (el.classList.contains("btn-agregar")) {
        alert(`Producto añadido: ${el.dataset.nombre}`);
    }
    
    // Lógica para filtrar categorías
    if (el.dataset.id) {
        e.preventDefault();
        const seleccion = el.dataset.id;
        
        const filtrados = seleccion === "todos" 
            ? menu 
            : menu.filter(p => p.categoria === seleccion);
            
        mostrarMenu(filtrados);
    }
});

// Inicialización
cargarCategorias(categorias);
mostrarMenu(menu);