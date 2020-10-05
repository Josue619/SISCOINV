const User = require('../models/User');
const db = require('../config/database');
const UserDB = require('../database/UserDB');
const RoleDB = require('../database/RoleDB');


const jwt = require('jsonwebtoken');

class UserController {

    getUsers = async (req, res) => {
        const data = await UserDB.findAll({ include: [RoleDB]
        });

        //const data = await UserDB.findAll({ include: [RoleDB], 
        //    where: { SEGROLId: 2 },
        //    or: { SEGROLId: 3 }
        //});

        if (data.length > 0) {
            return res.json({ success: true, data: data });
        }
        return res.json({ success: false, error: { "msg": "La lista no posee empleados en el registro." } });
    }

    getUser = async (req, res) => {
        const id = req.body;   
        const user = await UserDB.findAll({
            where: { USU_CODIGO: id }
        });

        if (user.length > 0) {
            return res.json(user[0]);
        }
        res.status(404).json({msg: 'El usuario no existe en el registro.'});
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

        if (user.id_card == null || user.id_card.toString().length <= 8) return res.json({ success: false, errors: [{ "msg": "El número de cédula debe contener al menos 9 dígitos." }] });

        if (user.cellphone == null || user.cellphone.toString().length != 8) return res.json({ success: false, errors: [{ "msg": "El número de teléfono debe contener 8 dígitos." }] });

        console.log(user);
        const data = await UserDB.update({
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

        res.status(200).json({
            success: true,
            message: 'El usuario fue actualizado.'
        });

    }

}

const userController = new UserController();
module.exports = userController;