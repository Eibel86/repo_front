// MIDDLEWARE: Autenticación
// Validar el token desde la cookie.
// Redireccionar según el rol (Admin o User).
// Tener la base preparada para proteger cualquier ruta en el futuro.

/**
 * Middleware para verificar autenticación basada en cookies.
 * Redirige a login si no hay usuario, continúa si está autenticado.
 */
const authenticate = (req, res, next) => {
    const { userId, userRole } = req.cookies;
    if (!userId || !userRole) {
        return res.redirect("/login");
    }

    req.user = { id: userId, role: userRole };
    next();
};

// MIDDLEWARE: Redireccionar por role
/**
 * Redirige al usuario según su rol: usuario normal a /films, administrador a /admin/dashboard.
 * Si no hay rol válido, redirige a login.
 */
const redirectByRole = (req, res) => {
    if (req.user.role === "user") return res.redirect("/films");
    if (req.user.role === "admin") return res.redirect("/admin/dashboard");
    return res.redirect("/login");
}

// MIDDLEWARE: Verifica si el usuario tiene rol "admin"
/**
 * Middleware que permite acceso solo a usuarios con rol "admin".
 * Si no es admin, elimina cookies y redirige al login.
 */
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

/**
 * Middleware que permite acceso solo a usuarios con rol "user" o "admin".
 * Si el rol no es válido, elimina cookies y redirige al login.
 */
const onlyUsers = (req, res, next) => {
    const { userRole } = req.cookies;
    if (userRole === "user" || userRole === "admin") return next();

    res.clearCookie("token");
    res.clearCookie("userId");
    res.clearCookie("userRole");
    return res.redirect("/login");
};

/**
 * Middleware que permite acceso solo a usuarios con rol "admin".
 * Si no es admin, elimina cookies y redirige al login.
 */
const onlyAdmins = (req, res, next) => {
    const { userRole } = req.cookies;
    if (userRole === "admin") return next();

    res.clearCookie("token");
    res.clearCookie("userId");
    res.clearCookie("userRole");
    return res.redirect("/login");
};


/**
 * Middleware que redirige usuarios autenticados según su rol.
 * Usuarios "user" van a /films y "admin" a /admin/dashboard.
 * Si no están autenticados, continúa al siguiente middleware.
 */
const redirectIfAuthenticated = (req, res, next) => {
    const { userRole } = req.cookies;

    if (userRole === "user") return res.redirect("/films");
    if (userRole === "admin") return res.redirect("/admin/dashboard");

    next();
};



/**
 * Módulo que exporta middlewares para autenticación y autorización de usuarios.
 * 
 * @module authMiddleware
 * 
 * @property {Function} authenticate - Verifica que el usuario esté autenticado.
 * @property {Function} redirectByRole - Redirige según el rol del usuario.
 * @property {Function} authorizeAdmin - Permite solo acceso a administradores.
 * @property {Function} onlyUsers - Permite acceso a usuarios y administradores.
 * @property {Function} onlyAdmins - Permite acceso solo a administradores.
 * @property {Function} redirectIfAuthenticated - Redirige usuarios autenticados fuera de login/registro.
 */
module.exports = {
    authenticate,
    redirectByRole,
    authorizeAdmin,
    onlyUsers,
    onlyAdmins,
    redirectIfAuthenticated
};
