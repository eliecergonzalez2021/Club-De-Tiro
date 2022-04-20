const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const {
    getSocioDB,
    getInstructorDB,
    postSocioDB,
    getSocioLoginDB,
    putSocioDB,
} = require("../database");

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

    // ENCRIPTAR LA CONTRASEÑA
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    // insertamos datos
    const respuesta = await postSocioDB(rut, nombre, apellidos, email, hash);

    // crear token
    const payload = {
        rut: respuesta.rut,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log(respuesta);
    res.json({ respuesta, token });
};
// login
const getLogin = async(req, res) => {
    const { email, password } = req.body;

    try {
        // validar que los campos no esten vacio

        if (!email?.trim() || !password?.trim()) {
            console.log("campos vacios");
        }

        // ver si email existe en DB
        const respuesta = await getSocioLoginDB(email);

        const { socio } = respuesta;

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
        return res.json({ ok: true, socio });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: error.message });
    }
};
//editar socio 
const putSocio = async (req, res) => {
    const{rut,nombre,apellidos,email}=req.body
    console.log("🚀 ~ file: socio.controller.js ~ line 89 ~ putSocio ~ req.body", req.body)
     
    // validar campos del body
    if (!rut?.trim()) {
    console.log("campos vacios");
    }
    // ver si email existe en DB
    const verificador = await getSocioLoginDB(email);
    const { socio } = verificador;
    console.log("🚀 ~ file: socio.controller.js ~ line 98 ~ putSocio ~ socio", socio)
    if (!verificador.ok) {
        throw new Error("email incorrecto");
    }
    if (socio.email !== email) {
        throw new Error("No existe el email registrado");
      }
      const respuesta = await putSocioDB(nombre,apellidos,email,rut)
  
      console.log("se actualizo");
      res.json({ msg: "se actualizo", socio: respuesta });

}
module.exports = {
    getSocios,
    getInstructores,
    getLogin,
    postSocios,
    putSocio
};