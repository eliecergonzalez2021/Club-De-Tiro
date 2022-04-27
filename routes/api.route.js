const express = require("express");
const {
    getSocios,
    getInstructores,
    getLogin,
    postSocios,
    putSocio,
    deleteSocio
} = require("../controller/socio.controller");
const { requireAuth } = require("../middlewares/requireAuth");
const router = express.Router();

//GET

router.get("/socio", getSocios);

router.get("/instructor", getInstructores);

//POST

router.post("/iniciarsesion", getLogin);

router.post("/registrar", postSocios);


// PRUEBAS

router.put('/usuario',putSocio);

router.get('/prueba',requireAuth,(res,req)=>{
    res.send('listo')
});

router.delete('/delete',deleteSocio)

module.exports = router;