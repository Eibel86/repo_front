const { Router } = require("express");
const { dashboard } = require("../controllers/dashboard.controller")
const router = new Router();

router.get("/", dashboard);


module.exports = router;