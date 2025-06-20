// MIDDLEWARE: Autenticación
// Validar el token desde la cookie.
// Redireccionar según el rol (Admin o User).
// Tener la base preparada para proteger cualquier ruta en el futuro.
const authenticate = (req, res, next) => {
    const { userId, userRole } = req.cookies;

    if (!userId || !userRole) {
        return res.redirect("/login");
    }

    req.user = { id: userId, role: userRole };
    next();
};

// MIDDLEWARE: Redireccionar por role
const redirectByRole = (req, res) => {
    if (req.user.role === "user") return res.redirect("/films");
    if (req.user.role === "admin") return res.redirect("/dashboard");
    return res.redirect("/login");
}

// MIDDLEWARE: Verifica si el usuario tiene rol "admin"
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).send("Acceso denegado: no tienes permisos de administrador.");
    }
    next();
};



// EXPORTS
module.exports = {
    authenticate,
    redirectByRole,
    authorizeAdmin
};