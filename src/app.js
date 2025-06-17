const express = require("express");
require("dotenv").config();
const { filmsRoutes, authRoutes, dashboardRoutes } = require("./routers/index.routes");



const port = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
console.log(`${__dirname}/views`)
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));


app.use("/", authRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/films", filmsRoutes)


app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})