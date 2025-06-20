// IMPORTS
const jwt = require("jsonwebtoken");



// MIDDLEWARE: Autenticación
// Validar el token desde la cookie.
// Redireccionar según el rol (Admin o User).
// Tener la base preparada para proteger cualquier ruta en el futuro.
const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY_JWB);
        req.user = decoded; //nombre, id, email, role...
        next();
    } catch (error) {
        console.log("Token inválido:", error);
        return res.redirect("/login");
    }
};


// MIDDLEWARE: Redireccionar por role
const redirectByRole = (req, res) => {
    if (req.user.role === "user") return res.redirect("/films");
    if (req.user.role === "admin") return res.redirect("/admin/dashboard");
    return res.redirect("/login");
}



// EXPORTS
module.exports = {
    authenticate,
    redirectByRole
};