const jwt = require("jsonwebtoken");
var moment = require('moment');  

module.exports = {

    checkLogin(email, password) {
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