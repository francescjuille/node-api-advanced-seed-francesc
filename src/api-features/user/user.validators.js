const { body } = require('express-validator')

module.exports = {

    validate_login() {
        return [
        body('password', 'password is invalid').exists().notEmpty().escape(),
        body('email', 'Invalid email').exists().isEmail().escape(),
            //body('phone').optional().isInt(),
            //body('status').optional().isIn(['enabled', 'disabled'])
        ]
    },
    validate_newuser() {
        return [
            body('password', 'password is invalid').exists().notEmpty().escape(),
            body('email', 'Invalid email').exists().isEmail().escape(),
            body('name', 'Invalid name').exists().notEmpty().escape(),

        ]
    }

}