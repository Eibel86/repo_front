// IMPORTS
/**
 * Importa el enrutador de Express para definir rutas modulares.
 */
const { Router } = require("express");
/**
 * Importa los controladores para gestión de visualización y favoritos de películas.
 */
const { films, getFilmsByTitle, addFavourite, deleteFavourite, favouriteFilms } = require("../controllers/films.controller")
/**
 * Importa middleware de autenticación y autorización para rutas de usuario.
 */
const { authenticate, onlyUsers } = require("../middlewares/auth.middleware");
/**
 * Crea una nueva instancia del enrutador de Express para definir rutas específicas.
 */
const router = new Router();


// RUTAS 
/**
 * Ruta GET para la página principal de películas de usuario.
 * 
 * Protegida por middlewares `authenticate` y `onlyUsers` para asegurar acceso de usuario.
 * Llama al controlador `films` para renderizar la vista de películas.
 */
router.get("/", [authenticate, onlyUsers], films);
/**
 * Ruta POST para buscar películas por título.
 * 
 * Llama al controlador `getFilmsByTitle` para realizar la búsqueda y mostrar resultados.
 */
router.post("/searchFilmsByTitle", getFilmsByTitle)

// SAMPLE: router.get("/films", authenticate, filmsController);
/**
 * Ruta POST para añadir una película a favoritos del usuario.
 * 
 * Protegida por los middlewares `authenticate` y `onlyUsers`.
 * Llama al controlador `addFavourite` para procesar la petición.
 */
router.post("/addFavourite", addFavourite);

/**
 * Ruta POST para eliminar una película de favoritos del usuario.
 * 
 * Protegida por los middlewares `authenticate` y `onlyUsers`.
 * Llama al controlador `deleteFavourite` para procesar la petición.
 */
router.post("/deleteFavourite", deleteFavourite);

/**
 * Ruta GET para mostrar las películas favoritas del usuario.
 * 
 * Protegida por los middlewares `authenticate` y `onlyUsers`.
 * Llama al controlador `favouriteFilms` para renderizar la vista de favoritos.
 */
router.get("/favourites", favouriteFilms);

// EXPORTS 
/**
 * Exporta el enrutador con todas las rutas de películas de usuario.
 */
module.exports = router;