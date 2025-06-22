
/**
 * Middleware que extrae el ID y rol del usuario de las cookies,
 * asignándolos a `req.user` y `res.locals.user` para uso en rutas y vistas.
 * Si no hay datos, asigna `null`.
 */
const setUser = (req, res, next) => {
    const userId = req.cookies.userId;
    const userRole = req.cookies.userRole;

    if (userId && userRole) {
        req.user = { id: userId, role: userRole };
        res.locals.user = req.user;
    } else {
        req.user = null;
        res.locals.user = null;
    }

    next();
};


/**
 * Exportar el middleware
 * Middleware que añade información del usuario (ID y rol) extraída de cookies
 */
module.exports = setUser;