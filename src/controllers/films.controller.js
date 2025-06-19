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
module.exports = {
    films,
    getFilmsByTitle
}


