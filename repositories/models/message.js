const { Schema, model } = require(`mongoose`);

const messageSchema = new Schema({
    autor: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
}, {
    versionKey: false 
});

module.exports = model(`Messages`, messageSchema);
