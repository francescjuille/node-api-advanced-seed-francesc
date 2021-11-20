const jwt = require("jsonwebtoken");
var moment = require('moment');  
const bcrypt = require("bcryptjs")
const user = require('../../models').user;

module.exports = {

    async checkLogin(email, password) {
        console.log("email: "+email);
        console.log("password: "+password)

        let userMatch = await user.findAll({
            where: {
                email: email
            }
          });
        return new Promise((resolve, reject)=>{
            console.log("userMatch:")
            console.log(userMatch[0])
            if(userMatch.length === 0)resolve(false);
            bcrypt.compare(password, userMatch[0]["dataValues"]["password"], (err,res)=>{
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
        let userMatch = await user.findAll({
            where: {
                email: newUserData.email
            }
          });
        if (userMatch.length > 0) {
            return null;
        }
        
        let cryptedPassword = bcrypt.hashSync(newUserData.password,10);
        let userCreated = await user.create ({
            name: newUserData.name,
            email: newUserData.email,
            password: cryptedPassword
        });
        return userCreated;
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