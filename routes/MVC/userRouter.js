const { Router } = require(`express`);
const passport = require('passport');

const{ 
    login, 
    signup, 
    serializeUser, 
    deserializeUser}
 = require(`../../middlewares/passport`);

const {
    signupFormController,
    loginFormController,
    logoutController,
    profileController
} = require(`../../controller/MVC/userController`);

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatar')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

//Autenticacion
login();
signup();
serializeUser();
deserializeUser();

const loginRouter = Router();
const signupRouter = Router();
const logoutRouter = Router();
const profileRouter = Router();

//Login
loginRouter.get(`/`, loginFormController);
loginRouter.post('/', passport.authenticate('login', { //El controlador de passport, llega desde el formulario de login.
    successRedirect: '/welcome', //vamos a home.
    failureRedirect: `/error/Error al iniciar sesión usuario, contraseña incorrecta`, 
    failureFlash: true  // permite enviar mensajes.
}));

signupRouter.get(`/`, signupFormController);
signupRouter.post('/', upload.single('avatar'), passport.authenticate('signup', {//El controlador de passport, llega desde el formulario de signup.
    successRedirect: '/', // vamos a home.
    failureRedirect: `/error/Error al crear la cuenta: usuario, email, telefono repetido, contraseña no coincide`, // vamos a /signup de signup.
    failureFlash: true // permite enviar mensajes.
}));

profileRouter.get(`/`, profileController);
logoutRouter.get(`/`, logoutController);

module.exports = {
    signupRouter,
    loginRouter,
    logoutRouter,
    profileRouter
};