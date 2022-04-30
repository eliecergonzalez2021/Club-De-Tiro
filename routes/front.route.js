const {Router} = require('express');
const { getSocioAdmiDB } = require('../database');
const router = Router();
//=====================================================//

//Inicio
router.get('/', (req, res)=>{
res.render('inicio.hbs')
})

//REGISTRAR
router.get('/registrar',(req, res)=>{
    res.render('registrar.hbs')
})

//INICIAR SESIÓN
router.get('/iniciarsesion', (req, res)=>{
    res.render('iniciarsesion.hbs')
})

//USUARIO
router.get('/usuario',(req, res)=>{
    res.render('usuario.hbs')
})

//EDITAR USUARIO
router.get('/editarUsuario',(req, res)=>{
    res.render('editarUsuario.hbs')
})

// PERFIL USUARIO  === Esto lo saque del codigo del mixzio
router.get('/perfilusuario', (req, res)=>{
    const user = {rut:"12.123.123-4",nombre:"Mixzio Gonzalez", email:"m@gonzalez.cl",curso:"aprendiz",}
    res.render('perfilusuario.hbs', {...user})
})

//======================================= 

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

router.get('/AdmiEditar', (req, res)=>{
    res.render('adminEditar.hbs')
})

// ELIMINAR SOCIO ADMIN
router.get('/eliminarSocio', (req, res)=>{
    res.render('AdminEliminar.hbs')
})

module.exports = router
