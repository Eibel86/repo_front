// IMPORTS
const { apiFetch } = require("../utils/apiFetch");


// CONTROLADOR: Registro
const registry = async (req, res) => {
    res.status(200).render("registry");
};
// CONTROLADOR: Registro en backend
const backRegistry = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "auth/registry";
    try {
        const result = await apiFetch(endpoint, "POST", {}, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(result);
        res.status(200).render("login");
    } catch (error) {
        console.log(error);
        res.status(200).render("registry");
    }
}


// CONTROLADOR: Login
const login = async (req, res) => {
    //mirar en la cookie si hay token, y si lo hay redireccionar dependiendo el rol y si no renderizas el login
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