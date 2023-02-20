class MessageDTO {
    constructor(message) {
        this.id = message.autor
        this.mensaje = message.text
        this.timestamp = message.timestamp
    }
}

module.exports = MessageDTO;


