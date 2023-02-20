//Capa de persistencia de las ordenes de compra

const mongoDB = require(`../../repositories/config/mongoDB`);
const productsModel = require(`../../repositories/models/product`);
const userModel = require(`../../repositories/models/user`);
const ordenModel = require(`../../repositories/models/orders`);
const CrudMongoDB = require(`../../repositories/containers/orders`);

class OrdenesDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel, ordenModel);
    };
};

module.exports = OrdenesDAOMongoDB;

