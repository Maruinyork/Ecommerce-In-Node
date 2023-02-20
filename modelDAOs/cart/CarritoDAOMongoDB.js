//Capa de persistencia del carrito
//El DAO realiza una peticion de datos a la fuente de datos 
const mongoDB = require(`../../repositories/config/mongoDB`);
const productsModel = require(`../../repositories/models/product`);
const userModel = require(`../../repositories/models/user`);
const CrudMongoDB = require(`../../repositories/containers/cart`);

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel);
    };
};

module.exports = CarritoDAOMongoDB;

