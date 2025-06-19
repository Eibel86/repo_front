// IMPORTS
const { Router } = require("express");
const { films, getFilmsByTitle } = require("../controllers/films.controller")
const router = new Router();


// RUTAS 
router.get("/", films);

router.post("/searchFilmsByTitle", getFilmsByTitle)

// SAMPLE: router.get("/films", authenticate, filmsController);





// EXPORTS 
module.exports = router;