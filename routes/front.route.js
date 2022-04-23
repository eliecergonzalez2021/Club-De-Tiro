const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
res.render('inicio.hbs')
})

//Ruta a REGISTRAR
router.get('/registrar',(req, res)=>{
    res.render('registrar.hbs')
})

//Ruta INICIAR SESIÓN
router.get('/iniciarsesion', (req, res)=>{
    res.render('iniciarsesion.hbs')
})

//Ruta a ADMIN
router.get('/Admin', (req, res)=>{
    res.render('Admin.hbs')
})

//Ruta a USUARIO
router.get('/usuario',(req, res)=>{
    res.render('usuario.hbs')
})

//ruta a INICIAR ADMIN
router.get('/iniciarAdmin', (req, res)=>{
    res.render('iniciarAdmin.hbs')
})



module.exports = router
