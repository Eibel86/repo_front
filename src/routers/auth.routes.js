const { Router } = require("express");
const { login, backLogin, registry, backRegistry } = require("../controllers/auth.controller")
const router = new Router();

router.get("/registry", registry);

router.post("/registry", backRegistry);

router.get("/login", login);

router.post("/login", backLogin);

module.exports = router;