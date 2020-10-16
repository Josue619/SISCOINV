const User = require('../models/User');
const db = require('../config/database');
const UserBD = require('../database/UserDB');
const RoleDB = require('../database/RoleDB');
const jwt = require('jsonwebtoken');

//Para migrar las tablas
//db.sync();

//RoleDB.create({
//    ROL_DESCRIPCION: 'Bodeguero'
//});

class AuthController {

    signup = async (req, res) => {

        //Create user
        const userClass = new User();

        const user = req.body;
        user.email = user.email.toLocaleLowerCase();
        user.password = await userClass.encryptPassword(user.password);

        const data = await UserBD.create({
            SEGROLId: user.role,
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

        const savedUser = await UserBD.findAll({
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

    signin = async (req, res) => {
        const userClass = new User();
        const email = req.body.email.toLowerCase();
        const iss = 'http://localhost:3000/api/auth/signin';

        const user = await UserBD.findAll({
            where: { USU_EMAIL: email }
        });

        if (!user[0]) return res.json({ success: false, error: { "msg": 'El correo electrónico o la contraseña son incorrectos.' } });

        const correctPass = await userClass.validatedPassword(req.body.password, user[0].USU_PASSWORD);

        if (!correctPass) return res.json({ success: false, error: { "msg": "Contraseña invalida." } });

        const token = jwt.sign({ _id: user[0].USU_CODIGO, iss: iss }, process.env.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24
        });

        res.status(200).header('auth_token', token).json({
            success: true,
            'auth_token': token,
            'user': user[0]
        });
    }

    admin_auth = async (req, res) => {
        const code_auth = req.body.code_auth;

        if (!code_auth) return res.json({ success: false, error: { "msg": 'Ingrese el código de authenticación.' } });

        if (code_auth != process.env.ADMIN_AUTH) return res.json({ success: false, error: { "msg": 'El código no es valido para realizar el registro.' } });

        res.status(200).json({ success: true });
    }

    profile = async (req, res) => {
        const { id } = req.params;
        const user = await UserBD.findByPk(id);
        if (!user) return res.status(404).json('No se ha encontrado el usuario');
        res.json(user);
    }
}

const authController = new AuthController();
module.exports = authController;