# Mi Tienda — E-commerce con React

Proyecto final del curso de React JS: una tienda online con catálogo de productos,
carrito de compras, autenticación de usuarios y panel de administración con CRUD,
todo conectado a Firebase.

🌐 **Sitio publicado:** https://mi-tienda-cursoreact.netlify.app
📦 **Repositorio de GitHub:** https://github.com/Charly1916/mi-tienda

## Instalación y ejecución local

```bash
git clone https://github.com/Charly1916/mi-tienda.git
cd mi-tienda
npm install
npm run dev
```

Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`). El
proyecto ya viene conectado a un proyecto real de Firebase (Firestore +
Authentication), así que funciona sin configuración adicional.

## Funcionalidades

- **Catálogo de productos** cargado desde Firebase Firestore, con búsqueda en tiempo
  real, filtro por categoría y paginación.
- **Detalle de producto** con selector de cantidad y alta al carrito.
- **Carrito de compras** (Context API + `localStorage`): agregar, eliminar y vaciar
  productos.
- **Autenticación** (Firebase Authentication): registro, login y cierre de sesión.
- **Panel de administración** (`/admin`, ruta protegida): alta, edición y eliminación
  de productos con validaciones, modal de confirmación de borrado y spinners de carga.
- **Diseño responsivo** con React-Bootstrap (grilla mobile-first) y estilos propios
  con CSS Modules y styled-components.
- **SEO básico** con React Helmet (título y meta description por página).
- Íconos con React Icons.


## Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables (Header, Footer, Layout, Item, etc.)
├── context/          # CarritoContext y AuthContext (Context API)
├── data/             # Catálogo semilla para poblar Firestore
├── firebase/         # Configuración e inicialización de Firebase
├── pages/            # Vistas/rutas de la aplicación
└── App.jsx           # Definición de rutas (react-router-dom)
```

## Rutas de la aplicación

| Ruta            | Descripción                                  | Acceso     |
|-----------------|-----------------------------------------------|------------|
| `/`             | Página de bienvenida                          | Público    |
| `/productos`    | Catálogo con búsqueda, filtros y paginación   | Público    |
| `/producto/:id` | Detalle de un producto                        | Público    |
| `/carrito`      | Carrito de compras                            | Público    |
| `/login`        | Inicio de sesión                              | Público    |
| `/registro`     | Alta de usuario                               | Público    |
| `/admin`        | Panel de gestión de productos (CRUD)          | Autenticado|


