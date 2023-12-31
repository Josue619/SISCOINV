const User = require('../models/User');
const db = require('../config/database');
const UserDB = require('../database/UserDB');
const RoleDB = require('../database/RoleDB');

const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const Pagination = require('../models/Pagination');

class UserController {

    getUsers = async (req, res) => {
        const userClass = new User();
        const pageClass = new Pagination();

        const size = 5;
        const { id } = req.params;
        const title = req.body.search;
        const page = req.body.page;

        if (await userClass.verifyRoll(id)) return res.json({ success: false, error: { "msg": "Permisos denegados" } });

        const { limit, offset } = pageClass.getPagination(page, size);

        const nullSearch = {
            SEGROLId: { [Op.ne]: [1] },
            USU_STATE: { [Op.and]: [true] }
        };

        const search = {
            SEGROLId: { [Op.ne]: [1] },
            USU_STATE: { [Op.and]: [true] },
            [Op.or]: [
                { USU_LOGIN: { [Op.like]: [`%${title}%`] } },
                { '$SEG_ROL.ROL_DESCRIPCION$': { [Op.like]: [`%${title}%`] } },
                { USU_EMAIL: { [Op.like]: [`%${title}%`] } },
                { USU_CEDULA: { [Op.like]: [`%${title}%`] } },
                { USU_CELULAR: { [Op.like]: [`%${title}%`] } }
            ]
        };

        const data = await UserDB.findAndCountAll({
            include: [RoleDB],
            where: title ? search : nullSearch,
            limit, offset
        })
            .then(data => {
                const response = pageClass.getPagingData(data, page, limit);
                res.json({ success: true, data: response });
            })
            .catch(err => {
                res.json({ success: false, error: { "msg": "La lista no posee empleados en el registro." } });
            });
    }

    getUser = async (req, res) => {
        const id = req.body;
        const user = await UserDB.findAll({
            where: { USU_CODIGO: id }
        });

        if (user.length > 0) {
            return res.json(user[0]);
        }
        res.status(404).json({ msg: 'El usuario no existe en el registro.' });
    }

    createUser = async (req, res) => {
        const userClass = new User();

        const user = req.body;
        user.email = user.email.toLocaleLowerCase();
        user.password = await userClass.encryptPassword(user.password);

        if (user.username == null || user.username == '') return res.json({ success: false, errors: [{ "msg": "Debe ingresar un nombre en el campo reservado." }] });

        if (user.id_card == null || user.id_card.toString().length <= 8) return res.json({ success: false, errors: [{ "msg": "El número de cédula debe contener al menos 9 dígitos." }] });

        if (await userClass.verifyCardID(user.id_card)) return res.json({ success: false, errors: [{ "msg": "El número de cédula ya existe en el registro." }] });

        if (user.cellphone == null || user.cellphone.toString().length != 8) return res.json({ success: false, errors: [{ "msg": "El número de teléfono debe contener 8 dígitos." }] });

        //console.log(user);
        const data = await UserDB.create({
            SEGROLId: user.roleID,
            USU_LOGIN: user.username,
            USU_EMAIL: user.email,
            USU_PASSWORD: user.password,
            USU_CEDULA: user.id_card,
            USU_CELULAR: user.cellphone,
            USU_CREADO_POR: user.created_by,
            USU_MODIFICADO_POR: user.modified_by,
            USU_FECHA_CREADO: new Date(),
            USU_FECHA_MODIFICADO: new Date()
        });

        const savedUser = await UserDB.findAll({
            where: { USU_EMAIL: user.email }
        });

        //Create token
        const iss = 'http://localhost:3000/api/auth/signup';
        const token = jwt.sign({ _id: savedUser[0].USU_CODIGO, iss: iss }, process.env.TOKEN_SECRET);


        res.status(200).header('auth_token', token).json({
            success: true,
            'auth_token': token,
            'user': savedUser[0]
        });

    }

    updateUser = async (req, res) => {
        const userClass = new User();

        const user = req.body;
        user.email = user.email.toLocaleLowerCase();
        user.password = await userClass.encryptPassword(user.password);

        if (user.username == null || user.username == '') return res.json({ success: false, errors: [{ "msg": "Debe ingresar un nombre en el campo reservado." }] });

        if (await userClass.updateVerifyEmail(user)) return res.json({ success: false, errors: [{ "msg": "El correo electrónico ya existe en el registro." }] });

        if (user.id_card == null || user.id_card.toString().length <= 8) return res.json({ success: false, errors: [{ "msg": "El número de cédula debe contener al menos 9 dígitos." }] });

        if (await userClass.updateVerifyCardID(user)) return res.json({ success: false, errors: [{ "msg": "El número de cédula ya existe en el registro." }] });

        if (user.cellphone == null || user.cellphone.toString().length != 8) return res.json({ success: false, errors: [{ "msg": "El número de teléfono debe contener 8 dígitos." }] });

        const data = await UserDB.update({
            SEGROLId: user.roleID,
            USU_LOGIN: user.username,
            USU_EMAIL: user.email,
            USU_CEDULA: user.id_card,
            USU_CELULAR: user.cellphone,
            USU_MODIFICADO_POR: user.modified_by,
            USU_FECHA_MODIFICADO: new Date()
        },
            {
                where: { USU_CODIGO: user.code },
                and: { id: user.roleID }
            });

        res.status(200).json({
            success: true,
            message: 'El usuario fue actualizado.'
        });

    }

    deleteUser = async (req, res) => {
        const user = req.body;

        const data = await UserDB.update({
            USU_STATE: false,
        },
            {
                where: { USU_CODIGO: user.USU_CODIGO },
                and: { id: user.SEGROLId }
            });

        res.status(200).json({
            success: true,
            message: 'El usuario fue eliminado.'
        });

    }

}

const userController = new UserController();
module.exports = userController;