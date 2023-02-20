const { Router } = require("express");
const jwetStr = require(`../../middlewares/jwt`);
const authorizationJWT = require(`../../middlewares/authenticateJWT`);

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getProductsBtCategory
} = require("../../controller/API/productsServicesJWT");

//Autenticacion
jwetStr();

const productosRouter = Router();

productosRouter.get(`/`,  authorizationJWT, getAllProducts);
productosRouter.get(`/:id`,authorizationJWT, getProductById);
productosRouter.get(`/categoria/:categoria`,authorizationJWT, getProductsBtCategory);
productosRouter.post(`/`,authorizationJWT, addProduct);
productosRouter.put(`/:id`,authorizationJWT, updateProductById);
productosRouter.delete(`/:id`,authorizationJWT, deleteProductById);

module.exports = productosRouter;