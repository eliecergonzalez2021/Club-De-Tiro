const {Router} = require('express');
const { prueba } = require('../controller/socio.controller');
const { getSocioAdmiDB } = require('../database');
const router = Router();

//=========SOCIO===================================

//Inicio
router.get('/', (req, res)=>{
res.render('inicio.hbs')
})

//REGISTRAR
router.get('/registrar',(req, res)=>{
    res.render('registrar.hbs')
})

//INICIAR SESIÓN
router.get('/iniciarSesion', (req, res)=>{
    res.render('iniciarsesion.hbs')
})

//USUARIO
router.get('/usuario',(req, res)=>{
    res.render('usuario.hbs')
})

// PARA AGREGAR FECHA Y HORA
router.get('/editarsocio',(req, res)=>{
    res.render('editarsocio.hbs')
})

//=========ADMIN============================== 

// INICIAR ADMIN
router.get('/iniciarAdmin', (req, res)=>{
    res.render('iniciarAdmin.hbs')
})

// ADMIN
router.get('/Admin', async (req, res)=>{
    const rows = await getSocioAdmiDB()
    res.render('Admin.hbs',{rows})
})

// EDITAR PERFIL ADMIN

router.get('/AdminEditar', (req, res)=>{
    res.render('adminEditar.hbs')
})

// ELIMINAR SOCIO ADMIN
router.get('/eliminarSocio', (req, res)=>{
    res.render('AdminEliminar.hbs')
})

//===========prueba============================

// PERFIL USUARIO

router.get('/perfilusuario', (req, res)=>{
    const user = {rut:"12.123.123-4",nombre:"mixzio", email:"m@gonzalez.cl",curso:"aprendiz",}
    res.render('perfilusuario.hbs', {...user})
})

router.get('/editarperfil',(req, res)=>{
    res.render('editarSocio.hbs')
})

router.get("/CerrarSesion",(req, res )=>{
    res.render('CerrarSesion.hbs')
})
router.get("/registradoConExito",(req, res )=>{
    res.render('registradoConExito.hbs')
})
router.get("/agendadoConExito",(req, res )=>{
    res.render('agendadoConExito.hbs')
})

module.exports = router
