// IMPORTS
const { Router } = require("express");
const { films } = require("../controllers/films.controller")
const router = new Router();
const { authenticate } = require("../middlewares/auth.middleware.js");


// RUTAS 
router.get("/", [authenticate], films);

// SAMPLE: router.get("/films", authenticate, filmsController);





// EXPORTS 
module.exports = router;