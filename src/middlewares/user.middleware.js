const setUser = (req, res, next) => {
    const userId = req.cookies.userId;
    const userRole = req.cookies.userRole;

    if (userId && userRole) {
        req.user = { id: userId, role: userRole };
        res.locals.user = req.user;
    } else {
        req.user = null;
        res.locals.user = null;
    }
    next();
};
module.exports = setUser;