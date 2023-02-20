//Capa de persistencia de los productos

const mongoDB = require(`../../repositories/config/mongoDB`);
const productsModel = require(`../../repositories/models/product`);
const CrudMongoDB = require(`../../repositories/containers/products`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;