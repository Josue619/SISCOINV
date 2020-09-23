const express_validator = require('express-validator');

class VerifyUser {

    UserValidation = (req, res, next) => {
        const errors = express_validator.validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ success: false, errors: errors.array() }).status(422);
        }

        next();
    }

}

const verifyUser = new VerifyUser();
module.exports = verifyUser;