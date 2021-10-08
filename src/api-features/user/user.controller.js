const userService = require("./user.service");
const bcrypt = require("bcryptjs")
module.exports = {

     ping(req, res) {
         return res.send("ping resolved")
     },

     login(req, res) {
        console.log(req.body);
        email=req.body.email;
        password=req.body.password;
        password= bcrypt.hashSync(password,10);
        loginSuccess=userService.checkLogin(email, password)
        if(loginSuccess){
            token = userService.createToken(email)
            res.send({"token":token})
        }
        else{
            return res.sendStatus(401)
        }
        return res.send("login call")
    }

}