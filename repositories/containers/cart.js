class Contenedor {
    constructor(mongoDB, productsModel, userModel) {
        this.mongoDB = mongoDB;
        this.productsModel = productsModel;
        this.userModel = userModel
    }

    async addProduct(idUser, idProduct) {
        let docUser = false;
        let docProduct = false;
        let esRepetido = false;
        let newCarrito = [];

        docUser = await this.userModel.findOne({ _id: idUser }, { __v: 0 });
        docProduct = await this.productsModel.findOne({ _id: idProduct }, { __v: 0 });

        if (docUser && docProduct) {
            if (docUser.carrito.length == 0) {
                docProduct.cantidad++;
                newCarrito.push(docProduct);
            } else {
                newCarrito = docUser.carrito;
                newCarrito.forEach(element => {
                    if (element._id.toString() == docProduct._id.toString()) {
                        element.cantidad += 1;
                        element.precio += docProduct.precio;
                        esRepetido = true;
                    }
                });
                if (!esRepetido) {
                    docProduct.cantidad++;
                    newCarrito.push(docProduct)
                }
            }

            docUser.carrito = [];
            await docUser.save();
            docUser.carrito = newCarrito;
            return await docUser.save();
        } else {
            throw Error(`Error al acceder al id del carrito / producto`);
        }
    }

    async deleteProductById(idUser, idProduct) {
        let docUser = false;
        let docProduct = false;

        docUser = await this.userModel.findOne({ _id: idUser }, { __v: 0 });
        docProduct = await this.productsModel.findOne({ _id: idProduct }, { __v: 0 });

        if (docUser && docProduct) {
            let allProductsFromCart = docUser.carrito;
            let products = [];

            allProductsFromCart.forEach(element => {
                if (element._id.toString() != docProduct._id.toString()) {
                    products.push(element);
                }
            })

            docUser.carrito = [];
            await docUser.save();
            docUser.carrito = products;
            return await docUser.save();

        } else {
            throw Error(`Error al acceder al id del carrito / producto`);
        }
    }
};

module.exports = Contenedor;
