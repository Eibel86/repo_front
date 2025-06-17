const { Router } = require("express");
const { films } = require("../controllers/films.controller")
const router = new Router();


router.get("/", films);

module.exports = router;