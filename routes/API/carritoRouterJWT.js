
const { Router } = require("express");const 
jwetStr = require(`../../middlewares/jwt`);
const authorizationJWT = require(`../../middlewares/authenticateJWT`);

const {
  viewCart,
  addProductToCart,
  deleteCartById,
  deleteProductById,
} = require("../../controller/API/cartControllerjwt");

//Autenticacion
jwetStr();

const carritoRouter = Router();

carritoRouter.get(`/`,authorizationJWT, viewCart);
carritoRouter.post(`/addProduct`,authorizationJWT, addProductToCart);
carritoRouter.delete(`/deleteProduct`,authorizationJWT, deleteProductById);
carritoRouter.delete(`/:id`,authorizationJWT, deleteCartById);

module.exports = carritoRouter;



