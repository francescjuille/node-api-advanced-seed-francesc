const userService = require("./user.service");
const bcrypt = require("bcryptjs")
const Utils = require('../../common/utils')
module.exports = {

     ping(req, res) {
         console.log("body:")
         console.log(req.body)
         return res.send("ping resolved")
     },

     async createNewUser(req, res) {
        console.log("createNewUser call")
        console.log(req.body);
        let userCreated = await userService.createNewUser(req.body);
        if (userCreated == null){
            return res.status(400).send({"errors":["invalid email or password"], "data": null})
        }else{
            return res.status(200).send({"errors":[], "data": {"userCreated":userCreated}})
        }
     },

     async login(req, res) {
        console.log("before sanitize")
        console.log(req.body);
        if(!Utils.handleErrors(req,res))return;

        email=req.body.email;
        password=req.body.password;
        console.log("body")
        console.log(req.body)
        //password= bcrypt.hashSync(password,10);
        loginSuccess= await userService.checkLogin(email, password)
        console.log("loginSuccess: "+loginSuccess)
        if (loginSuccess) {
            token = userService.createToken(email)
            return res.status(200).send({"errors":[], "data": {"token":token}})
        }
        else {
            errorsResponse = [{"msg":"Error: email or password incorrect"}]
            return res.status(401).send({"errors":["error"], "data": null})
        }
    },

}