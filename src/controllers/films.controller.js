const { apiFetch } = require("../utils/apiFetch");
const films = async (req, res) => {
    res.status(200).render("films")

}
module.exports = {
    films
}