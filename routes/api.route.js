const express = require("express");
const {
    getSocios,
    getInstructores,
    getLogin,
    postSocios,
    putSocio,
    deleteSocio,
    getSocioadmi,
    getadmin,
    putAdmin
} = require("../controller/socio.controller");
const { requireAuth } = require("../middlewares/requireAuth");
const router = express.Router();

//============ GET ===============

router.get("/ejemplo", (req, res) => {
    res.send(req.user.rut)
})
router.get("/socio", getSocios);

router.get("/instructor", getInstructores);

router.get("/leer",getSocioadmi)

//======== POST ==============

router.post("/iniciarsesion", getLogin);

router.post("/registrar", postSocios);

//======== PUT ==============

router.put('/usuario',putSocio);



// PRUEBAS

router.get('/prueba',requireAuth,(res,req)=>{
    res.send('listo')
});

//=========ADMIN===============

router.post('/inciarAdmin',getadmin)

router.put('/editarAdmin',putAdmin)

router.delete('/eliminar',deleteSocio)

module.exports = router;