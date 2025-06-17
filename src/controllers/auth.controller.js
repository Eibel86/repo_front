const { apiFetch } = require("../utils/apiFetch");

const registry = async (req, res) => {
    res.status(200).render("registry");
};

const backRegistry = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "auth/registry";
    try {
        const result = await apiFetch(endpoint, "POST", {}, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(result);
        res.status(200).render("login");
    } catch (error) {
        console.log(error);
        res.status(200).render("registry");
    }
}

const login = async (req, res) => {
    res.status(200).render("login")

}

const backLogin = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "auth/login";
    try {
        const result = await apiFetch(endpoint, "POST", {}, {
            email: req.body.email,
            password: req.body.password
        })
        if (result.token) {
            if (result.role != "Admin") {
                return res.redirect("/dashboard");
            } else {
                return res.redirect("/films");
            }
        }
    } catch (error) {
        console.log(error)
        res.status(200).render("login")
    }
}

module.exports = {
    login,
    backLogin,
    registry,
    backRegistry
};