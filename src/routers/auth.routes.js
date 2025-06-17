const { Router } = require("express");
const { login, backLogin } = require("../controllers/auth.controller")
const router = new Router();


router.get("/login", login);

router.post("/login", backLogin);

module.exports = router;