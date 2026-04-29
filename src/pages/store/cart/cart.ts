// lógica: render, cantidades, total
import { getCarrito, saveCarrito } from "../../../utils/localStorage";

const contenedor = document.getElementById("contenedor-carrito");
const totalTxt = document.getElementById("total-final");
const subtotalTxt = document.getElementById("subtotal");

const renderCarrito = () => {
    const carrito = getCarrito();
    
    if (!contenedor || !totalTxt || !subtotalTxt) return;
    contenedor.replaceChildren();

    if (carrito.length === 0) {
        const msg = document.createElement("p");
        msg.className = "tarjeta-descripcion";
        msg.textContent = "Tu carrito está vacío.";
        contenedor.append(msg);
        totalTxt.textContent = "$0";
        subtotalTxt.textContent = "$0";
        return;
    }

    let acumulado = 0;

    carrito.forEach(item => {
        const precio = item.precioUnidad || 0;
        const subtotalItem = precio * item.cantidad;
        acumulado += subtotalItem;
        
        const card = document.createElement("article");
        card.className = "tarjeta"; 

        // Título y Precio en la parte superior
        const h3 = document.createElement("h3");
        h3.className = "tarjeta-titulo";
        h3.textContent = item.nombre;

        const info = document.createElement("p");
        info.className = "tarjeta-descripcion";
        info.textContent = `Unitario: $${precio} | Subtotal: $${subtotalItem}`;

        // Contenedor de controles (usamos tarjeta-footer porque ya tiene flex)
        const footerControles = document.createElement("div");
        footerControles.className = "tarjeta-footer";

        const btnRestar = document.createElement("button");
        btnRestar.className = "btn-agregar";
        btnRestar.textContent = "-";
        btnRestar.dataset.id = item.id.toString();
        btnRestar.dataset.op = "restar";

        const spanCant = document.createElement("span");
        spanCant.textContent = item.cantidad.toString();
        spanCant.style.fontWeight = "bold";

        const btnSumar = document.createElement("button");
        btnSumar.className = "btn-agregar";
        btnSumar.textContent = "+";
        btnSumar.dataset.id = item.id.toString();
        btnSumar.dataset.op = "sumar";

        footerControles.append(btnRestar, spanCant, btnSumar);

        // Botón eliminar (en un contenedor separado para que no se pegue)
        const footerAcciones = document.createElement("div");
        footerAcciones.className = "tarjeta-footer";
        footerAcciones.style.marginTop = "10px";

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn-agregar";
        btnEliminar.textContent = "Quitar del pedido";
        btnEliminar.dataset.id = item.id.toString();
        btnEliminar.style.background = "var(--color-primario)";
        btnEliminar.style.width = "100%"; // Para que ocupe todo el ancho abajo
        btnEliminar.style.justifyContent = "center";

        footerAcciones.append(btnEliminar);

        card.append(h3, info, footerControles, footerAcciones);
        contenedor.append(card);
    });

    totalTxt.textContent = `$${acumulado}`;
    subtotalTxt.textContent = `$${acumulado}`;
};

document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    
    if (target.id === "btn-vaciar") {
        saveCarrito([]);
        renderCarrito();
        return;
    }

    const btn = target.closest("button");
    if (!btn || !btn.dataset.id) return;

    const id = Number(btn.dataset.id);
    let carrito = getCarrito();

    if (btn.dataset.op) {
        const op = btn.dataset.op;
        carrito = carrito.map(item => {
            if (item.id === id) {
                if (op === "sumar") item.cantidad++;
                if (op === "restar" && item.cantidad > 1) item.cantidad--;
                item.total = (item.precioUnidad || 0) * item.cantidad;
            }
            return item;
        });
    } else if (btn.textContent?.includes("Quitar")) {
        carrito = carrito.filter(item => item.id !== id);
    }

    saveCarrito(carrito);
    renderCarrito();
});

renderCarrito();