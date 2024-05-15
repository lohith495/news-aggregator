const jwt = require('jsonwebtoken');
// const User = require('../model/user');

const verifyToken = (req, res, next) => {
    if(req.headers && req.headers.authorization){
        jwt.verify(req.headers.authorization, process.env.API_SECRET, function(err, decoded) {
            if(err){
                req.email = undefined;
                // req.message = "Header verification failed";
                res.status(403).json("Header verification failed");
                next();
            }
            else{
                req.email = decoded.email;
                // req.message = "Token validation successful";
                // res.status(200).json("Token validation successful");
                next();
            }
        });
    }
    else{
        req.email = undefined;
        // req.message = "Authorization header not found";
        res.status(401).json("Authorization header not found");
        next();
    }
}
module.exports = verifyToken;