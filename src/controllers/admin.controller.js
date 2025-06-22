
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

    try {
        const result = await apiFetch(endpoint, "GET", { "Authorization": `Bearer ${req.cookies.token}` })
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }
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
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }
        res.redirect("dashboard");
    } catch (error) {
        console.log(error)
        res.send("error")
    }
}




// CONTROLADOR: admin/createfilm ----------------------------------------------------- // 
// CONTROLADOR: renderizar vista de creación de películas. /GET
// El formulario manda los datos por POST a la ruta admin/createfilm con el controlador createFilm

const renderCreateFilm = async (req, res) => {
    res.render("admin/adminCreateFilm", { errores: [] });
};


// RUTA BACK: http://localhost:5000/api/v1/createfilm
// CONTROLADOR: procesa el formulario de creación de películas.
const createFilm = async (req, res) => {

    const endpoint = process.env.URL_BASE_BACK + "/api/v1/createfilm"

    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: { ...req.headers, "Authorization": `Bearer ${req.cookies.token}` },
            body: req,
            duplex: 'half'
        });

        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }

        if (result.ok) {
            res.redirect("dashboard"); //Redirigir al adminDashboard

        } else {
            const data = await result.json();
            const errores = Object.values(data.errores).map(err => err.msg);
            console.log(errores)
            res.render("admin/adminCreateFilm", { errores });
            //gestiono la 
            /*
            res.render(formulario de crear la película) mandandole el resultado con losw mensajes de error
            */
        }


    } catch (error) {
        console.log(error)
        res.redirect("dashboard");
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
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }
        res.render("admin/adminEditFilm", {
            film: result.data,
            errores: []
        });
    } catch (error) {
        console.log(error)
        res.redirect("dashboard");
    }


}


const editFilmProxy = async (req, res) => {
    const endpoint = process.env.URL_BASE_BACK + "/api/v1/updatefilm"

    //todo: obtener de la cookie el token y añadirselo al header
    //despues actualizar el token de la cookie con la respuesta
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: { ...req.headers, "Authorization": `Bearer ${req.cookies.token}` },
            body: req,
            duplex: 'half'
        });

        if (result.ok) {
            console.log({ result })
            res.redirect("dashboard"); //Redirigir al adminDashboard

        } else {
            const data = await result.json()
            console.log({ data })
            const result = await apiFetch(
                endpoint,
                "GET",
                { "Authorization": `Bearer ${req.cookies.token}` })
            const errores = Object.values(data.errores).map(err => err.msg);
            res.render("admin/adminEditFilm", {
                film: result.data,
                errores
            });
        }


    } catch (error) {
        console.log(error)
        res.redirect("dashboard");
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