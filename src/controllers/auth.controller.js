// IMPORTS
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
    res.status(200).render("auth/registry"); //Renderiza la vista 'registry' (formulario de registro)
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
    const endpoint = process.env.URL_BASE_BACK + "auth/registry";
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
            return res.redirect("/redirect-by-role");  // middleware para redirigir según rol
        }

        // Si no viene token, renderizar registro con error
        return res.status(400).render("auth/registry", { error: "No se pudo registrar correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).render("auth/registry", { error: "Error en el servidor" });
    }
};

// CONTROLADOR: Login
const login = async (req, res) => {
    //TODO: mirar en la cookie si hay token, y si lo hay redireccionar dependiendo el rol y si no renderizar el login
    res.status(200).render("auth/login")

}


// CONTROLADOR: Login en backend
const backLogin = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "auth/login";
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
            //Redirigimos a una ruta que decide a dónde ir según el rol
            return res.redirect("/redirect-by-role");
        }

        // Usuario no válido o error de login
        res.status(200).render("auth/login", { error: "Credenciales inválidas" });
    } catch (error) {
        console.log(error);
        res.status(200).render("auth/login", { error: "Error en el servidor" });
    }
};

// CONTROLADOR: Logout
const logout = (req, res) => {
    res.clearCookie("token"); //Elimina la cookie
    return res.redirect("/login"); //Redirige al login
}




// EXPORTS
module.exports = {
    login,
    backLogin,
    registry,
    backRegistry,
    logout
};