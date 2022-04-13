require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

const pool = new Pool(
    process.env.DATABASE_URL && {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
);

const migrate = async () => {
    try {
        const data = fs.readFileSync(__dirname + "/users.sql", {
            encoding: "utf-8",
        });
        await pool.query(data);
        console.log("tabla creada");
    } catch (error) {
        console.log(error);
    }
};

const users = async () => pool.query("SELECT * FROM users;");

module.exports = {
    migrate,
    users,
};