// IMPORTS
const { Router } = require("express");
const { films, getFilmsByTitle, addFavourite, deleteFavourite, favouriteFilms } = require("../controllers/films.controller")
const router = new Router();


// RUTAS 
router.get("/", films);

router.post("/searchFilmsByTitle", getFilmsByTitle)

// SAMPLE: router.get("/films", authenticate, filmsController);

router.post("/addFavourite", addFavourite);

router.post("/deleteFavourite", deleteFavourite);


router.get("/favourites", favouriteFilms);

// EXPORTS 
module.exports = router;