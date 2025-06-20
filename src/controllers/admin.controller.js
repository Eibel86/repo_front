// IMPORTS
const { apiFetch } = require("../utils/apiFetch");


// ADMIN CONTROLLERS:
// CONTROLADOR: admin/films (dashboard)  ---------------------------------------------- // 
/* 
    -> Incluye botón de eliminar y editar (en las cards)
    -> Incluye botón de crear película
*/
const adminDashboard = async (req, res) => {
    res.status(200).render("admin/adminDashboard")
}





// CONTROLADOR: admin/createfilm ----------------------------------------------------- // 
// CONTROLADOR: renderizar vista de creación de películas.
const renderCreateFilm = async (req, res) => {
    res.status(200).render("createFilm");
};

// CONTROLADOR: procesa el formulario de creación de películas.
const createFilm = async (req, res) => {
    // console.log("Datos recibidos:", req.body);
    // console.log("Archivo recibido:", req.file);

    // De momento redirige al home o renderiza mensaje simple
    res.send("Película recibida (lógica aún por implementar)");
};







// EXPORTS
module.exports = {
    adminDashboard,
    renderCreateFilm,
    createFilm
}