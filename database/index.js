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

//==== SOCIO =========================================================

//====== GET =========================================================


//llamamos la tabla socio

const getSocioDB = async() => {
    const client = await pool.connect();

    const query = {
        text: "SELECT rut,nombre,apellido,email FROM Socio",
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

//llamamos la tabla curso

const getInstructorDB = async() => {
    const client = await pool.connect();

    const query = {
        text: "SELECT * FROM curso",
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
        const { rut } = respuesta.rows[0];
        return {
            ok: true,
            socio: respuesta.rows[0],
            rut
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

//llamamos al socio con el rut para el editar 

const getSocioUpDB = async (rut)=>{
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM socio  WHERE rut =$1 ",
        values: [rut],
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
}

//llamamos al socio con el rut para el editar 

const getCursoDB = async (curso)=>{
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM curso WHERE curso = $1",
        values: [curso],
    };

    try {
        const respuesta = await client.query(query);

        return {
            ok: true,
            cursoDB: respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

//========= POST =========================================================


//añedir POST a socio

const postSocioDB = async(rut, nombre, apellido, email, hash) => {
    const client = await pool.connect();

    const values = [rut, nombre, apellido, email, hash];

    const query = {
        text: "INSERT INTO socio (rut,nombre,apellido,email,password) VALUES ($1,$2,$3,$4,$5) RETURNING *",
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

//========== PUT =========================================================


// editar socio

const putSocioDB=async (fecha,curso,rut)=>{
    const client = await pool.connect();
    const values=[fecha,curso,rut]
    const query =  ( {
        text: "UPDATE socio SET fecha = $1, curso_fk = $2 WHERE rut = $3 RETURNING *",
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

//======== PRUEBA =========================================================




//==== ADMINN =========================================================

//indentificar email de admi

const getAdminDB= async(email) =>{
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM admi  WHERE email =$1 ",
        values: [email],
    };

    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            admi: respuesta.rows[0],
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
}

//llamamos al socio para mostrar en la tabla administrador ULR:/Admin

const getSocioAdmiDB = async () => {
    return pool.query("SELECT nombre,email,fecha,curso_fk,rut FROM Socio")
    .then(res => res.rows)
  };

//editar fecha y hora en administrador
const putAdmiDB= async (fecha,curso,email) => {
  
    const client = await pool.connect();
    const values=[fecha,curso,email]
    const query =  ( {
        text: "UPDATE socio SET fecha = $1, curso_fk = $2 WHERE email = $3 RETURNING *",
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

//borrar socio

const deleteSocioDB = async (email)=>{
    const client = await pool.connect();

    const query = {
      text: "DELETE FROM socio WHERE email = $1 RETURNING*",
      values: [email],
    };
    try {
      const respuesta = await client.query(query);
  
      return {
        ok: true,
        msg: respuesta,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: error.message,
      };
    } finally {
      client.release();
    }
}

//==== MIGRACION =========================================================

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
    getSocioUpDB,
    getSocioLoginDB,
    getCursoDB,
    postSocioDB,
    putSocioDB,
    deleteSocioDB,
//==ADMIN===========
    getSocioAdmiDB,
    getAdminDB,
    putAdmiDB,
//===MIGRACION======
    migrar,
};