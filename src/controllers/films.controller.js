const { apiFetch } = require("../utils/apiFetch");


const films = async (req, res) => {
    res.status(200).render("user/films", { films: {} })

}

const getFilmsByTitle = async (req, res) => {
    try {
        const { title } = req.body
        const result = await apiFetch(process.env.URL_BASE_BACK + `/api/v1/film/search/${title}`);
        console.log()
        return res.status(200).render("user/films", { films: result.data, backendUrl: process.env.URL_BASE_BACK })
    } catch (error) {
        return res.status(200).render("user/films", { films: {} })
    }
}


const addFavourite = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = 1; //cookieParser.userId
        const endPoint = process.env.URL_BASE_BACK + "/auth/registry";//'http://localhost:5000/api/v1/addFavourite'; //process.env.URL_BASE_BACK + "/api/v1/addFavourite";
        const result = await apiFetch(
            endPoint,
            "POST",
            {},
            {
                userId: userId,
                filmId: id
            });
        console.log(result);
        return res.status(200);
    } catch (error) {
        console.log(error)
        return res.status(500);
    }
}


module.exports = {
    films,
    getFilmsByTitle,
    addFavourite
}


