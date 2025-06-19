// IMPORTS:
const { Router } = require("express");
const { adminDashboard, renderCreateFilm, createFilm } = require("../controllers/admin.controller")
const router = new Router();
// TODO: Añadir multer aquí




// RUTA: Directorio base
//http://localhost:4000/admin
router.get("/", adminDashboard);

// RUTA: Mostrar formulario
//http://localhost:4000/admin/createfilm
router.get("/admin/createfilm", renderCreateFilm);

// RUTA: Procesar formulario (se añade después Multer como middleware
//http://localhost:4000/admin/createfilm
router.post("/admin/createfilm", createFilm);





// EXPORTS:
module.exports = router;