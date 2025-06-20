// IMPORTS
const { Router } = require("express");
const { films } = require("../controllers/films.controller")
const { authenticate, onlyUsers } = require("../middlewares/auth.middleware");

const router = new Router();


// RUTAS 
router.get("/", [authenticate, onlyUsers], films);

// SAMPLE: router.get("/films", authenticate, filmsController);





// EXPORTS 
module.exports = router;