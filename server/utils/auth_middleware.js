const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Get JWT from "bearer <JWT>"
        
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    // Send a 401 status so that axios interceptor logsout and redirects
                    res.status(401).send({message: "JWT expired"})
                } else {
                    res.sendStatus(403);
                }
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