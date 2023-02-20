const ProductosDAOMongoDB = require(`./products/ProductosDAOMongoDB`);
const CarritoDAOMongoDB = require(`./cart/CarritoDAOMongoDB`);
const OrdenesDAOMongoDB = require(`./orders/OrdenesDAOMongoDB`);
const MessagesDAOMongoDB = require(`./messages/MessageDAOMongoDB`);

const getStorage = () => {
    const storage = process.env.STORAGE;
    switch (storage) {
        case `MongoDb`:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB(),
                mensajes: new MessagesDAOMongoDB()
            }
            break

        default:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB(),
                ordenes: new OrdenesDAOMongoDB(),
                mensajes: new MessagesDAOMongoDB()
            }
            break
    }
}

module.exports = getStorage;