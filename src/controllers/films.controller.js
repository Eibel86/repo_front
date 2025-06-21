
const { apiFetch } = require("../utils/apiFetch");


const films = async (req, res) => {
    res.status(200).render("user/films", { films: {} })
}

const getFilmsByTitle = async (req, res) => {
    try {
        const { title } = req.body
        const userId = 1; //cookieParser.userId
        const result = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/film/search/${title}`);

        //obetner los favoritos del usuario para saber que boton de facorito pintar
        const favsResult = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/getFavourites/${userId}`);
        const favouritesFilmId = favsResult.favourites.map(element => element.film_id);
        console.log(favouritesFilmId)
        return res.render("user/films", { films: result.data, backendUrl: process.env.URL_BASE_BACK, favouritesFilmId, showFavouriteButton: true })//enviar array de ids de film para que el ejs haga la comprobacion
    } catch (error) {
        console.log(error)
        return res.render("user/films", { films: {} })
    }
}


const addFavourite = async (req, res) => {
    try {
        const { filmId } = req.body;
        const userId = 1; //cookieParser.userId
        const endPoint = process.env.URL_BASE_BACK + "/api/v1/addFavourite";
        const result = await apiFetch(
            endPoint,
            "POST",
            {},
            {
                userId,
                filmId
            });
        return res.send("favorito agregado");
    } catch (error) {

        console.log(error)

        return res.send(error.msg);
    }
}


const deleteFavourite = async (req, res) => {
    try {
        const { filmId } = req.body;
        const userId = 1; //cookieParser.userId
        const endPoint = process.env.URL_BASE_BACK + "/api/v1/deleteFavourite";
        const result = await apiFetch(
            endPoint,
            "POST",
            {},
            {
                userId,
                filmId
            });
        return res.send("favorito eliminado");
    } catch (error) {

        console.log(error)

        return res.send(error.msg);
    }
}


const favouriteFilms = async (req, res) => {
    try {

        const userId = 1; //cookieParser.userId
        const result = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/getFavourites/${userId}`);
        const favouritesFilmId = result.favourites.map(element => element.film_id);
        console.log(result)
        return res.render("user/films", { films: result.favourites, backendUrl: process.env.URL_BASE_BACK, favouritesFilmId, showFavouriteButton: true })//enviar array de ids de film para que el ejs haga la comprobacion
    } catch (error) {
        console.log(error)
        return res.render("user/films", { films: {} })
    }
}

module.exports = {
    films,
    getFilmsByTitle,
    addFavourite,
    deleteFavourite,
    favouriteFilms
}


