const jwt = require('jsonwebtoken'); 

class VerifyToken {

    TokenValidation = (req, res, next) => {
        const token = req.header('auth_token');

        if (!token) return res.status(401).json({ errors: [{
            "location": "body",
            "msg": "Acceso denegado, token inválido",
            "param": "auth_token"
            }]
        });
    
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = payload._id;
    
        next();
    }

}

const verifyToken = new VerifyToken();
module.exports = verifyToken;