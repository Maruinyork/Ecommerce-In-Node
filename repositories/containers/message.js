class Contenedor {
    constructor(mongoDB, messageModel) {
        this.mongoDB = mongoDB;
        this.messageModel = messageModel;
    }

    async save(message) {
        try {
            const newMessage = new this.messageModel(message);

            this.mongoDB
                .then(_ => newMessage.save())
                .catch(err => console.log(`Error: ${err.message}`));

        } catch (error) {
            throw Error(`Error en save`);
        }
    }

    async getAll() {
        try {
            let docs = false;
            docs = await this.messageModel.find();
            if (docs) {
                return docs;
            } else {
                return false;
            }
        } catch (error) {
            throw Error(`Error en getAll`);
        }
    }

    async getById(idUsuario) {
        try {
            let doc = false;
            console.log(idUsuario);
            doc = await this.messageModel.find({ autor: idUsuario }, { __v: 0 });

            console.log(doc)
            if (doc) {
                return doc;
            } else {
                return false;
            }
        } catch (error) {
            throw Error(`Error en getById message`);
        }
    }

}
module.exports = Contenedor;
