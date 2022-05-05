const jwt = require("jsonwebtoken");

const parsearToken = (req, res, next) => {
	const secret = process.env.JWT_SECRET;

	res.login = function (data) {
		const token = jwt.sign(data, secret/* , { expiresIn:60 * 2 } */);
		return this.cookie("token", token);
	};

	res.loginApi = function (data) {
		const token = jwt.sign(data, secret/* , { expiresIn:60 * 2  } */);
		return this.json({ ok: true, token }).status(200);
	};

	const auth = req.headers.authorization
	const token =  req.cookies.token || auth && auth.split(" ")[1]


	if (token) {
		jwt.verify(token, secret, (err, decoded) => {
			if (!err) {
				req.user = decoded;
			}
		});
	}

	next();
};

const guardianSocio = (req, res, next) => {
	req.user ? next() : res.render("errorSocio.hbs");
};

const guardianAdmin = (req, res, next) => {
	req.user ? next() : res.render("errorAdmi.hbs");
};

module.exports = { parsearToken, guardianSocio, guardianAdmin };
