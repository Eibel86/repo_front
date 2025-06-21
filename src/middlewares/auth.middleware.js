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
        // Eliminar cookies
        res.clearCookie("token");
        res.clearCookie("userId");
        res.clearCookie("userRole");

        // Redirigir al login
        return res.redirect("/login");
    }
    next();
};

const onlyUsers = (req, res, next) => {
    const { userRole } = req.cookies;
    if (userRole === "user" || userRole === "admin") return next();

    res.clearCookie("token");
    res.clearCookie("userId");
    res.clearCookie("userRole");
    return res.redirect("/login");
};


const onlyAdmins = (req, res, next) => {
    const { userRole } = req.cookies;
    if (userRole === "admin") return next();

    res.clearCookie("token");
    res.clearCookie("userId");
    res.clearCookie("userRole");
    return res.redirect("/login");
};

const redirectIfAuthenticated = (req, res, next) => {
    const { userRole } = req.cookies;

    if (userRole === "user") return res.redirect("/films");
    if (userRole === "admin") return res.redirect("/dashboard");

    next();
};

module.exports = {
    authenticate,
    redirectByRole,
    authorizeAdmin,
    onlyUsers,
    onlyAdmins,
    redirectIfAuthenticated
};
