//Capa de persistencia de los mensajes

const mongoDB = require(`../../repositories/config/mongoDB`);
const messageModel = require(`../../repositories/models/message`);
const CrudMongoDB = require(`../../repositories/containers/message`);

class MessageDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, messageModel);
    };
};

module.exports = MessageDAOMongoDB;