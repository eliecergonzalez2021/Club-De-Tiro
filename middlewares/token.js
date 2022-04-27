const jwt = require("jsonwebtoken");

const parsearToken = (req, res, next) => {
    const secret = process.env.JWT_SECRET
    
    res.login = function(data) {
        const token = jwt.sign(data, secret)
        return this.cookie("token", token)
    }

    res.loginApi = function(data) {
        const token = jwt.sign(data, secret)
        return this.json({ ok: true, token})
    }

    const auth = req.headers.authorization

    const token =  req.cookies.token || auth && auth.split(" ")[1]

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (!err) {
                req.user = decoded
            }
        })
    }

    next()
}

const guardian = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}


module.exports = {parsearToken, guardian}