// lógica: render, búsqueda, filtros
import type { Product as IProduct } from "../../../types/product";
import type { Icategoria as ICategory } from "../../../types/categoria";

// 2. Datos (sin el .ts al final)
import { PRODUCTS } from "../../../data/data";

// 3. Tu lógica...
console.log("¿Llegaron los productos?", PRODUCTS);

/**
 * Función para renderizar las categorías en el menú lateral/superior
 */
const cargarCategorias = (productos: IProduct[]): void => {
    const ul = document.getElementById("lista-categorias") as HTMLUListElement;
    if (!ul) return;

    ul.replaceChildren();

    // Como 'categorias' no está exportado en data.ts, las sacamos de los productos
    const categoriasMapa = new Map<number, ICategory>();
    
    productos.forEach(p => {
        if (p.categorias) {
            p.categorias.forEach(cat => {
                categoriasMapa.set(cat.id, cat);
            });
        }
    });

    // Añadimos una opción para mostrar todos
    const liTodos = document.createElement("li");
    liTodos.innerHTML = `<a href="#" data-id="todos">Todos</a>`;
    ul.append(liTodos);

    categoriasMapa.forEach(cat => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = cat.nombre;
        a.dataset.id = cat.id.toString();
        li.append(a);
        ul.append(li);
    });
};

/**
 * Procedimiento mostrarMenu adaptado para no romperse
 */
const mostrarMenu = (datos: IProduct[]): void => {
    const contenedor = document.getElementById("contenedor-productos") as HTMLElement;
    if (!contenedor) return;

    contenedor.replaceChildren();

    datos.forEach((p) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const img = document.createElement("img");
        // USAMOS p.imagen 
        img.src = `/${p.imagen}`; 
        // USAMOS p.nombre porque p.title NO EXISTE en el data.ts 
        img.alt = p.nombre; 
        
        const h3 = document.createElement("h3");
        h3.textContent = p.nombre; // Cambiado de p.title a p.nombre

        const pDesc = document.createElement("p");
        pDesc.textContent = p.descripcion;

        const pPrecio = document.createElement("p");
        pPrecio.innerHTML = `<strong>$${p.precio}</strong>`;

        const btn = document.createElement("button");
        btn.className = "btn-agregar";
        btn.textContent = "Agregar";
        btn.dataset.nombre = p.nombre; // Cambiado de p.title a p.nombre

        tarjeta.append(img, h3, pDesc, pPrecio, btn);
        contenedor.append(tarjeta);
    });
};

// Delegación de Eventos
document.addEventListener("click", (e: MouseEvent) => {
    const el = e.target as HTMLElement;

    if (el.classList.contains("btn-agregar")) {
        alert(`Producto añadido: ${el.dataset.nombre}`);
    }
    
    const filtroId = el.closest("a")?.dataset.id;
    if (filtroId) {
        e.preventDefault();
        
        const filtrados = filtroId === "todos" 
            ? PRODUCTS 
            : PRODUCTS.filter(p => p.categorias.some(c => c.id.toString() === filtroId));
            
        mostrarMenu(filtrados);
    }
});

// Inicialización
// Usamos directamente PRODUCTS que es lo que viene del archivo del profe
cargarCategorias(PRODUCTS);
mostrarMenu(PRODUCTS);