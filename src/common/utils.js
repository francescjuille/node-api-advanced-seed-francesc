const { body, validationResult } = require('express-validator');



module.exports = {
    handleErrors(req,res){
        let errorsResponse = [];
        const errors = validationResult(req);
        console.log("VALIDATOR ERRORS:")
        console.log(errors.errors)
        if (errors.errors.length > 0) {
            errorsResponse = errors.errors;
            res.status(400).send({"errors":errorsResponse, "data": null})
            return false;
        }
        return true;
    }
}