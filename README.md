# Mi Tienda — E-commerce con React

Proyecto final del curso de React JS: una tienda online con catálogo de productos,
carrito de compras, autenticación de usuarios y panel de administración con CRUD,
todo conectado a Firebase.

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

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (se instala junto con Node)

## Instalación y ejecución local

1. Cloná el repositorio y entrá a la carpeta del proyecto:

   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd mi-tienda
   ```

2. Instalá las dependencias:

   ```bash
   npm install
   ```

3. Iniciá el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`).

Otros scripts disponibles:

```bash
npm run build     # genera la versión de producción en /dist
npm run preview   # sirve localmente el build de producción
npm run lint      # corre ESLint sobre el proyecto
```

## Configuración de Firebase

El proyecto ya está conectado a un proyecto real de Firebase (`src/firebase/config.js`,
con Firestore y Authentication habilitados) y funciona sin pasos adicionales. Si querés
usar tu propio proyecto de Firebase en vez del actual:

1. Creá un proyecto en la [consola de Firebase](https://console.firebase.google.com/).
2. Habilitá **Firestore Database** y, en **Authentication → Sign-in method**, el
   proveedor **Correo electrónico/contraseña**.
3. En la consola, andá a **Configuración del proyecto → Tus apps**, registrá una app
   web (ícono `</>`) y copiá el objeto `firebaseConfig` que te muestra.
4. Reemplazá el objeto `firebaseConfig` en `src/firebase/config.js` con esas
   credenciales.

⚠️ La colección de Firestore usada por la app se llama **`Productos`** (con mayúscula
inicial). Si armás tu propio proyecto, la colección se crea sola con ese nombre exacto
la primera vez que agregues un producto desde `/admin` — no hace falta crearla a mano.

### Cargar el catálogo inicial

La colección `Productos` de Firestore empieza vacía. Para poblarla:

1. Corré el proyecto (`npm run dev`) y registrate desde `/registro`.
2. Entrá a `/admin` (ya vas a estar logueado) y hacé clic en **"Cargar catálogo de
   ejemplo"**. Esto sube el catálogo base de 12 productos (definido en
   `src/data/productosSeed.js`) a Firestore de una sola vez.
3. También podés cargar, editar y eliminar productos manualmente desde el mismo panel.
   Si un producto tiene una URL de imagen rota, la app muestra automáticamente un
   cuadro de reemplazo ("Imagen no disponible") en vez de romper el diseño.

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

## Despliegue

La aplicación es una SPA (React Router con `BrowserRouter`), por lo que el servidor
de hosting tiene que redirigir todas las rutas a `index.html`. Ya están incluidos los
archivos de configuración necesarios para los proveedores más comunes.

### Netlify

1. Subí el repositorio a GitHub (ver más abajo).
2. En [Netlify](https://app.netlify.com/), **Add new site → Import an existing
   project** y seleccioná el repositorio.
3. Build command: `npm run build` — Publish directory: `dist`.
4. Netlify va a tomar automáticamente el archivo `public/_redirects` (ya incluido)
   para que las rutas como `/productos` funcionen al recargar la página.
5. Deploy. La URL pública quedará con el formato
   `https://<nombre-del-sitio>.netlify.app`.

### Vercel

1. En [Vercel](https://vercel.com/), **Add New → Project** e importá el repositorio.
2. Framework preset: Vite. Build command: `npm run build` — Output directory: `dist`.
3. El archivo `vercel.json` (ya incluido en la raíz) configura las reescrituras para
   que la SPA funcione con rutas directas.
4. Deploy. La URL pública quedará con el formato `https://<proyecto>.vercel.app`.

### GitHub Pages

1. Instalá la dependencia de despliegue: `npm install --save-dev gh-pages`.
2. En `vite.config.js`, agregá `base: '/<nombre-del-repositorio>/'`.
3. En `package.json`, agregá:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Corré `npm run deploy`. GitHub Pages publica el contenido de `dist` en la rama
   `gh-pages`.
5. Como GitHub Pages no soporta redirecciones de SPA de forma nativa, para que las
   rutas profundas (`/producto/1`, etc.) funcionen al recargar hace falta copiar
   `dist/index.html` como `dist/404.html` antes de desplegar, o cambiar a
   `HashRouter` en `src/App.jsx`.

### Repositorio de GitHub

El repositorio debe incluir `src/`, `public/`, `package.json`, `package-lock.json` y
`.gitignore` (ya configurado para excluir `node_modules` y `dist`).

```bash
git init            # si todavía no se inicializó
git add .
git commit -m "Proyecto final: carrito, auth, CRUD Firebase, diseño responsivo"
git branch -M main
git remote add origin <URL-DEL-REPOSITORIO-EN-GITHUB>
git push -u origin main
```

## Tecnologías utilizadas

React 19 · React Router DOM · Firebase (Firestore + Authentication) · React-Bootstrap
· styled-components · React Icons · React Helmet Async · Vite
