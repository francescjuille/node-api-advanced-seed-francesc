const jwt = require("jsonwebtoken");
var moment = require('moment');  

module.exports = {

    checkLogin(email, password) {
        console.log("email: "+email);
        console.log("password: "+password)
        return (email=="hola@gmail.com" && password=="root")
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