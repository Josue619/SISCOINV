const db = require('../config/database');
const UserBD = require('../database/UserDB');
const RoleDB = require('../database/RoleDB');
const UserDB = require('../database/UserDB');

class AuthController {

    getUsers = async (req, res) => {
        const data = await UserDB.findAll({ include: [RoleDB] });

        if (data.length > 0) {
            return res.json({ success: true, data: data });
        }
        return res.json({ success: false, error: { "msg": "La lista no posee empleados en el registro." } });
    }

}

const authController = new AuthController();
module.exports = authController;