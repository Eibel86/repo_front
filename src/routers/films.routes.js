// IMPORTS
const { Router } = require("express");
const { films } = require("../controllers/films.controller")
const { onlyAuth, onlyUsers } = require("../middlewares/auth.middleware");

const router = new Router();


// RUTAS 
router.get("/", [onlyAuth, onlyUsers], films);

// SAMPLE: router.get("/films", authenticate, filmsController);





// EXPORTS 
module.exports = router;