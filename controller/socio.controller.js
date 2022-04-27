const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { getSocioDB, getInstructorDB, postSocioDB, getSocioLoginDB, getSocioUpDB, putSocioDB, deleteSocioDB, getCursoDB,} = require("../database");
//rut.js is d
const { validate, format } = require('rut.js')


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
    console.log("🚀 ~ file: socio.controller.js ~ line 102 ~ getLogin ~  req.body",  req.body)
    
    try {
        // validar que los campos no esten vacio

        if (!email?.trim() || !password?.trim()) {
            console.log("campos vacios");
            throw new Error("campos vacios");
        }

        // ver si email existe en DB
        const respuesta = await getSocioLoginDB(email);
        console.log("🚀 ~ file: socio.controller.js ~ line 114 ~ getLogin ~ respuesta", respuesta)
    

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

        // generar JWT

        const payload = { rut: respuesta.rut };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // llamamos el socio y el token

        console.log(`TOKEN : ${token}`);
        return res.json({ ok: true,token: token });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: error.message });
    }
};

//editar socio 

const putSocio = async (req, res) => {
    const{fecha,curso,rut}=req.body   
    console.log( req.body)

    try {

        // validar campos del body

        if (!fecha?.trim()||!curso?.trim()) {
            console.log("campos vacios");
            throw new Error("campos vacios")
        }

        // ver si rut existe en DB

        const verificador = await getCursoDB(curso);
        const {cursoDB}=verificador
        const id = cursoDB.id

        // put
        
        const respuesta = await putSocioDB(fecha,id,rut)

       res.json({ msg: "se actualizo", ok: respuesta.ok });
    
        
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