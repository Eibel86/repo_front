// IMPORTS

/**
 * Importa el framework Express para crear aplicaciones y servidores HTTP.
 */
const express = require("express");

/**
 * Middleware de Express para parsear las cookies de las solicitudes entrantes
 * y exponerlas en `req.cookies`.
 */
const cookieParser = require("cookie-parser");

/**
 * Importa el middleware que extrae y establece los datos del usuario
 * (ID y rol) desde las cookies en `req.user` y `res.locals.user`.
 */
const setUser = require("./middlewares/user.middleware");

/**
 * Carga las variables de entorno definidas en el archivo `.env`
 * para que estén disponibles en `process.env`.
 */
require("dotenv").config();

/**
 * Importa los módulos de rutas para películas, autenticación y panel de administración.
 */
const { filmsRoutes, authRoutes, dashboardRoutes } = require("./routers/index.routes");
/**
 * Crea una instancia de la aplicación Express para configurar el servidor y rutas.
 */
const app = express();

/**
 * Define el puerto en el que la aplicación escuchará las peticiones.
 * Usa la variable de entorno PORT o, si no está definida, el puerto 4000 por defecto.
 */
const port = process.env.PORT || 4000;



// MIDDLEWARES GLOBALES
/**
 * Usa el middleware cookieParser para parsear cookies en las solicitudes entrantes
 * y exponerlas en `req.cookies`.
 */
app.use(cookieParser());

// 💡 Middleware para que todas las vistas tengan acceso a las cookies
/**
 * Middleware que expone todas las cookies en `res.locals.cookies`,
 * permitiendo su acceso directo desde las vistas (por ejemplo, en EJS).
 */
app.use((req, res, next) => {
    res.locals.cookies = req.cookies;
    next();
});

/**
 * Middleware personalizado que establece la información del usuario
 * en `req.user` y `res.locals.user` a partir de las cookies.
 */
app.use(setUser);

/**
 * Middleware para parsear datos del cuerpo de la solicitud (formulario HTML).
 * `extended: true` permite analizar objetos anidados.
 */
app.use(express.urlencoded({ extended: true })); // Middleware para parsear body

/**
 * Middleware que permite a la aplicación recibir y procesar cuerpos de solicitudes en formato JSON.
 */
app.use(express.json());


// CONFIGURACIÓN DE VISTAS (EJS)
/**
 * Configura EJS como el motor de plantillas para renderizar vistas en el servidor.
 */
app.set("view engine", "ejs");


// console.log(__dirname + '/views') //Comprobación de ruta

/**
 * Establece el directorio donde se encuentran las vistas EJS de la aplicación.
 */
app.set("views", `${__dirname}/views`);


// CARPETA ESTÁTICA (archivos estáticos desde la carpeta public)
/**
 * Sirve archivos estáticos (CSS, JS, imágenes, etc.) desde el directorio "public".
 */
app.use(express.static(`${__dirname}/public`));

/**
 * Middleware de logging que muestra en consola cada solicitud entrante
 * con su método HTTP y URL original.
 */
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.originalUrl}`);
    next();
});

// RUTAS 
/**
 * Monta las rutas de autenticación en la raíz del sitio ("/").
 * Incluye login, logout, registro y redirección por rol.
 */
app.use("/", authRoutes)

/**
 * Monta las rutas del panel de administración bajo la ruta base "/admin".
 */
app.use("/admin", dashboardRoutes)

/**
 * Monta las rutas relacionadas con películas bajo la ruta base "/films".
 */
app.use("/films", filmsRoutes)




// LEVANTAR SERVIDORR
/**
 * Inicia el servidor Express en el puerto especificado
 * y muestra un mensaje en consola cuando está listo.
 */
app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})