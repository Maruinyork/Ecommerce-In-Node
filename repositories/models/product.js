const { Schema, model } = require(`mongoose`);

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    thumbnail: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String, required: true },
});

module.exports = model(`Productos`, productoSchema);