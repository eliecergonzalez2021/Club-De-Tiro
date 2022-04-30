const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { getSocioDB, getInstructorDB, postSocioDB, getSocioLoginDB, getSocioUpDB, putSocioDB, deleteSocioDB, getCursoDB, getSocioAdmiDB, getAdminDB, putAdmiDB,} = require("../database");

//rut.js 

const { validate, format } = require('rut.js');
const { resetWatchers } = require("nodemon/lib/monitor/watch");


// leer tabla socio

const getSocios = async(_, res) => {
    const respuesta = await getSocioDB();
    console.log(respuesta);
    res.json({ respuesta });
};

// leer tabla instructor

const getInstructores = async(_, res) => {
    const respuesta = await getInstructorDB();
    console.log(respuesta);
    res.json({ respuesta });
};

// registrar socio 🟢

const postSocios = async(req, res) => {
    const { rut, nombre, apellido, email, password,password2,email2,experiencia } = req.body;
    console.log("🚀 ~ file: socio.controller.js ~ line 29 ~ postSocios ~ req.body", req.body)
    
    try {

    // validacion espacio en blanco
    if (!nombre?.trim() || !apellido?.trim() || !password?.trim() || !password2?.trim() || !email?.trim()|| !email2?.trim()|| !rut?.trim()|| !experiencia?.trim() ) {
        console.log("campos vacios")
        throw new Error("campos vacios");
        
    }
    // VALIDACION CONTRASEÑA

    if(password !== password2){
        console.log('contraseña no son iguales')
        throw new Error("contraseña no son iguales");
    }

    //validacion de rut 

    const validarRut = validate(rut)

    if(validarRut !== true){
        console.log('rut no valido')
        throw new Error("rut no valido")
    } 
    // editar el rut 

    const formatoRut = format(rut)

    // validacion email
    if(email !== email2){
        console.log('los email no coinciden')
        throw new Error("los email no coinciden")
    }


    // ENCRIPTAR LA CONTRASEÑA

    const salt = await bcryptjs.genSalt(10);

    const hash = await bcryptjs.hash(password, salt);

    // insertamos datos

    const respuesta = await postSocioDB(formatoRut, nombre, apellido, email, hash);
    

    // crear token

    const payload = {
        rut: respuesta.rut,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log(respuesta);

    res.json({ 
        actualizar:respuesta.ok,
        token:token, 
    }); 

    } catch (error) {
        // error de validacion de rut
        res.json ({ msg: error.message});
    }

};

// login 🟢

const getLogin = async(req, res) => {
    const { email, password } = req.body;
    
    try {
        // validar que los campos no esten vacio

        if (!email?.trim() || !password?.trim()) {
            console.log("campos vacios");
            throw new Error("campos vacios");
        }

        // ver si email existe en DB
        const respuesta = await getSocioLoginDB(email);
    

        const { socio } = respuesta;
  
        if (!respuesta.ok) {
            console.log('email incorrecto')
            throw new Error("email incorrecto");
        }

        // ver si el password coincide con el pass del DB

        const comparePassword = await bcryptjs.compare(password, socio.password);

        if (!comparePassword) {
            console.log("contraseña incorrecta");
            throw new Error({ res: "la contraseña incorrecta" });
        }

        const payload = { rut: respuesta.rut };
    

        // llamamos el socio y el token

        res.login(payload);
        return res.loginApi(payload);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: error.message });
    }
};

//editar socio agregar fecha y curso 🟢

const putSocio = async (req, res) => {
    const{fecha,curso}=req.body   

    const rut = req.user.rut

    try {

        // validar campos del body

        if (!fecha?.trim()||!curso?.trim()) {

            console.log("campos vacios");

            throw new Error("campos vacios")

        }

        // ver cereficar curso

        const verificador = await getCursoDB(curso);
        
        //sacamos el id

        const {cursoDB}=verificador
        
        // put
        
        const respuesta = await putSocioDB(fecha,cursoDB.curso,rut)

        res.json({ msg: "se actualizo", ok: respuesta.ok });
     
    } catch (error) {

        return res.status(400).json({
          ok: false,
          msg: error.message,

        });
    }  
    
};


//=========ADMIN=============================

//llamamos al admin para el login🟢

const getadmin = async (req, res) => {
    const { email, password } = req.body;
    console.log("🚀 ~ file: socio.controller.js ~ line 251 ~ getadmin ~  req.body",  req.body)
    
    try {

        // validar que los campos no esten vacio

        if (!email?.trim() || !password?.trim()) {
            console.log("campos vacios");
            throw new Error("campos vacios");
        }

        // ver si email existe en DB
        const respuesta = await getAdminDB(email);
    

        const { admi } = respuesta;
        console.log("🚀 ~ file: socio.controller.js ~ line 267 ~ getadmin ~ admi", admi)
  
        if (!respuesta.ok) {
            console.log('email incorrecto')
            throw new Error("email incorrecto");
        }

        // ver si el password coincide con el pass del DB

        const comparePassword = await bcryptjs.compare(password, admi.password);

        if (!comparePassword) {
            console.log("contraseña incorrecta");
            throw new Error({ res: "la contraseña incorrecta" });
        }
/* 
        const payload = { rut: respuesta.rut };
    

        // llamamos el socio y el token

        res.login(payload);
        return res.loginApi(payload); */

        res.json({admi:admi.email})

    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: error.message });
    }
}

// leer tabla socio para admi🟢

const getSocioadmi = async (req, res) => {
    
    const p = await getSocioAdmiDB()
    

    try {
        (rows => res.json({ok: true, socio: rows}))
    } catch (error) {
        (error => res.json({ok: false, msg: error})) 
    }

    
};

// actualizar fecha y curso 🟢
const putAdmin = async (req, res) => {
    const{fecha,curso,email,email2}=req.body;
    console.log( fecha,curso,email,email2)
    

    try {

        // validar campos del body

        if (!fecha?.trim()||!curso?.trim()) {

            console.log("campos vacios");

            throw new Error("campos vacios")

        }

        if(email !== email2){
            console.log("los email no coinciden")
            throw new Error("los email no coinciden")
        }

        const SocioEmail = await getSocioLoginDB(email);
    
        if (!SocioEmail.ok) {

            console.log('email incorrecto')

            throw new Error("email incorrecto");
        }

        const { socio } = SocioEmail;

       //llamamos al curso

        const Cursoso = await getCursoDB(curso);
        const{cursoDB}=Cursoso;


        
        // put
        
        const respuesta = await  putAdmiDB(fecha,cursoDB.curso,socio.email)

       

        return res.json({ msg: "se actualizo", ok: respuesta.ok });
     
    } catch (error) {

        return res.status(400).json({
          ok: false,
          msg: error.message,

        });
    }  
    
};

//elimar socio 

const deleteSocio = async (req, res) => {
    const { email,email2 } = req.body;

    try {
            // validar campos del body

            if (!email?.trim()||!email2?.trim()) {
                console.log("campos vacios");
            }

            //email
            if(email !== email2){
                throw new Error("email no coinciden")
            } 

            // ver si rut existe en DB

            const verificador = await getSocioLoginDB(email);

            const { socio } = verificador;
           
            if (!verificador.ok) {
                throw new Error("email incorrecto");
            }
            
            const respuesta = await deleteSocioDB(email);

            res.json({ delete: "se elimino correctamente", msg: respuesta.ok });

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                ok: false,
                msg: error.message,
            });
        }
}



module.exports = {
    
    getSocios,
    getInstructores,
    getLogin,
    postSocios,
    putSocio,
    deleteSocio,
//=== ADMIN =====
    getSocioadmi,
    getadmin,
    putAdmin,

    
};