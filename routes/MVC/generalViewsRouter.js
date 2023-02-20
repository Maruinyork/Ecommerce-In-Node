const { Router } = require(`express`);
const isLogged = require('../../middlewares/logged');

const {
    homeController,
    signupController,
    bienvenidaController,
    viewFormAddProductController,
    viewDataServerController,
    viewErrorController
} = require(`../../controller/MVC/generalController`);

const viewsRouter = Router();


viewsRouter.get(`/`, homeController);
viewsRouter.get(`/signup`, signupController);
viewsRouter.get('/welcome',isLogged, bienvenidaController);
viewsRouter.get('/formAddProduct',isLogged, viewFormAddProductController);
viewsRouter.get('/serverInfo',isLogged, viewDataServerController);
viewsRouter.get('/error/:msg', viewErrorController);

module.exports = viewsRouter;