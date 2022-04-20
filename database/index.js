require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

//verificamos que funcione el env
console.log(
    `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
);

// llamamos por env los datos de la base de datos
const connectionString =
    process.env.DATABASE_URL ||
    `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const opt = { connectionString };

if (process.env.DATABASE_URL) opt.ssl = { rejectUnauthorized: false };

const pool = new Pool(opt);
//=====================================================================================================================================================================

//llamamos la tabla socio

const getSocioDB = async() => {
    const client = await pool.connect();

    const query = {
        text: "SELECT rut,nombre,apellidos,email FROM socio",
    };
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            socio: respuesta.rows,
        };
    } catch (error) {
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

//llamamos la tabla instructor

const getInstructorDB = async() => {
    const client = await pool.connect();

    const query = {
        text: "SELECT * FROM Instructor",
    };
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            Instructor: respuesta.rows,
        };
    } catch (error) {
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

//llamamos para el login

const getSocioLoginDB = async(email) => {
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM socio  WHERE email =$1 ",
        values: [email],
    };

    try {
        const respuesta = await client.query(query);

        return {
            ok: true,
            socio: respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: error.message,
            };
        }
    } finally {
        client.release();
    }
};

//añedir POST a socio

const postSocioDB = async(rut, nombre, apellidos, email, hash) => {
    const client = await pool.connect();

    const values = [rut, nombre, apellidos, email, hash];

    const query = {
        text: "INSERT INTO socio (rut,nombre,apellidos,email,password) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        values,
    };
    try {
        const respuesta = await client.query(query);
        const { rut } = respuesta.rows[0];
        console.log(rut);
        return {
            ok: true,
            rut,
            socio: respuesta.rows,
            msg: "se registro socio",
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: "Ya existe el email registrado",
            };
        }
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

// editar socio

const putSocioDB=async (rut,nombre,apellidos,email)=>{
    const client = await pool.connect();
    const values=[nombre,apellidos,email,rut]
    const query =  ( {
        text: "UPDATE socio SET nombre = $1, apellidos = $2, email = $3 WHERE rut = $4 RETURNING *",
        values
    })
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            socio: respuesta,
        };
    } catch (error) {
        console.log(error);
    return {
            ok: false,
            msg: error.message,
        };
    }finally{
        client.release();
    }
}

// crearmos migrarcion

const migrar = () => {
    const Socio = fs.readFileSync(path.join(__dirname, "migracion.sql"), {
        encoding: "utf-8",
    });
    pool
        .query(Socio)
        .then(() => console.log("migracion hecha"))
        .catch(console.error)
        .finally(() => pool.end());
};


module.exports = {
    getSocioDB,
    getInstructorDB,
    getSocioLoginDB,
    postSocioDB,
    putSocioDB,
    migrar,
};