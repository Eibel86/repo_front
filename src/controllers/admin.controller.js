
const cookieParser = require("cookie-parser");
const { apiFetch } = require("../utils/apiFetch");
// ADMIN CONTROLLERS:
// CONTROLADOR: admin/films (dashboard)  ---------------------------------------------- // 
/* 
    -> Incluye botón de eliminar y editar (en las cards)
    -> Incluye botón de crear película
*/
const adminDashboard = async (req, res) => {

    console.log('entraen admin dashboard')
    const endpoint = process.env.URL_BASE_BACK + "/api/v1/allfilms"

    //TODO: recoger token de kookies
    try {
        //TODO: Pasar token en el header de la consulta
        const result = await apiFetch(endpoint, "GET", {/*header */ })
        // console.log(result)
        res.render("admin/adminDashboard", {
            films: result.data,
            backendUrl: process.env.URL_BASE_BACK,
            showFavouriteButton: false,
            showDeleteButton: true,
            showEditButton: true
        })

    } catch (error) {
        console.log(error)
        res.send('error')
    }
}
//ruta qeu muestra mensaje de confirmación

//vista editar pelicula GET (formulario) recoger los datos de la pelicula por su id

//ruta post que envia los datos del formujlario a la api updateFilm
//ruta que elimina
const deleteFilm = async (req, res) => {
    try {
        const endpoint = process.env.URL_BASE_BACK + `/api/v1/deleteFilm/${req.body.filmId}`
        const result = await apiFetch(
            endpoint,
            "DELETE",
            { "Authorization": `Bearer ${req.cookies.token}` })

        res.send("delete film")
    } catch (error) {
        console.log(error)
        res.send("error")
    }
}




// CONTROLADOR: admin/createfilm ----------------------------------------------------- // 
// CONTROLADOR: renderizar vista de creación de películas. /GET
// El formulario manda los datos por POST a la ruta admin/createfilm con el controlador createFilm

const renderCreateFilm = async (req, res) => {
    res.render("admin/adminCreateFilm");
};


// RUTA BACK: http://localhost:5000/api/v1/createfilm
// CONTROLADOR: procesa el formulario de creación de películas.
const createFilm = async (req, res) => {

    const endpoint = process.env.URL_BASE_BACK + "/api/v1/createfilm"

    //todo: obtener de la cookie el token y añadirselo al header
    //despues actualizar el token de la cookie con la respuesta
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: req.headers,
            body: req,
            duplex: 'half'
        });

        if (result.ok) {
            res.redirect("dashboard"); //Redirigir al adminDashboard

        } else {

            //gestiono la 
            /*
            res.render(formulario de crear la película) mandandole el resultado con losw mensajes de error
            */
        }


    } catch (error) {
        console.log(error)
        res.redirect("admin/adminError"); //Redirige al adminError
    }

}

const editFilm = async (req, res) => {
    try {
        const filmId = req.body.filmId;
        const endpoint = process.env.URL_BASE_BACK + `/api/v1/film/searching/${filmId}`;
        const result = await apiFetch(
            endpoint,
            "GET",
            { "Authorization": `Bearer ${req.cookies.token}` })
        console.log(result);
        res.render("admin/adminEditFilm", {
            film: result.data
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }


}


const editFilmProxy = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "/api/v1/updatefilm"

    //todo: obtener de la cookie el token y añadirselo al header
    //despues actualizar el token de la cookie con la respuesta
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: req.headers,
            body: req,
            duplex: 'half'
        });

        if (result.ok) {
            console.log({ result })
            res.redirect("dashboard"); //Redirigir al adminDashboard

        } else {
            console.log("ssssssssssssssssssssss")
            const data = await result.json()
            console.log({ data })
            res.send(data)
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

// EXPORTS
module.exports = {
    adminDashboard,
    renderCreateFilm,
    createFilm,
    deleteFilm,
    editFilm,
    editFilmProxy
}