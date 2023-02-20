const { Router } = require("express");

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  viewUpdateProduct,
  getProductsBtCategory
} = require("../../controller/MVC/productsService");

const productosRouter = Router();

productosRouter.get(`/`, getAllProducts);
productosRouter.get(`/:id`, getProductById);
productosRouter.get(`/categoria/:categoria`, getProductsBtCategory);
productosRouter.post(`/modificar`, viewUpdateProduct);
productosRouter.post(`/`, addProduct);
productosRouter.put(`/:id`, updateProductById);
productosRouter.delete(`/:id`, deleteProductById);

module.exports = productosRouter;