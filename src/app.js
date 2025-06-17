const express = require("express");
require("dotenv").config();
const { filmsRoutes, authRoutes } = require("./routers/index.routes");



const port = process.env.PORT || 4000;

const app = express();

app.set("view engine", "ejs");
console.log(`${__dirname}/views`)
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

// app.use("/dashboard", backRoutes)
app.use("/", authRoutes)


app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})