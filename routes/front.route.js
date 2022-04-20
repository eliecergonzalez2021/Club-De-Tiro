const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{

res.render('inicio.hbs')
})

router.get('/registro',(req, res)=>{
    res.render('registrar.hbs')
})

module.exports = router
