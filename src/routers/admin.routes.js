// IMPORTS:
const { Router } = require("express");
const { adminDashboard, renderCreateFilm, createFilm } = require("../controllers/admin.controller")
const router = new Router();

router.get("/", [authenticate, authorizeAdmin], adminDashboard);
// RUTA: Mostrar formulario
//http://localhost:4000/dashboard/admin/createfilm
router.get("/createfilm", renderCreateFilm);

// RUTA: Procesar formulario (se añade después Multer como middleware)
//http://localhost:4000/dashboard/admin/createfilm
router.post("/createfilm", createFilm); // Modificado upload.single("image"), 





// EXPORTS:
module.exports = router;