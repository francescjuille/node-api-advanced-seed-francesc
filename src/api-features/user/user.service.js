const jwt = require("jsonwebtoken");
var moment = require('moment');  
const bcrypt = require("bcryptjs")
const user = require('../../models').user;

module.exports = {

    async checkLogin(email, password) {
        console.log("email: "+email);
        console.log("password: "+password)
        return new Promise((resolve, reject)=>{
            bcrypt.compare(password, "$2a$10$oNlnC10tt7A9VPRVKZ8FA.4EH/RdSBm1QhpIZ4Ca0V26OupifdJn2", (err,res)=>{
                let response = false;
                if(res){
                    console.log("resS")
                    console.log(res)
                    response = true;
                }
                resolve(response)
            });
        })
    },

    async createNewUser(newUserData) {
        let cryptedPassword = bcrypt.hashSync(newUserData.password,10);
        return new Promise((resolve, reject)=>{
            user.create ({
                name: newUserData.name,
                email: newUserData.email,
                password: cryptedPassword
            }).then(data => resolve(data)).catch(error => resolve(null))
        });
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