// IMPORTS
/**
 * Importa el enrutador de Express para definir rutas modulares.
 */
const { Router } = require("express");
/**
 * Importa los controladores de autenticación y registro de usuarios.
 */
const { login, backLogin, registry, backRegistry, logout } = require("../controllers/auth.controller")
/**
 * Importa middlewares para autenticación y redirección basada en rol.
 */
const { authenticate, redirectByRole, redirectIfAuthenticated } = require("../middlewares/auth.middleware.js");
/**
 * Crea una nueva instancia del enrutador de Express para definir rutas específicas.
 */
const router = new Router();




// RUTA: Registro front y back
//http://localhost:4000/registry
/**
 * Ruta GET para mostrar el formulario de registro de usuario.
 * 
 * Llama al controlador `registry` para renderizar la vista.
 */
router.get("/registry", registry);
/**
 * Ruta POST para procesar el registro de un nuevo usuario.
 * 
 * Llama al controlador `backRegistry` que maneja la lógica de creación.
 */
router.post("/registry", backRegistry);

// RUTA: Login front y back
//http://localhost:4000/login
/**
 * Ruta GET para mostrar la página de login.
 * 
 * Si el usuario ya está autenticado, es redirigido según su rol.
 * Llama al controlador `login` para renderizar la vista.
 */
router.get("/login", redirectIfAuthenticated, login);
/**
 * Ruta POST para procesar el login del usuario.
 * 
 * Llama al controlador `backLogin` que valida credenciales y gestiona cookies.
 */
router.post("/login", backLogin);

//RUTA: Logout
/**
 * Ruta GET para cerrar la sesión del usuario.
 * 
 * Llama al controlador `logout`, que elimina las cookies y redirige a login.
 */
router.get("/logout", logout);

// RUTA: redirección por rol
//http://localhost:4000/redirect-by-role
/**
 * Ruta GET para redirigir al usuario según su rol.
 * 
 * Protegida por middleware `authenticate` para asegurar que el usuario esté logueado.
 * Llama a `redirectByRole` para enviar al usuario a la ruta correspondiente.
 */
router.get("/redirect-by-role", authenticate, redirectByRole);





// EXPORTS 
/**
 * Exporta el enrutador con todas las rutas de autenticación y registro.
 */
module.exports = router;