// IMPORTS
const { apiFetch } = require("../utils/apiFetch");


// ADMIN CONTROLLERS:
// CONTROLADOR: admin/films (dashboard)  ---------------------------------------------- // 
/* 
    -> Incluye botón de eliminar y editar (en las cards)
    -> Incluye botón de crear película
*/
const adminDashboard = async (req, res) => {
    console.log('entraen admin dashboard')
    const endpoint = process.env.URL_BASE_BACK + "api/v1/allfilms"

    //TODO: recoger token de kookies
    try {
        //TODO: Pasar token en el header de la consulta
        const result = await apiFetch(endpoint, "GET", {/*header */})
        // console.log(result)
        res.render("admin/adminDashboard",{
            ...result
        })
        
    } catch (error) {
        res.send('error')
    }
    
}
//ruta que elimina
const deleteFilm=async(req,res)=>{

}

//ruta qeu muestra mensaje de confirmación

//vista editar pelicula GET (formulario) recoger los datos de la pelicula por su id

//ruta post que envia los datos del formujlario a la api updateFilm





// CONTROLADOR: admin/createfilm ----------------------------------------------------- // 
// CONTROLADOR: renderizar vista de creación de películas. /GET
// El formulario manda los datos por POST a la ruta admin/createfilm con el controlador createFilm

const renderCreateFilm = async (req, res) => {
    res.render("admin/adminCreateFilm");
};


// RUTA BACK: http://localhost:5000/api/v1/createfilm
// CONTROLADOR: procesa el formulario de creación de películas.
const createFilm = async (req, res) => {

    const endpoint = process.env.URL_BASE_BACK + "api/v1/createfilm"
 
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

        if(result.ok){
             res.redirect("dashboard"); //Redirigir al adminDashboard

        }else{
            
            //gestiono la 
            /*
            res.render(formulario de crear la película) mandandole el resultado con losw mensajes de error
            */
        }
        
        
    } catch (error) {
        console.log(error)
         res.redirect("admin/adminError"); //Redirige al adminError
    }
};

// GET ALL FILMS




// EXPORTS
module.exports = {
    adminDashboard,
    renderCreateFilm,
    createFilm,
}