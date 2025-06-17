const { default: fetch } = require("node-fetch");
const { apiFetch } = require("../utils/apiFetch")

const login = async (req, res) => {
    res.status(200).render("login")

}

const backLogin = async (req, res) => {
    const endpoint = "http://localhost:5000/" + "auth/login";
    console.log(process.env.URL_BASE_BACK)
    try {
        const result = await apiFetch(endpoint, "POST", {}, { email: req.body.email, password: req.body.password })
        res.status(200).render("login")
    } catch (error) {
        // res.render("error", { error })
        console.log(error)
        res.status(200).render("login")
    }
}

module.exports = {
    login,
    backLogin
}