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
    res.status(200).render("admin/adminCreateFilm");
};


// RUTA BACK: http://localhost:5000/api/v1/createfilm
// CONTROLADOR: procesa el formulario de creación de películas.
const createFilm = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "api/v1/createfilm"
    console.log(req.body.full_title)
    console.log("Datos recibidos:", req.body);
    console.log("Archivo recibido:", req.file);
    //todo: obtener de la cookie el token y añadirselo al header
    //despues actualizar el token de la cookie con la respuesta
    try {
        // Comprobaciones en consola
            console.log("Datos recibidos:", req.body);
            console.log("Archivo recibido:", req.file);
        const result = await apiFetch(endpoint, "POST", {},  { 
            full_title : req.body.full_title,
            director_name : req.body.director_name,
            genre_name : req.body.genre_name,
            release_date : req.body.release_date,
            duration : req.body.duration,
            image: req.body.image,
            synopsis : req.body.synopsis
        })
        
        return res.render("admin/adminDashboard"); //Redirigir al adminDashboard

    } catch (error) {
        console.log(error)
        return res.render("admin/adminError"); //Redirige al adminError
    }
};

// GET ALL FILMS
const renderAllFilms = async (req, res) => {
    try{
        

         res.render("admin/adminDashboard",{

         });

    }catch{

    }

   
};




// EXPORTS
module.exports = {
    adminDashboard,
    renderCreateFilm,
    createFilm
}