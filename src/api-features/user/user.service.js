const jwt = require("jsonwebtoken");
var moment = require('moment');  
const bcrypt = require("bcryptjs")

module.exports = {

    checkLogin(email, password) {
        console.log("email: "+email);
        console.log("password: "+password)
        bcrypt.compare(password, "$2a$10$8vES.Ym0CdWYv9MYnpJLKeWoKouO5Nj2c3o91cpsWvc7znRx0OPjW", (err,res)=>{
            if(res){
                console.log("resS")
                console.log(res)
                return true;
            }
        })
        return false;
    },

    createToken(email, idUser) {
        const userInfo = {
            email: email,
            id: idUser,
            createdAt: moment().unix(),
            expiredAt: moment().add(30,'days')
        }
        const newUserToken = jwt.sign(userInfo,"root");
        return newUserToken;
    }
}