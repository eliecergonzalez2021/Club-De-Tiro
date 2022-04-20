const express = require("express");
const {
    getSocios,
    getInstructores,
    postSocios,
    getLogin,
    putSocio,
} = require("../controller/socio.controller");
const { requireAuth } = require("../middlewares/requireAuth");
const router = express.Router();
//GET
router.get("/socio", getSocios);
router.get("/instructor", getInstructores);
router.post("/login", getLogin);
//POST
router.post("/socio", postSocios);
// PRUEBA MIDDLEWARES
router.get('/prueba', requireAuth, (req, res) => {
    res.send('casi')
})
router.put('/editar',putSocio)
module.exports = router;