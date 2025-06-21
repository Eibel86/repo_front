const films = async (req, res) => {
    res.status(200).render("user/films")

}
module.exports = {
    films
}