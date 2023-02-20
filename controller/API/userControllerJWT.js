const UserModel = require(`../../repositories/models/user`);
const { createHash } = require('../../utils/utils');
const { isValidPassword } = require('../../utils/utils');
const jwt = require(`jsonwebtoken`);
const dotenv = require(`dotenv`);
dotenv.config();

const registerJWTController = async (req, res) => {
    try {
        const newUser = new UserModel();

        newUser.username = req.body.username;
        newUser.password = createHash(req.body.password);
        newUser.email = req.body.email;
        newUser.telefono = req.body.tel;
        newUser.edad = req.body.edad;
        newUser.direccion = req.body.direccion;
        newUser.foto = req.body.userPicture;
        newUser.carrito = [];
        newUser.admin = false;

        const userSave = await newUser.save();

        res.send({
            success: true,
            message: `Usuario creado correctamente / User created successfully`,
            user: {
                id: userSave._id,
                username: userSave.username
            }
        });

    } catch (err) {
        res.send({
            success: false,
            message: `Algo es incorrecto / Something went wrong`,
        });
    }
};

const loginJWTController = async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: `No se encontró el usuario / Could not find the user`,
            });
        }

        if (!isValidPassword(user.password, req.body.password)) {
            return res.status(401).send({
                success: false,
                message: `Password incorrecto / Incorrect password`,
            });
        }
        const payload = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(payload,process.env.SECRET_KEY, { expiresIn: `1d` });

        return res.status(200).send({
            success: true,
            message: `Log correcto! / Log success`,
            token: `Bearer ${token}`
        });

    }
    catch (err) {
        res.send({
            success: false,
            message: `Algo es incorrecto / Something went wrong`,
            error: err
        });
    }
};

module.exports = {
    registerJWTController,
    loginJWTController
};