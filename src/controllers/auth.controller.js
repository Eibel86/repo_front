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
    res.status(200).render("registry"); //Renderiza la vista 'registry' (formulario de registro)
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
    const endpoint = process.env.URL_BASE_BACK + "auth/registry"; //Construye la URL completa del endpoint externo de registro
    try {
        const result = await apiFetch( //Envía los datos del usuario al backend usando una función helper (apiFetch)
            endpoint,   //URL
            "POST",     //Método
            {},         //Headers (vacíos en este caso)
            {           //Cuerpo de la petición con datos del formulario
                name: req.body.name, 
                email: req.body.email,
                password: req.body.password
            });
        console.log(result); //Muestra en consola la respuesta del back (msj o token)
        res.status(200).render("login"); //Redirige al usuario a la página de login si el registro fue exitoso

    } catch (error) {
        console.log(error);
        res.status(200).render("registry"); //Vuelve a mostrar el formulario de registro al usuario
    }
}


// CONTROLADOR: Login
const login = async (req, res) => {
    //TODO: mirar en la cookie si hay token, y si lo hay redireccionar dependiendo el rol y si no renderizar el login
    res.status(200).render("login")

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

        res.status(200).render("login");
    } catch (error) {
        console.log(error)
        res.status(200).render("login");
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