const { apiFetch } = require("../utils/apiFetch");

const dashboard = async (req, res) => {
    res.status(200).render("dashboard")

}

module.exports = {
    dashboard
}