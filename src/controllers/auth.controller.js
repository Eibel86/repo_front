const { apiFetch } = require("../utils/apiFetch")

const login = async (req, res) => {
    res.status(200).render("login")
    // const endpoint = process.env.URL_BASE_BACK + "login";
    // try {
    //     const result = apiFetch(endpoint, "POST", "header", "body")
    // } catch (error) {

    // }
}

const backLogin = async (req, res) => {
    console.log("BACK LOGIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIN")
    const endpoint = process.env.URL_BASE_BACK + "auth/login";
    console.log(endpoint)
    try {
        const result = await apiFetch(endpoint, "POST", {}, { email: req.email, password: req.password })
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