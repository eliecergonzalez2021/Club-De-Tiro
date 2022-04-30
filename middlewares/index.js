const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const { requireAuth } = require("./requireAuth");
const cookieParser = require("cookie-parser");
const { parsearToken, guardian } = require("./token");

exports.load = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		fileUpload({
			limits: { fileSize: 5000000 },
			abortOnline: true,
			responseOnLimit: "el peso del archivo supera el limited permitido ",
		})
	);
	app.use(cookieParser());
	app.use(parsearToken);

	app.use(express.static(path.join(__dirname, "../public")));
	app.use(
		express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
	);

	app.use(["/api/v1/usuario", "/usuario", '/perfilusuario'], guardian);
};
