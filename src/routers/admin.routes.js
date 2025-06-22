// IMPORTS:
const { Router } = require("express");
const { adminDashboard, renderCreateFilm, createFilm, deleteFilm, editFilm, editFilmProxy } = require("../controllers/admin.controller")
const { authenticate, authorizeAdmin } = require("../middlewares/auth.middleware");
const router = new Router();



router.get("/dashboard", [authenticate, authorizeAdmin], adminDashboard);
// RUTA: Mostrar formulario
//http://localhost:4000/dashboard/admin/createfilm
router.get("/createfilm", renderCreateFilm);

// RUTA: Procesar formulario (se añade después Multer como middleware)
//http://localhost:4000/dashboard/admin/createfilm
router.post("/createfilm", createFilm); // Modificado upload.single("image"), 

router.post("/deleteFilm", deleteFilm);


router.post("/editFilm", editFilm);

router.post("/editFilmProxy", editFilmProxy)
// EXPORTS:
module.exports = router;