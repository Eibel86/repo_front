// IMPORTS:
const { Router } = require("express");
const { adminDashboard, renderCreateFilm, createFilm } = require("../controllers/admin.controller")
const router = new Router();

//Añadido instalacion de multer 
const multer = require("multer");
const upload = multer({ dest: "uploads/" });





// RUTA: Admin dashboard
//http://localhost:4000/dashboard/admin
router.get("/dashboard", adminDashboard);

// RUTA: Mostrar formulario
//http://localhost:4000/dashboard/admin/createfilm
router.get("/createfilm", renderCreateFilm);

// RUTA: Procesar formulario (se añade después Multer como middleware)
//http://localhost:4000/dashboard/admin/createfilm
router.post("/createfilm", upload.single("image"), createFilm); // Modificado





// EXPORTS:
module.exports = router;