// IMPORTS
const { Router } = require("express");
const { films } = require("../controllers/films.controller")
const router = new Router();


// RUTAS 
router.get("/", films);

// SAMPLE: router.get("/films", authenticate, filmsController);


// EXPORTS 
module.exports = router;