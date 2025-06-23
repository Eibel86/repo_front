# Front-end Web (EJS + Express)

## Descripción
Cliente web que consume la API back-end para:

- Registro y login de usuarios  
- Visualizar listado de películas  
- Búsqueda por título  
- Añadir/quitar favoritos  
- Dashboards diferenciados para usuario y admin  

---

## Tecnologías
- **Node.js** ≥ v14  
- **Express**  
- **EJS** (templating)  
- **cookie-parser**  
- **node-fetch** (utilidad `apiFetch`)  
- **dotenv**, **cors**  

---

## Requisitos Previos
- Node.js y npm instalados  
- API back-end en ejecución (URL configurada en `.env`)  

---

## Instalación
```bash
git clone <URL_DEL_REPOSITORIO_FRONT>
cd repo_front
npm install
```

## Configuración
1. Duplica el archivo de entorno:

```bash
cp .env.template .env
```
2. Rellena `.env` con:

```env
PORT=4000
URL_BASE_BACK=http://localhost:5000
JWT_SECRET=tu_clave_privada_JWT   # Debe coincidir con PRIVATE_KEY_JWB en el back
```

## Scripts disponibles
- `npm run start`
Inicia la aplicación (node `src/app.js`).

- `npm run dev`
Modo desarrollo con nodemon.


## Estructura de carpetas
repo_front/
├── src/
│   ├── controllers/   # Lógica de rutas (auth, films)
│   ├── middlewares/   # Gestión de cookies y autenticación
│   ├── routers/       # Definición de endpoints Express
│   ├── utils/         # `apiFetch` para llamadas al back
│   ├── public/        # CSS y assets estáticos
│   └── views/         # Plantillas EJS: auth/, user/, admin/, partials/
├── .env.template
└── package.json

## Rutas Principales

| Página                         | Ruta                             | Descripción                              |
|--------------------------------|----------------------------------|------------------------------------------|
| Registro                       | `GET /registry`                  | Formulario de registro                   |
| Procesar registro              | `POST /registry`                 | Envía datos al back                      |
| Login                          | `GET /login`                     | Formulario de login                      |
| Procesar login                 | `POST /login`                    | Envía credenciales                       |
| Logout                         | `GET /logout`                    | Elimina cookies y redirige               |
| Redirección por rol            | `GET /redirect-by-role`          | Lleva a `/films` o `/admin/dashboard`    |
| Listado de películas (user)    | `GET /films`                     | Muestra todas las películas              |
| Búsqueda de películas          | `POST /films/searchFilmsByTitle` | Busca por título                         |
| Añadir favorito                | `POST /films/addFavourite`       | Marca película como favorita             |
| Quitar favorito                | `POST /films/deleteFavourite`    | Quita película de favoritos              |
| Ver favoritos                  | `GET /films/favourites`          | Lista favoritos del usuario              |
| Dashboard Admin                | `GET /admin/dashboard`           | Panel de administración                  |
| Crear película (admin)         | `GET /admin/createFilm`          | Formulario de creación                   |
| Editar película (admin)        | `GET /admin/editFilm/:id`        | Formulario de edición                    |

## Uso
1. Asegúrate de que la API back-end esté corriendo en la URL indicada en `.env`.

2. Ejecuta:

```bash
npm run dev
```
3.Abre en tu navegador: `http://localhost:4000`.