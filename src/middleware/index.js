const jwt = require("jsonwebtoken")
var moment = require('moment');  
module.exports = {

    checkToken(req,res,next) {
        if(!req.headers["authorization"]) {
            return res.status(401).send({"error":"invalid token"})
        }
        let token = req.headers["authorization"]
        token = token.replace("Bearer ","")
        try{
            var decoded = jwt.verify(token, 'root'); 
            console.log(decoded)
            if(decoded.expiredAt < moment().unix()){
                return res.status(401).send({"error":"expired token"})
            }
        }
        catch(error) {
            return res.status(401).send({"error":"invalid token"})
        }
        next()
    }

}