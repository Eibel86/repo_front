// IMPORTS
const { Router } = require("express");
const { films, getFilmsByTitle, addFavourite } = require("../controllers/films.controller")
const router = new Router();


// RUTAS 
router.get("/", films);

router.post("/searchFilmsByTitle", getFilmsByTitle)

// SAMPLE: router.get("/films", authenticate, filmsController);

router.post("/addFavourite/:id", addFavourite);




// EXPORTS 
module.exports = router;