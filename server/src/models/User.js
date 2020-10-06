const bcrypt = require("bcryptjs");
const db = require('../config/database');
const UserDB = require('../database/UserDB');
const { QueryTypes } = require('sequelize');

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
        const db_user = await UserDB.findAll({where: { USU_EMAIL: email }});
        if (db_user.length > 0) return true;
        return false;
    }

    async verifyCardID(card_ID) {
        const db_user = await UserDB.findAll({where: { USU_CEDULA: card_ID }});
        if (db_user.length > 0) return true;
        return false;
    }

    async updateVerifyEmail(user) {
        let answer = false;
        const db_users = await db.query(
            'SELECT * FROM seg_usuarios WHERE USU_CODIGO != ?',
            {
                replacements: [user.code],
                type: QueryTypes.SELECT
            }
        );

        if (db_users.length > 0) {
            for (let i = 0; i < db_users.length; i++) {
                if (db_users[i].USU_EMAIL == user.email) {
                    answer = true;
                }
            }
        }
        return answer;
    }

    async updateVerifyCardID(user) {
        let answer = false;
        const db_users = await db.query(
            'SELECT * FROM seg_usuarios WHERE USU_CODIGO != ?',
            {
                replacements: [user.code],
                type: QueryTypes.SELECT
            }
        );

        if (db_users.length > 0) {
            for (let i = 0; i < db_users.length; i++) {
                if (db_users[i].USU_CEDULA == user.id_card) {
                    answer = true;
                }
            }
        }
        return answer;
    }

}

module.exports = User;