require('dotenv').config();
const{Pool}=require('pg')
const fs = require('fs')
const path = require('path')

// llamamos por env los datos de la base de datos
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

console.log(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`)

const opt = {connectionString}

if (process.env.DATABASE_URL)
  opt.ssl = {rejectUnauthorized:false}

const pool = new Pool(opt)

// crearmos migrarcion
const migrar = () => {
    const Socio = fs.readFileSync(path.join(__dirname, 'migracion.sql'), {encoding: "utf-8"})
    pool.query(Socio)
    .then(() => console.log('migracion hecha'))
    .catch(console.error)
    .finally(() => pool.end())
}


module.exports={
    migrar,
}