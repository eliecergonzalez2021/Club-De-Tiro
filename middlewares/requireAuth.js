const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
    try {
        console.log(req.headers);
        if (!req.headers?.authorization) {
            throw new Error("No existe el token");
        }

        const token = req.headers.authorization.split(" ")[1];
        console.log(
            token
        );

        if (!token) {
            throw new Error("Formato no válido utilizar Bearer");
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.id = payload.id;
        console.log(
            "🚀 ~ file: requireAuth.js ~ line 23 ~ requireAuth ~ req.id",
            req.id
        );
        next();
    } catch (error) {
        if (error.message === "jwt malformed") {
            return res
                .status(401)
                .json({ ok: false, msg: "Formato no válido del Token" });
        }
        if (error.message === "invalid token" || error.message === "jwt expired") {
            return res.status(401).json({ ok: false, msg: "Token no válido" });
        }
        return res.status(401).json({ ok: false, msg: error.message });
    }
};

module.exports = {
    requireAuth,
};