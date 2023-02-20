//El componente en la capa de ruteo llama al componente en la capa de servicio
//Tiene acceso a la base de datos para crear, editar o borrar datos
const storage = require(`../../modelDAOs/factory`);
const productsStorage = storage().carrito;

const addProductToCart = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.addProduct(idUser, idProduct);
        
        return res.status(200).send({
            success: true,
            carrito: `Se agregó el producto`
        });
    } catch (err) {
        return res.status(404).send({
            success: false,
            carrito: `Error al agregar producto`
        });
    }
};

const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.id;

        await productsStorage.deleteCartById(idCart);
        
        return res.status(200).send({
            success: true,
            carrito: `Carrito eliminado`
        });

    } catch (err) {
        return res.status(404).send({
            success: false,
            carrito: `Error al eliminar el carrito`
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.deleteProductById(idUser, idProduct);

        return res.status(200).send({
            success: true,
            carrito: `Producto eliminado`
        });
    } catch (err) {

        return res.status(404).send({
            success: false,
            carrito: `Error al eliminar un producto específico`
        });
    }
};

const viewCart = async (req, res) => {
    const userLog = req.user;

    if (userLog.carrito.length == 0) {
        return res.status(200).send({
            success: true,
            carrito: `El carrito se encuentra vacío`
        });
    } else {
        return res.status(200).send({
            success: true,
            carrito: userLog.carrito
        });
    }
};

module.exports = {
    addProductToCart,
    deleteCartById,
    deleteProductById,
    viewCart,
};