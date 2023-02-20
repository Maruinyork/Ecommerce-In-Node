const { Router } = require("express");
const jwetStr = require(`../../middlewares/jwt`);
const authorizationJWT = require(`../../middlewares/authenticateJWT`);

const {
    viewOrdenesController,
    createOrdenController,
} = require("../../controller/API/ordersControllerJWT");

//Autenticacion
jwetStr();

const ordenesRouter = Router();

ordenesRouter.get(`/`, authorizationJWT, viewOrdenesController);
ordenesRouter.post(`/`, authorizationJWT, createOrdenController);


module.exports = ordenesRouter;



