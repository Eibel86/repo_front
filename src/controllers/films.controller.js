const { apiFetch } = require("../utils/apiFetch");


const films = async (req, res) => {
    res.render("films")

}
module.exports = {
    films
}