const { Router } = require(`express`);
const jwetStr = require(`../../middlewares/jwt`);

const {
    loginJWTController,
    registerJWTController
} = require(`../../controller/API/userControllerJWT`);

//Autenticacion
jwetStr();

const loginJWTRouter = Router();
const registerJWTRouter = Router();

//Login
loginJWTRouter.post(`/`, loginJWTController);
registerJWTRouter.post(`/`, registerJWTController);

module.exports = {
    loginJWTRouter,
    registerJWTRouter
};