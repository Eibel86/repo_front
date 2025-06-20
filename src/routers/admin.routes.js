// IMPORTS:
const { Router } = require("express");
const { adminDashboard, renderCreateFilm, createFilm } = require("../controllers/admin.controller")
const router = new Router();
const { authenticate, authorizeAdmin } = require("../middlewares/auth.middleware.js");
// TODO: Añadir multer aquí




// RUTA: Directorio base
//http://localhost:4000/admin
router.get("/", [authenticate, authorizeAdmin], adminDashboard);

// RUTA: Mostrar formulario
//http://localhost:4000/admin/createfilm
router.get("/admin/createfilm", renderCreateFilm);

// RUTA: Procesar formulario (se añade después Multer como middleware
//http://localhost:4000/admin/createfilm
router.post("/admin/createfilm", createFilm);





// EXPORTS:
module.exports = router;