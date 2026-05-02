#  PARCIAL 1 PROGRAMACION 3 Proyecto: Carrito + Protección de Rutas (Educativo) 

## ✍️ Descripción
En el parcial 1 se solicita:
1. Carrito básico con persistencia. Implementar un carrito de compras utilizando localStorage que permita:
   ● Agregar productos desde el catálogo
   ● Visualizar los productos agregados en una vista de carrito
   ● Mostrar nombre, precio y cantidad de cada producto
   ● Calcular y mostrar el total de la compra

2. Búsqueda y filtrado de productos
   Incorporar funcionalidades de interacción sobre el catálogo:
   ● Búsqueda de productos por nombre
   ● Filtrado por categoría (desde el menú lateral o equivalente)

Vale decir, por otro lado q el presente proyecto es una continuacion trabajo practico 4 (typescript, unidad 4) que es una demostración creado con fines educativos para ilustrar un mecanismo básico de protección de rutas en el lado del cliente (frontend) utilizando **Vite** y **TypeScript**. El objetivo por fue mostrar cómo se puede restringir el acceso a ciertas páginas según el rol de un usuario (por ejemplo, `ADMIN` o `CLIENT`).

---
## ✍️ Descripción
En el presente proyecto se implementa como demostración educativa para ilustrar la implementación de un carrito de compras funcional en el lado del cliente (frontend). El objetivo principal es mostrar cómo gestionar el estado de los productos seleccionados y garantizar la persistencia de datos utilizando el localStorage del navegador.


## ⚠️ ¡Importante! Nivel de Seguridad

La protección de rutas implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.

- **Razón**: La lógica de autenticación se basa en datos guardados en `localStorage` en el navegador del usuario.
- **Riesgo**: Cualquier usuario con conocimientos técnicos básicos puede abrir las herramientas de desarrollador del navegador para inspeccionar, modificar o eliminar los datos de `localStorage`, obteniendo así acceso no autorizado a rutas protegidas.

Este enfoque es útil únicamente para fines de aprendizaje y para prototipos de bajo riesgo. La seguridad real debe implementarse en el **backend**.

---

## 🚀 Instalación y Uso

### 0. Clonamos el proyecto 

```bash
git clone https://github.com/manfredialdo/FoodStoreParcial1.git
```

### 1. Navega hacia la carpeta principal del frontend donde reside el proyecto Vite

```bash
cd FoodStoreParcial1
```


### 2. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install pnpm
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

3. **Renderizado Dinámico**: La vista de **"Mis Pedidos"** mapea el contenido del storage para generar las tarjetas mediante la manipulación segura del DOM (`createElement`)

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
│   │   └── data.ts              # parcial1: Fuente de datos: PRODUCTS y getCategories()
│   ├── pages/
│   │   ├── admin/               # tp4: Vistas y lógica exclusivas para administradores
│   │   ├── auth/                # tp4: Gestión de autenticación (Login, Registro)
│   │   ├── client/              # tp4: Vistas privadas para clientes registrados
│   │   └── store/               # parcial1: Módulos públicos de la tienda
│   │       ├── home/
│   │       │   ├── home.html    # tp4: Maquetación del catálogo de productos
│   │       │   └── home.ts      # tp4: Lógica: renderizado, búsqueda y filtros
│   │       └── cart/
│   │           ├── cart.html    # parcial1: Vista del carrito de compras
│   │           └── cart.ts      # parcial1: Lógica: gestión de cantidades, totales y pedidos
│   ├── types/                   # parcial1: Definición de interfaces y tipos globales
│   │   ├── product.ts           # parcial1: Interfaces Product y CartItem
│   │   ├── categoria.ts         # parcial1: Interface ICategoria
│   │   └── user.ts              # tp4: Interfaces IUser y Rol
│   └── utils/                   # Funciones auxiliares y lógica reutilizable
│       ├── auth.ts              # tp4: Verificación de rol, sesión y permisos
│       ├── localStorage.ts      # parcial1: Persistencia de datos (Carrito, Token, Usuario)
│       └── navigate.ts          # Centralización de rutas y redirecciones
├── package.json                 # Scripts y dependencias del proyecto
└── README.md                    # Documentación principal```
