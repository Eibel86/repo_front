// IMPORTS
const { Router } = require("express");
const { login, backLogin, registry, backRegistry, logout } = require("../controllers/auth.controller")
const { authenticate, redirectByRole, redirectIfAuthenticated } = require("../middlewares/auth.middleware.js");

const router = new Router();




// RUTA: Registro front y back
//http://localhost:4000/registry
router.get("/registry", registry);
router.post("/registry", backRegistry);

// RUTA: Login front y back
//http://localhost:4000/login
router.get("/login", redirectIfAuthenticated, login);
router.post("/login", backLogin);

//RUTA: Logout
router.get("/logout", logout);

// RUTA: redirección por rol
//http://localhost:4000/redirect-by-role
router.get("/redirect-by-role", authenticate, redirectByRole);





// EXPORTS 
module.exports = router;