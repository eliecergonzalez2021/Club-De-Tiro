const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { getSocioDB, getInstructorDB, postSocioDB, getSocioLoginDB, getSocioUpDB, putSocioDB, deleteSocioDB,} = require("../database");
//rut.js is d
const { validate, clean, format, getCheckDigit } = require('rut.js')


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

// agregar socio

const postSocios = async(req, res) => {
    const { rut, nombre, apellidos, email, password } = req.body;

    try {

    //validacion de rut 

    const validarRut = validate(rut)
    
    if(validarRut === true){
        console.log('rut valido')
    } 

    if(validarRut !== true){
        throw new Error("rut no valido")
    } 
    // editar el rut 

    const formatoRut = format(rut)

    // ENCRIPTAR LA CONTRASEÑA

    const salt = await bcryptjs.genSalt(10);

    const hash = await bcryptjs.hash(password, salt);

    // insertamos datos

    const respuesta = await postSocioDB(formatoRut, nombre, apellidos, email, hash);
    
    // prueba de token coon rut

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
        return res.json({error:error.message});
    }

};

// login

const getLogin = async(req, res) => {
    const { email, password } = req.body;
    console.log("🚀 ~ file: socio.controller.js ~ line 48 ~ getLogin ~ req.body", req.body)

    try {
        // validar que los campos no esten vacio

        if (!email?.trim() || !password?.trim()) {
            console.log("campos vacios");
        }

        // ver si email existe en DB
        const respuesta = await getSocioLoginDB(email);

        const { socio } = respuesta;
        console.log(socio)

        if (!respuesta.ok) {
            throw new Error("email incorrecto");
        }

        // ver si el password coincide con el pass del DB

        const comparePassword = await bcryptjs.compare(password, socio.password);

        if (!comparePassword) {
            console.log("contraseña incorrecta");
            res.json({ res: "la contraseña incorrecta" });
        }

        // generar JWT

        const payload = { rut: respuesta.rut };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // llamamos el socio y el token
        console.log(socio, token);
        return res.json({ ok: true, socio:socio,token: token });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: error.message });
    }
};

//editar socio 

const putSocio = async (req, res) => {
    const{rut,nombre,apellidos,email}=req.body   
    try {

        // validar campos del body

    if (!rut?.trim()) {
        console.log("campos vacios");
        }

        //validacion de rut 

        const validarRut = validate(rut)

        if(validarRut === true){
            console.log('valido')
        } 

        if(validarRut !== true){
            throw new Error("rut no valido")
        } 
        // editar el rut 

        const formatoRut = format(rut)
        console.log( formatoRut)

        // ver si rut existe en DB
        const verificador = await getSocioUpDB(formatoRut);
        
        console.log( verificador)
    
        if (!verificador.ok) {
            throw new Error("rut incorrecto");
        }
    
        const { socio } = verificador;
    
        if (socio.rut !== formatoRut) {
            throw new Error("No existe el rut registrado");
        }
    
        const respuesta = await putSocioDB(nombre,apellidos,email,formatoRut)

        console.log("🚀", respuesta)
      
       res.json({ msg: "se actualizo", socio: respuesta });
    
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
          ok: false,
          msg: error.message,

        });
    }  
    
};

//elimar socio 

const deleteSocio = async (req, res) => {
    const { rut } = req.body;

    try {
            // validar campos del body

            if (!rut?.trim()) {
                console.log("campos vacios");
            }

            //validacion de rut 

            const validarRut = validate(rut)

            if(validarRut === true){
                console.log('valido')
            } 

            if(validarRut !== true){
                throw new Error("rut no valido")
            } 
            // editar el rut 

            const formatoRut = format(rut)
             
            // ver si rut existe en DB

            const verificador = await getSocioUpDB(formatoRut);

            const { socio } = verificador;

            if (!verificador.ok) {
                throw new Error("rut incorrecto");
            }
            
            if (socio.rut !== formatoRut) {
                throw new Error("No existe el rut registrado");
            }

            const respuesta = await deleteSocioDB(formatoRut);

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
    
};