require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes');
const middlewares = require('./middlewares');

const {
    create
} = require("express-handlebars")

const app = express();

const hbs = create({
    extname: "hbs"
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

middlewares.load(app)
routes.load(app)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`puerto activo ヾ(⌐■_■)ノ♪ (☞ﾟヮﾟ)☞  http://localhost:${PORT} 👈(ﾟヮﾟ👈)`))