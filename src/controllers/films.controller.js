const { apiFetch } = require("../utils/apiFetch");


const films = async (req, res) => {
    res.status(200).render("user/films", { films: {} })
}

const getFilmsByTitle = async (req, res) => {
    try {
        const { title } = req.body
        const userId = req.cookies.userId;
        const result = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/film/search/${title}`, "GET", { "Authorization": `Bearer ${req.cookies.token}` });
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }

        const favsResult = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/getFavourites/${userId}`, "GET", { "Authorization": `Bearer ${req.cookies.token}` });
        const favouritesFilmId = favsResult.favourites.map(element => element.film_id);

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
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }
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
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }
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


const favouriteFilms = async (req, res) => {
    try {

        const userId = req.cookies.userId;
        const result = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/getFavourites/${userId}`, "GET", { "Authorization": `Bearer ${req.cookies.token}` });
        const favouritesFilmId = result.favourites.map(element => element.film_id);
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }
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

module.exports = {
    films,
    getFilmsByTitle,
    addFavourite,
    deleteFavourite,
    favouriteFilms
}


