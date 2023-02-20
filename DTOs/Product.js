//La aplicacion encapsula la info en un DTO

class ProductoDTO{
    constructor (producto){
        this.id = producto._id
        this.nombre = producto.nombre
        this.descripcion = producto.descripcion
        this.thumbnail = producto.thumbnail
        this.precio = producto.precio
        this.categoria = producto.categoria
        this.cantidad = producto.cantidad
    }
}

module.exports = ProductoDTO;



