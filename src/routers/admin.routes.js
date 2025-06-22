// IMPORTS:

/**
 * Importa el enrutador de Express para definir rutas modulares.
 */
const { Router } = require("express");
/**
 * Importa los controladores relacionados con la gestión administrativa de películas.
 */
const { adminDashboard, renderCreateFilm, createFilm, deleteFilm, editFilm, editFilmProxy } = require("../controllers/admin.controller")
/**
 * Importa middlewares para autenticación y autorización de administradores.
 */
const { authenticate, authorizeAdmin } = require("../middlewares/auth.middleware");
/**
 * Crea una nueva instancia del enrutador de Express para definir rutas específicas.
 */
const router = new Router();


/**
 * Ruta GET para el dashboard de administrador.
 * 
 * Protegida por middlewares de autenticación y autorización de admin.
 * Llama al controlador `adminDashboard` para renderizar la vista.
 */
router.get("/dashboard", [authenticate, authorizeAdmin], adminDashboard);
// RUTA: Mostrar formulario
//http://localhost:4000/dashboard/admin/createfilm
/**
 * Ruta GET para mostrar el formulario de creación de una película.
 * 
 * Llama al controlador `renderCreateFilm` para renderizar la vista.
 */
router.get("/createfilm", renderCreateFilm);

// RUTA: Procesar formulario (se añade después Multer como middleware)
//http://localhost:4000/dashboard/admin/createfilm
/**
 * Ruta POST para procesar el formulario de creación de una película.
 * 
 * Llama al controlador `createFilm` para manejar la creación.
 * 
 * Nota: se espera que el middleware de subida de archivos (`upload.single("image")`) 
 * sea añadido si se manejan imágenes.
 */
router.post("/createfilm", createFilm); // Modificado upload.single("image"), 

/**
 * Ruta POST para eliminar una película.
 * 
 * Llama al controlador `deleteFilm` que procesa la eliminación según el ID recibido.
 */
router.post("/deleteFilm", deleteFilm);

/**
 * Ruta POST para obtener datos de una película a editar.
 * 
 * Llama al controlador `editFilm` que busca la película por ID y renderiza la vista de edición.
 */
router.post("/editFilm", editFilm);


/**
 * Ruta POST para procesar la actualización de una película.
 * 
 * Llama al controlador `editFilmProxy` que envía los datos al backend para actualizar.
 */
router.post("/editFilmProxy", editFilmProxy)


// EXPORTS:

/**
 * Exporta el enrutador configurado con las rutas del administrador.
 */
module.exports = router;