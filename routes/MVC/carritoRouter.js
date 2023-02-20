const { Router } = require("express");

const {
  viewCart,
  addProductToCart,
  deleteCartById,
  deleteProductById,
} = require("../../controller/MVC/cartController");

const carritoRouter = Router();

carritoRouter.get(`/`, viewCart);
carritoRouter.post(`/addProduct`, addProductToCart);
carritoRouter.post(`/deleteProduct`, deleteProductById);
carritoRouter.delete(`/:id`, deleteCartById);

module.exports = carritoRouter;



