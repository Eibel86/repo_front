/**
 * Middleware que analiza las cookies presentes en las solicitudes HTTP entrantes.
 * 
 * Proporciona acceso a las cookies a través de `req.cookies`.
 * Requiere que las cookies estén formateadas correctamente en el encabezado `Cookie`.
 * 
 * @module cookieParser
 * @requires cookie-parser
 */
const cookieParser = require("cookie-parser");


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


// ADMIN CONTROLLERS:
// CONTROLADOR: admin/films (dashboard)  ---------------------------------------------- // 

/**
 * Controlador para renderizar el panel de administración (Dashboard) del administrador.
 * 
 * Esta función:
 * - Realiza una petición a la API del backend para obtener todas las películas.
 * - Establece una nueva cookie `token` con el valor actualizado recibido desde el backend.
 * - Renderiza la vista `admin/adminDashboard` con los datos obtenidos.
 * 
 * @async
 * @function adminDashboard
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @property {Object} req.cookies - Cookies enviadas por el cliente, incluyendo el token JWT.
 * 
 * @returns {void} Renderiza la vista o responde con un mensaje de error.
 * 
 * @example
 * // Ruta que usa este controlador
 * router.get("/admin/dashboard", adminDashboard);
 * 
 * // Vista esperada: views/admin/adminDashboard.ejs
 * 
 * // Resultado esperado: Renderiza el panel con todas las películas y botones de gestión
 */
const adminDashboard = async (req, res) => {

    console.log('entraen admin dashboard')
    const endpoint = process.env.URL_BASE_BACK + "/api/v1/allfilms"

    try {
        const result = await apiFetch(endpoint, "GET", { "Authorization": `Bearer ${req.cookies.token}` })
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.render("admin/adminDashboard", {
            films: result.data,
            backendUrl: process.env.URL_BASE_BACK,
            showFavouriteButton: false,
            showDeleteButton: true,
            showEditButton: true
        })

    } catch (error) {
        console.log(error)
        res.send('error')
    }
}


/**
 * Controlador para eliminar una película desde el panel de administración.
 * 
 * Esta función:
 * - Recibe el `filmId` del cuerpo de la solicitud (`req.body`).
 * - Realiza una petición DELETE al backend para eliminar la película correspondiente.
 * - Actualiza la cookie `token` con el nuevo valor retornado por el backend.
 * - Redirige al administrador de vuelta al panel `dashboard`.
 * 
 * @async
 * @function deleteFilm
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @property {Object} req.body.filmId - ID de la película a eliminar.
 * @property {Object} req.cookies.token - Token JWT del usuario administrador.
 * 
 * @returns {void} Redirige a la vista del dashboard o muestra un mensaje de error.
 * 
 * @example
 * // Ruta que usa este controlador:
 * router.post("/admin/delete", deleteFilm);
 * 
 * // Formulario asociado:
 * <form method="POST" action="/admin/delete">
 *   <input type="hidden" name="filmId" value="<%= film.film_id %>">
 *   <button type="submit">Eliminar</button>
 * </form>
 */
const deleteFilm = async (req, res) => {
    try {
        const endpoint = process.env.URL_BASE_BACK + `/api/v1/deleteFilm/${req.body.filmId}`
        const result = await apiFetch(
            endpoint,
            "DELETE",
            { "Authorization": `Bearer ${req.cookies.token}` })
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.redirect("dashboard");
    } catch (error) {
        console.log(error)
        res.send("error")
    }
}




// CONTROLADOR: admin/createfilm ----------------------------------------------------- // 
// CONTROLADOR: renderizar vista de creación de películas. /GET
// El formulario manda los datos por POST a la ruta admin/createfilm con el controlador createFilm

/**
 * Controlador para renderizar el formulario de creación de una nueva película.
 * 
 * Esta función:
 * - Renderiza la vista `admin/adminCreateFilm`.
 * - Envía un array vacío de errores por defecto, útil para validaciones posteriores.
 * 
 * @async
 * @function renderCreateFilm
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @returns {void} Renderiza la vista del formulario.
 * 
 * @example
 * // Ruta que usa este controlador:
 * router.get("/admin/create", renderCreateFilm);
 * 
 * // Vista esperada: views/admin/adminCreateFilm.ejs
 * 
 * // Variables enviadas a la vista:
 * // - errores: []
 */
const renderCreateFilm = async (req, res) => {
    res.render("admin/adminCreateFilm", { errores: [] });
};


// RUTA BACK: http://localhost:5000/api/v1/createfilm
// CONTROLADOR: procesa el formulario de creación de películas.

/**
 * Controlador para procesar el formulario de creación de una nueva película.
 * 
 * Esta función:
 * - Envía una solicitud POST al backend para crear una nueva película, incluyendo la autenticación mediante token.
 * - Si la creación es exitosa, redirige al administrador al panel de control (`dashboard`).
 * - Si hay errores de validación, renderiza nuevamente el formulario con los mensajes de error.
 * - En caso de error de conexión o fallo inesperado, redirige igualmente al `dashboard` como medida de fallback.
 * 
 * @async
 * @function createFilm
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @property {Object} req.body - Datos del formulario (título, director, género, fecha, etc.).
 * @property {Object} req.cookies.token - Token JWT para autenticación con el backend.
 * @property {Object} req.headers - Headers que se reenviarán al backend (útil para multipart/form-data con archivos).
 * 
 * @returns {void} Redirige o renderiza la vista según el resultado de la operación.
 * 
 * @example
 * // Ruta que usa este controlador:
 * router.post("/admin/create", upload.single("image"), createFilm);
 * 
 * // Vista renderizada en caso de error:
 * views/admin/adminCreateFilm.ejs
 * 
 * // Variables enviadas a la vista:
 * // - errores: array de mensajes de validación
 */
const createFilm = async (req, res) => {

    const endpoint = process.env.URL_BASE_BACK + "/api/v1/createfilm"

    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: { ...req.headers, "Authorization": `Bearer ${req.cookies.token}` },
            body: req,
            duplex: 'half'
        });
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        if (result.ok) {
            res.redirect("dashboard"); //Redirigir al adminDashboard

        } else {
            const data = await result.json();
            const errores = Object.values(data.errores).map(err => err.msg);
            console.log(errores)
            res.render("admin/adminCreateFilm", { errores });
            //gestiono la 
            /*
            res.render(formulario de crear la película) mandandole el resultado con losw mensajes de error
            */
        }


    } catch (error) {
        console.log(error)
        res.redirect("dashboard");
    }

}


/**
 * Controlador para renderizar el formulario de edición de una película.
 * 
 * Esta función:
 * - Obtiene el ID de la película desde el cuerpo del formulario (`req.body.filmId`).
 * - Realiza una petición GET al backend para recuperar los datos de esa película.
 * - Establece nuevamente la cookie de autenticación `token` si es proporcionada.
 * - Renderiza la vista `admin/adminEditFilm` con los datos de la película para ser editados.
 * 
 * En caso de error (por ejemplo, si no se encuentra la película), redirige al `dashboard`.
 * 
 * @async
 * @function editFilm
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @property {string} req.body.filmId - ID de la película a editar.
 * @property {string} req.cookies.token - Token JWT para autorización.
 * 
 * @returns {void} Renderiza el formulario de edición o redirige al dashboard en caso de error.
 * 
 * @example
 * // Ruta que usa este controlador:
 * router.post("/admin/edit", editFilm);
 * 
 * // Vista esperada:
 * views/admin/adminEditFilm.ejs
 * 
 * // Variables enviadas a la vista:
 * // - film: datos actuales de la película.
 * // - errores: array vacío inicialmente, útil para mostrar errores de validación luego.
 */
const editFilm = async (req, res) => {
    try {
        const filmId = req.body.filmId;
        const endpoint = process.env.URL_BASE_BACK + `/api/v1/film/searching/${filmId}`;
        const result = await apiFetch(
            endpoint,
            "GET",
            { "Authorization": `Bearer ${req.cookies.token}` })

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.render("admin/adminEditFilm", {
            film: result.data,
            errores: []
        });
    } catch (error) {
        console.log(error)
        res.redirect("dashboard");
    }


}


/**
 * Controlador proxy para actualizar una película en el backend.
 * 
 * Esta función:
 * - Envia una solicitud POST al endpoint de actualización de películas (`/api/v1/updatefilm`).
 * - Reenvía los headers y el cuerpo de la solicitud original, incluyendo el token JWT desde las cookies.
 * - Si la actualización es exitosa, redirige al `dashboard`.
 * - Si hay errores (por ejemplo, de validación), recupera los datos actuales de la película y
 *   vuelve a renderizar el formulario de edición con los mensajes de error.
 * 
 * @async
 * @function editFilmProxy
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @property {Object} req.cookies.token - Token JWT para autorización.
 * @property {Object} req.headers - Headers reenviados al backend.
 * @property {Object} req.body - Datos del formulario con la película actualizada.
 * 
 * @returns {void} Redirige al dashboard o renderiza la vista de edición con errores.
 * 
 * @example
 * // Ruta que usa este controlador:
 * router.post("/admin/edit/submit", editFilmProxy);
 * 
 * // Vista renderizada en caso de error:
 * views/admin/adminEditFilm.ejs
 * 
 * // Variables enviadas a la vista:
 * // - film: datos actuales de la película.
 * // - errores: array de mensajes de validación.
 */
const editFilmProxy = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "/api/v1/updatefilm"

    //todo: obtener de la cookie el token y añadirselo al header
    //despues actualizar el token de la cookie con la respuesta
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: { ...req.headers, "Authorization": `Bearer ${req.cookies.token}` },
            body: req,
            duplex: 'half'
        });

        if (result.ok) {
            console.log({ result })
            res.redirect("dashboard"); //Redirigir al adminDashboard

        } else {
            const data = await result.json()
            console.log({ data })
            const result = await apiFetch(
                endpoint,
                "GET",
                { "Authorization": `Bearer ${req.cookies.token}` })
            const errores = Object.values(data.errores).map(err => err.msg);
            res.render("admin/adminEditFilm", {
                film: result.data,
                errores
            });
        }


    } catch (error) {
        console.log(error)
        res.redirect("dashboard");
    }

};




// EXPORTS
/**
 * Módulo que agrupa y exporta todos los controladores relacionados con la gestión
 * administrativa de películas en la aplicación.
 * 
 */
module.exports = {
    adminDashboard,
    renderCreateFilm,
    createFilm,
    deleteFilm,
    editFilm,
    editFilmProxy
}