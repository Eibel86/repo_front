
/**
 * Módulo que centraliza la importación de todos los enrutadores de la aplicación.
 *
 * @module routes
 *
 * @property {Object} authRoutes     - Rutas de autenticación y registro de usuarios.
 * @property {Object} filmsRoutes    - Rutas para la gestión y visualización de películas.
 * @property {Object} dashboardRoutes - Rutas del panel de administración.
 */
module.exports = {
    authRoutes: require("./auth.routes"),
    filmsRoutes: require("./films.routes"),
    dashboardRoutes: require("./admin.routes")
}

