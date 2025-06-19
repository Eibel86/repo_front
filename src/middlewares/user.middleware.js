const jwt = require("jsonwebtoken");

const setUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = decoded;
            req.user = decoded;
        } catch (error) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
}

module.exports = setUser;