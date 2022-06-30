const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Get JWT from "bearer <JWT>"
        
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(`403 - ${err.message}`));
            }
            req.user = user;
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    authenticateJWT
}