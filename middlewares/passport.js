const passport = require('passport');
const UserModel = require(`../repositories/models/user`);
const log4js = require('../utils/logs');
const loggerArchiveError = log4js.getLogger(`errorArchive`);
const LocalStrategy = require('passport-local').Strategy;
const { isValidPassword } = require('../utils/utils');
const sendEmail = require(`../notifications/nodemailerGmail`);
const dotenv = require(`dotenv`);
dotenv.config();
const { createHash } = require('../utils/utils');


const deserializeUser = () => {
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    });
}

const login = () => {
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    }));
}


const serializeUser = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
}

const signup = () => {
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ $or: [{ username }, { email: req.body.email }, { telefono: req.body.tel }] });
            if (user || password != req.body.password2) {
                return done(null, false);
            }

            const newUser = new UserModel();
            newUser.username = username;
            newUser.password = createHash(password); 
            newUser.email = req.body.email;
            newUser.telefono = req.body.tel;
            newUser.edad = req.body.edad;
            newUser.direccion = req.body.direccion;
            newUser.foto = req.file.filename;
            newUser.carrito = [];
            newUser.admin = false;

            const mailOptions = {
                from: process.env.EMAIL,
                to: `almadebudin23@hotmail.com`,
                subject: `Nuevo registro`,
                html: `
                    <h3>Nuevo usuario registrado</h3>
                    <p> Datos:</p>
                    <ul>
                    <li> Nombre: ${newUser.username}</li>
                    <li> Email: ${newUser.email}</li>
                    <li> Teléfono: ${newUser.telefono}</li>
                    <li> Edad: ${newUser.edad}</li>
                    <li> Direccion: ${newUser.direccion}</li>
                    </ul>
                `
            };

            const userSave = await newUser.save();
            const email = await sendEmail(mailOptions);
            return done(null, userSave);
        }
        catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    }));
}
module.exports = { 
    deserializeUser,
    login,
    serializeUser,
    signup,
};