// IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const setUser = require("./middlewares/user.middleware");
require("dotenv").config();


const { filmsRoutes, authRoutes, dashboardRoutes } = require("./routers/index.routes");


const app = express();
const port = process.env.PORT || 4000;



// MIDDLEWARES GLOBALES
app.use(cookieParser());
// 💡 Middleware para que todas las vistas tengan acceso a las cookies
app.use((req, res, next) => {
    res.locals.cookies = req.cookies;
    next();
});



app.use(setUser);
app.use(express.urlencoded({ extended: true })); // Middleware para parsear body
app.use(express.json());


// CONFIGURACIÓN DE VISTAS (EJS)
app.set("view engine", "ejs");
console.log(__dirname + '/views') //Comprobación de ruta
app.set("views", `${__dirname}/views`);


// CARPETA ESTÁTICA (archivos estáticos desde la carpeta public)
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.originalUrl}`);
    next();
});

// RUTAS 
app.use("/", authRoutes)
app.use("/admin", dashboardRoutes)
app.use("/films", filmsRoutes)




// LEVANTAR SERVIDORR
app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})