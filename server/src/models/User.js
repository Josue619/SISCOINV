const db = require("../database/UserDB");
const bcrypt = require("bcryptjs");

class User {

    constructor() {
        this.email = '';
        this.password = '';
    }

    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async validatedPassword(password, pass) {
        return await bcrypt.compare(password, pass);
    }

    async verifyEmail(email) {
        const db_user = await db.findAll({where: { USU_EMAIL: email }});
        if (db_user.length > 0) return true;
        return false;
    }

}

module.exports = User;