const storage = require(`../../modelDAOs/factory`);
const productsStorage = storage().carrito;

const addProductToCart = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.addProduct(idUser, idProduct);

        return res.redirect(`/api/productos`)
    } catch (err) {
        return res.status(404).json({
            error: `Error al agregar un producto ${err}`
        });
    }
};

const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.id;

        await productsStorage.deleteCartById(idCart);
        return res.json(`Se eliminó el carrito de forma correcta`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al eliminar el carrito ${err}`
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.deleteProductById(idUser, idProduct);

        return res.redirect(`/api/carrito`)
    } catch (err) {
        return res.status(404).json({
            error: `Error al eliminar un producto específico de un carrito ${err}`
        });
    }
};

const viewCart = (req, res) => {
    const userLog = req.user;
    return res.render(`carrito`, { userLog });
};

module.exports = {
    addProductToCart,
    deleteCartById,
    deleteProductById,
    viewCart,
};