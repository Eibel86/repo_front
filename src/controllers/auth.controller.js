// IMPORTS
/**
 * Función personalizada para realizar peticiones HTTP a APIs externas o internas.
 * 
 * Esta función se importa desde un archivo utilitario local y típicamente se utiliza
 * para centralizar el manejo de llamadas a APIs, incluyendo headers, autenticación, etc.
 * 
 * @function apiFetch
 * @memberof module:utils/apiFetch
 * @param {string} url - URL a la que se realizará la solicitud.
 * @param {Object} [options={}] - Opciones adicionales para la solicitud (método, headers, body, etc).
 * @returns {Promise<Object>} - Devuelve una promesa que resuelve con la respuesta JSON de la API.
 * 
 * @example
 * const data = await apiFetch("https://api.example.com/data", { method: "GET" });
 */
const { apiFetch } = require("../utils/apiFetch");


// CONTROLADOR: Registro
/**
 * Controlador que muestra la vista de registro al usuario.
 * 
 * @route GET /registry
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns Renderiza la plantilla "registry".
 */
const registry = async (req, res) => {

    res.status(200).render("auth/registry", { errors: {} }); //Renderiza la vista 'registry' (formulario de registro)
};
// CONTROLADOR: Registro en backend
/**
 * Controlador que procesa el formulario de registro en el backend.
 * Envía los datos del usuario a una API externa para registrar al nuevo usuario.
 * 
 * @route POST /registry
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @returns Redirige a login si tiene éxito, o vuelve a registry si hay error.
 */
const backRegistry = async (req, res) => {

    const endpoint = process.env.URL_BASE_BACK + "/auth/registry"; //Construye la URL completa del endpoint externo de registro

    try {
        const result = await apiFetch(endpoint, "POST", {}, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        console.log("Resultado registro backend:", result);

        // Asumimos que result tiene el token
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.cookie("userId", result.user.id, {
                httpOnly: false,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.cookie("userRole", result.user.role, {
                httpOnly: false,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
            //Esto lo podemos probar a redirigir a films
            return res.redirect("/redirect-by-role");  // middleware para redirigir según rol
        }


        // Si no viene token, renderizar registro con error
        return res.status(400).render("auth/registry", { error: "No se pudo registrar correctamente" });
    } catch (error) {
        // 👇 Mapear los mensajes desde el objeto `errores`
        console.log(error);

        const errors = {};


        if (error.errores) {
            for (const field in error.errores) {
                errors[field] = error.errores[field].msg;
            }
        } else {
            errors.general = error.error || "Error inesperado";
        }

        return res.status(400).render("auth/registry", { errors });
    }
};

// CONTROLADOR: Login


/**
 * Controlador para mostrar la página de login.
 * 
 * Renderiza la vista de login con un objeto vacío de errores.
 * 
 * @async
 * @function login
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @returns {void} Renderiza la vista de login con estado 200.
 */
const login = async (req, res) => {
    //TODO: mirar en la cookie si hay token, y si lo hay redireccionar dependiendo el rol y si no renderizar el login

    res.status(200).render("auth/login", { errors: {} });


};


// CONTROLADOR: Login en backend
/**
 * Controlador para procesar el login enviando credenciales al backend.
 * 
 * Envía email y contraseña al endpoint de autenticación,
 * guarda el token y datos del usuario en cookies,
 * y redirige según el rol del usuario.
 * 
 * En caso de error, renderiza la vista de login con mensajes de error.
 * 
 * @async
 * @function backLogin
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @returns {void} Redirige o renderiza la vista de login según resultado.
 */
const backLogin = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "/auth/login";
    try {
        const result = await apiFetch(endpoint, "POST", {}, {
            email: req.body.email,
            password: req.body.password
        })
        if (result.token) {
            //Guardar token en cookie
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false, //Cambiar a true si usamos HTTPS
                maxAge: 1000 * 60 * 60 * 24 //1 día 
            });


            // Guarda los datos en cookies accesibles desde JS
            res.cookie("userId", result.user.id, {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24
            });
            res.cookie("userRole", result.user.role, {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24
            });

            //Redirigimos a una ruta que decide a dónde ir según el rol
            return res.redirect("/redirect-by-role");
        }


        // Usuario no válido o error de login
        res.status(401).render("auth/login", { error: "Credenciales inválidas" });
    } catch (error) {
        // 👇 Mapear los mensajes desde el objeto `errores`
        const errors = {};
        console.log(error);

        if (error.errores) {
            for (const field in error.errores) {
                errors[field] = error.errores[field].msg;
            }
        } else {
            errors.general = error.error || "Error inesperado";
        }

        return res.status(400).render("auth/login", { errors });

    }
};

// CONTROLADOR: Logout

/**
 * Controlador para cerrar la sesión del usuario.
 * 
 * Elimina las cookies de autenticación y redirige a la página de login.
 * 
 * @function logout
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @returns {void} Redirige a la ruta de login después de limpiar las cookies.
 */
const logout = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("userId");
    res.clearCookie("userRole");
    return res.redirect("/login");
};



// EXPORTS
/**
 * Módulo que exporta los controladores de autenticación y registro de usuarios.
 * 
 * @module authController
 * 
 * @property {Function} login - Renderiza la página de login.
 * @property {Function} backLogin - Procesa el login enviando credenciales al backend.
 * @property {Function} registry - Renderiza la página de registro.
 * @property {Function} backRegistry - Procesa el registro enviando datos al backend.
 * @property {Function} logout - Cierra sesión eliminando cookies y redirigiendo al login.
 */
module.exports = {
    login,
    backLogin,
    registry,
    backRegistry,
    logout
};