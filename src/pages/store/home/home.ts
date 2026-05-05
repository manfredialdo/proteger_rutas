// src/pages/store/home/home.ts 
// Food Store Parcial 1, vista catalogo
// lógica: render, búsqueda, filtros
import type { Product as IProduct } from "../../../types/product";
import { agregarProductoAlCarrito, getCarrito } from "../../../utils/localStorage";
import { PRODUCTS } from "../../../data/data";
const formBusqueda = document.getElementById("form-busqueda") as HTMLFormElement;
const inputBusqueda = document.getElementById("input-busqueda") as HTMLInputElement;


/**
 * MENU CATEGORIAS
 * Crea un elemento de lista (li) y un enlace (a)
 *
 */
// 1. Crea un elemento de lista (li)
// 2. Crea un enlace (a)
 const crearItemCategoria = (id: string, nombre: string): HTMLLIElement => {
    const li = document.createElement("li");    // Crea un elemento de lista (li)
    const a = document.createElement("a");      // Crea un enlace (a)
    
    a.href = "#";                               // Establece el enlace para que no redireccione
    a.textContent = nombre;                     // Establece el texto del enlace
    a.dataset.id = id;                          // Establece el ID del enlace
    
    li.append(a);                               // Agrega el enlace a la lista
    return li;                                  // Devuelve la lista
};

/**
 * Carga o renderiza las categorías en el menú
 * 
 */
const cargarCategorias = (productos: IProduct[]): void => {
    const ul = document.getElementById("lista-categorias") as HTMLUListElement;
    if (!ul) return;
    // 1. Extraer categorías únicas de forma directa
    // Usamos flatMap para aplanar todos los arrays de categorías en uno solo
    const todasLasCategorias = productos.flatMap(p => p.categorias || []);
    // Filtramos para que no haya repetidos comparando el ID
    const unicas = todasLasCategorias.filter((cat, index, self) => 
        index === self.findIndex(c => c.id === cat.id)
    );
    // 2. Crear los elementos usando .map()
    const items = [
        crearItemCategoria("todos", "Todos"),
        ...unicas.map(cat => crearItemCategoria(cat.id.toString(), cat.nombre))
    ];
    // 3. Renderizar de una sola vez
    ul.replaceChildren(...items);
};

/**
 * CREAR TARJETA PRODUCTOS
 * Renderiza las tarjetas de productos en el DOM
 * Crea el elemento HTML de una tarjeta de producto y lo devuelve
 */
const crearTarjeta = (p: IProduct): HTMLElement => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    console.log(`Renderizando tarjeta: ${p.nombre} | Imagen: /${p.imagen}`);

    // Estructura base (HTML estático)
    tarjeta.innerHTML = `
        <img class="tarjeta-img" src="/${p.imagen}" alt="${p.nombre}">
        <p class="tarjeta-categoria"></p>
        <h3 class="tarjeta-titulo"></h3>
        <p class="tarjeta-descripcion"></p>
        <div class="tarjeta-footer">
            <span class="tarjeta-precio"></span>
            <button class="btn-agregar" data-id="${p.id}">
                <span>+</span> Agregar
            </button>
        </div>
    `;


    // Usamos el operador "!" porque sabemos que estos elementos existen en el string de arriba
    tarjeta.querySelector(".tarjeta-categoria")!.textContent = p.categorias?.[0]?.nombre.toUpperCase() || "PRODUCTO";
    tarjeta.querySelector(".tarjeta-titulo")!.textContent = p.nombre;
    tarjeta.querySelector(".tarjeta-descripcion")!.textContent = p.descripcion;
    tarjeta.querySelector(".tarjeta-precio")!.textContent = `$${p.precio}`;

    return tarjeta;
};

/**
 * MOSTRAR MENU
 * Renderiza los productos en el DOM
 * Renderiza todas las tarjetas en el contenedor principal
 */
const mostrarMenu = (datos: IProduct[]): void => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    // 1. Limpia el contenedor
    // 2. Mapea los datos a elementos HTML
    // 3. Los esparce (...) como argumentos individuales para append
    contenedor.replaceChildren(...datos.map(crearTarjeta));
};

/**
 * EVENTOS: DELEGACIÓN DE CLIC (CARRITO Y FILTROS)
 */
document.addEventListener("click", (e: MouseEvent) => {
    const el = e.target as HTMLElement;

    // 1. GESTIÓN DEL CARRITO (AGREGAR PRODUCTO)
    // Detección: Identifica si el clic ocurrió en un botón con la clase .btn-agregar o sus hijos.
    const btnAgregar = el.closest(".btn-agregar") as HTMLButtonElement;
    
    if (btnAgregar) {
        // Identificación: Captura el id del producto desde el atributo data-id del botón.
        const id = Number(btnAgregar.dataset.id);
        
        // Acción: Busca el producto en la base de datos (PRODUCTS)...
        const productoParaAgregar = PRODUCTS.find(p => p.id === id);

        if (productoParaAgregar) {
            // ...lo añade al localStorage...
            agregarProductoAlCarrito(productoParaAgregar);
            const item = getCarrito().find(i => i.id === id);

            if (item) {
                // ...y muestra por consola la actualización (nombre, cantidad y total acumulado).
                console.log(`Producto: ${item.nombre} | Cantidad: ${item.cantidad} | Total: $${item.total}`);
            }
        }
        return; 
    }
    
    // 2. FILTRO DE CATEGORÍAS
    // Detección: Identifica si el clic ocurrió en un enlace (<a>) del menú de categorías.
    const enlaceFiltro = el.closest("a"); 
    
    // Procesamiento: Obtiene el id de la categoría desde el data-id.
    const filtroId = enlaceFiltro?.dataset.id;

    if (enlaceFiltro && filtroId) {
        e.preventDefault();
        
        // Filtrado: Si el ID es "todos", recupera la lista completa. De lo contrario, filtra por categoría.
        const filtrados = filtroId === "todos" 
            ? PRODUCTS 
            : PRODUCTS.filter(p => p.categorias.some(c => c.id.toString() === filtroId));

            
        // Renderización: Actualiza la vista llamando a mostrarMenu() con los productos resultantes.
        mostrarMenu(filtrados);
        console.log(`Filtrando por: ${filtroId}`);
    }
});




// --- LÓGICA DE EL CAMPO DE BÚSQUEDA ---
formBusqueda?.addEventListener("input", (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const busqueda = inputBusqueda.value.toLowerCase().trim();
    
    // Filtrar productos cuyo nombre incluya el texto buscado
    const resultados = PRODUCTS.filter(p => 
        p.nombre.toLowerCase().includes(busqueda)
    );
    console.log(`Buscando: "${busqueda}" | Coincidencias: ${resultados.length}`);

    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    if (resultados.length > 0) {
        mostrarMenu(resultados);
    } else {
        // Si no hay resultados, limpiar y mostrar mensaje
        contenedor.replaceChildren();
        const mensaje = document.createElement("p");
        mensaje.className = "tarjeta-descripcion"; // Usamos las clases de CSS del tp3
        mensaje.textContent = `No se encontraron productos que coincidan con "${busqueda}"`;
        contenedor.append(mensaje);
    }
});
console.table(PRODUCTS);
// Inicialización
cargarCategorias(PRODUCTS);
mostrarMenu(PRODUCTS);