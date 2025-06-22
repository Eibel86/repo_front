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


/**
 * Controlador para renderizar la vista de películas para el usuario.
 * 
 * Renderiza la página "user/films" enviando un objeto vacío para películas.
 * 
 * @async
 * @function films
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @returns {void} Renderiza la vista de películas con estado 200.
 */
const films = async (req, res) => {
    res.status(200).render("user/films", { films: {} })
}

/**
 * Controlador para buscar películas por título y mostrar resultados al usuario.
 * 
 * Realiza una búsqueda en el backend por el título recibido en el cuerpo de la solicitud,
 * obtiene también las películas favoritas del usuario,
 * actualiza el token en cookies y renderiza la vista con los resultados.
 * 
 * En caso de error, renderiza la vista con datos vacíos.
 * 
 * @async
 * @function getFilmsByTitle
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @property {string} req.body.title - Título de la película a buscar.
 * @property {string} req.cookies.token - Token JWT para autorización.
 * @property {string} req.cookies.userId - ID del usuario para obtener favoritos.
 * 
 * @returns {void} Renderiza la vista "user/films" con los resultados o vacía en caso de error.
 */
const getFilmsByTitle = async (req, res) => {
    try {
        const { title } = req.body
        const userId = req.cookies.userId;
        const result = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/film/search/${title}`, "GET", { "Authorization": `Bearer ${req.cookies.token}` });
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        const favsResult = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/getFavourites/${userId}`, "GET", { "Authorization": `Bearer ${req.cookies.token}` });
        const favouritesFilmId = favsResult.favourites.map(element => element.film_id);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        return res.render("user/films", {
            films: result.data,
            backendUrl: process.env.URL_BASE_BACK,
            favouritesFilmId,
            showFavouriteButton: true,
            showDeleteButton: false,
            showEditButton: false
        })
    } catch (error) {
        console.log(error)
        return res.render("user/films", {
            films: {},
            backendUrl: process.env.URL_BASE_BACK,
            favouritesFilmId: [],
            showFavouriteButton: true,
            showDeleteButton: false,
            showEditButton: false
        })
    }
}

/**
 * Controlador para agregar una película a favoritos del usuario.
 * 
 * Envía una petición POST al backend con el ID del usuario y de la película,
 * actualiza el token en cookies y renderiza la vista de películas.
 * 
 * En caso de error, envía el mensaje de error como respuesta.
 * 
 * @async
 * @function addFavourite
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @property {string} req.body.filmId - ID de la película a añadir a favoritos.
 * @property {string} req.cookies.userId - ID del usuario actual.
 * @property {string} req.cookies.token - Token JWT para autorización.
 * 
 * @returns {void} Renderiza la vista "user/films" o envía un mensaje de error.
 */
const addFavourite = async (req, res) => {
    try {
        const { filmId } = req.body;
        const userId = req.cookies.userId;
        const endPoint = process.env.URL_BASE_BACK + "/api/v1/addFavourite";
        const result = await apiFetch(
            endPoint,
            "POST",
            { "Authorization": `Bearer ${req.cookies.token}` },
            {
                userId,
                filmId
            });
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        return res.render("user/films", {
            films: {},
            backendUrl: process.env.URL_BASE_BACK,
            favouritesFilmId: [],
            showFavouriteButton: true,
            showDeleteButton: false,
            showEditButton: false
        })
    } catch (error) {

        console.log(error)

        return res.send(error.msg);
    }
}

/**
 * Controlador para eliminar una película de los favoritos del usuario.
 * 
 * Envía una solicitud POST al backend con el ID del usuario y la película a eliminar,
 * actualiza el token en cookies y renderiza la vista de películas.
 * 
 * En caso de error, devuelve el mensaje de error.
 * 
 * @async
 * @function deleteFavourite
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @property {string} req.body.filmId - ID de la película a eliminar de favoritos.
 * @property {string} req.cookies.userId - ID del usuario actual.
 * @property {string} req.cookies.token - Token JWT para autorización.
 * 
 * @returns {void} Renderiza la vista "user/films" o envía un mensaje de error.
 */
const deleteFavourite = async (req, res) => {
    try {
        const { filmId } = req.body;
        const userId = req.cookies.userId;
        const endPoint = process.env.URL_BASE_BACK + "/api/v1/deleteFavourite";
        const result = await apiFetch(
            endPoint,
            "POST",
            { "Authorization": `Bearer ${req.cookies.token}` },
            {
                userId,
                filmId
            });
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        return res.render("user/films", {
            films: {},
            backendUrl: process.env.URL_BASE_BACK,
            favouritesFilmId: [],
            showFavouriteButton: true,
            showDeleteButton: false,
            showEditButton: false
        })
    } catch (error) {

        console.log(error)

        return res.send(error.msg);
    }
}

/**
 * Controlador para mostrar las películas favoritas de un usuario.
 * 
 * Obtiene la lista de favoritos desde el backend usando el ID del usuario,
 * actualiza el token en cookies y renderiza la vista de favoritos.
 * 
 * En caso de error, renderiza la vista con datos vacíos.
 * 
 * @async
 * @function favouriteFilms
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * 
 * @property {string} req.cookies.userId - ID del usuario actual.
 * @property {string} req.cookies.token - Token JWT para autorización.
 * 
 * @returns {void} Renderiza la vista "user/favourites" con las películas favoritas o vacía si falla.
 */
const favouriteFilms = async (req, res) => {
    try {

        const userId = req.cookies.userId;
        const result = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/getFavourites/${userId}`, "GET", { "Authorization": `Bearer ${req.cookies.token}` });
        const favouritesFilmId = result.favourites.map(element => element.film_id);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });
        return res.render("user/favourites", {
            films: result.favourites,
            backendUrl: process.env.URL_BASE_BACK,
            favouritesFilmId,
            showFavouriteButton: true,
            showDeleteButton: false,
            showEditButton: false
        })
    } catch (error) {
        console.log(error)
        return res.render("user/favourites", {
            films: {},
            backendUrl: process.env.URL_BASE_BACK,
            favouritesFilmId,
            showFavouriteButton: true,
            showDeleteButton: false,
            showEditButton: false
        })
    }
}




/**
 * Módulo que exporta controladores para la gestión de películas y favoritos de usuario.
 * 
 * @module filmsController
 * 
 * @property {Function} films - Renderiza la vista general de películas para usuarios.
 * @property {Function} getFilmsByTitle - Busca películas por título y muestra resultados.
 * @property {Function} addFavourite - Añade una película a los favoritos del usuario.
 * @property {Function} deleteFavourite - Elimina una película de los favoritos del usuario.
 * @property {Function} favouriteFilms - Muestra la lista de películas favoritas del usuario.
 */
module.exports = {
    films,
    getFilmsByTitle,
    addFavourite,
    deleteFavourite,
    favouriteFilms
}


