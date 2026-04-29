# Proyecto: Protección de Rutas (Educativo)

## ✍️ Descripción

Este es un proyecto de demostración creado con fines educativos para ilustrar un mecanismo básico de protección de rutas en el lado del cliente (frontend) utilizando **Vite** y **TypeScript**.

El objetivo es mostrar cómo se puede restringir el acceso a ciertas páginas según el rol de un usuario (por ejemplo, `ADMIN` o `CLIENT`).

---

## ⚠️ ¡Importante! Nivel de Seguridad

La protección de rutas implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.

- **Razón**: La lógica de autenticación se basa en datos guardados en `localStorage` en el navegador del usuario.
- **Riesgo**: Cualquier usuario con conocimientos técnicos básicos puede abrir las herramientas de desarrollador del navegador para inspeccionar, modificar o eliminar los datos de `localStorage`, obteniendo así acceso no autorizado a rutas protegidas.

Este enfoque es útil únicamente para fines de aprendizaje y para prototipos de bajo riesgo. La seguridad real debe implementarse en el **backend**.

---

## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## 🛒 ¿Cómo Funciona la Gestión del Carrito?

El flujo de compra es reactivo y utiliza la API de `localStorage` para garantizar la persistencia de datos de forma eficiente:

1. **Captura**: Al disparar el evento de clic en "Agregar", el sistema extrae el `ID` del producto mediante el atributo `data-id` del elemento HTML.
2. **Persistencia**:
   * Se recupera el estado actual mediante la función `getCarrito()`.
   * **Lógica de Acumulación**: Si el `ID` ya existe en el storage, se incrementa su propiedad `cantidad`. De lo contrario, se inicializa como un nuevo ítem.
   * El array resultante se serializa a JSON y se almacena nuevamente en `localStorage`.
3. **Renderizado Dinámico**: La vista de **"Mis Pedidos"** mapea el contenido del storage para generar las tarjetas mediante la manipulación segura del DOM (`createElement`), evitando el uso de `innerHTML`.
4. **Cálculo de Importes**: Se procesa cada subtotal (`precioUnidad * cantidad`) y se utiliza un acumulador para proyectar el **Total Final** en tiempo real.
5. **Sincronización**: Cualquier interacción con los controles de cantidad o eliminación de ítems actualiza el storage y fuerza un re-renderizado inmediato de la interfaz.

---

### 📋 Historias de Usuario (Pruebas de Validación)

* **HU-P1-03 (Agregar)**: El producto se persiste en el storage y gestiona correctamente el incremento de cantidades ante duplicados.
* **HU-P1-04 (Visualizar)**: Los datos de nombre, precio y cantidad se listan correctamente en la página de pedidos.
* **HU-P1-05 (Total)**: El total general de la compra se recalcula automáticamente ante cualquier modificación del carrito.
---

## 📁 Estructura del Proyecto

```
/
/
├── src/
│   ├── data/
│   │   └── data.ts              # Fuente de datos: PRODUCTS y getCategories()
│   ├── pages/
│   │   ├── admin/               # Vistas y lógica exclusivas para administradores
│   │   ├── auth/                # Gestión de autenticación (Login, Registro)
│   │   ├── client/              # Vistas privadas para clientes registrados
│   │   └── store/               # Módulos públicos de la tienda
│   │       ├── home/
│   │       │   ├── home.html    # Maquetación del catálogo de productos
│   │       │   └── home.ts      # Lógica: renderizado, búsqueda y filtros
│   │       └── cart/
│   │           ├── cart.html    # Vista del carrito de compras
│   │           └── cart.ts      # Lógica: gestión de cantidades, totales y pedidos
│   ├── types/                   # Definición de interfaces y tipos globales
│   │   ├── product.ts           # Interfaces Product y CartItem
│   │   ├── categoria.ts         # Interface ICategoria
│   │   └── user.ts              # Interfaces IUser y Rol
│   └── utils/                   # Funciones auxiliares y lógica reutilizable
│       ├── auth.ts              # Verificación de rol, sesión y permisos
│       ├── localStorage.ts      # Persistencia de datos (Carrito, Token, Usuario)
│       └── navigate.ts          # Centralización de rutas y redirecciones
├── package.json                 # Scripts y dependencias del proyecto
└── README.md                    # Documentación principal```
