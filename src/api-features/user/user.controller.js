const userService = require("./user.service");
const bcrypt = require("bcryptjs")
const { body, validationResult } = require('express-validator');
module.exports = {

     ping(req, res) {
         console.log("body:")
         console.log(req.body)
         return res.send("ping resolved")
     },

     login(req, res) {
        console.log("before sanitize")
        console.log(req.body);
        let errorsResponse = [];
        const errors = validationResult(req);
        console.log("VALIDATOR ERRORS:")
        console.log(errors.errors)
        if (errors.errors.length > 0) {
            errorsResponse = errors.errors;
            return res.status(400).send({"errors":errorsResponse, "data": null})
        }

        email=req.body.email;
        password=req.body.password;
        console.log("body")
        console.log(req.body)
        password= bcrypt.hashSync(password,10);
        loginSuccess=userService.checkLogin(email, password)
        console.log("loginSuccess: "+loginSuccess)
        if (loginSuccess) {
            token = userService.createToken(email)
            return res.status(200).send({"errors":errorsResponse, "data": {"token":token}})
        }
        else {
            errorsResponse = [{"msg":"Error: email or password incorrect"}]
            return res.status(401).send({"errors":errorsResponse, "data": null})
        }
    }

}