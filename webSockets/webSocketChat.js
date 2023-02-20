const mongoose = require('mongoose');
const storage = require(`../modelDAOs/factory`);
const MessageDTO = require(`../DTOs/Message`);
const storageMessages = storage().mensajes;

let users = [];

const socketIoChat = (io) => {
    io.on(`connection`, socket => {

        socket.on(`joinChat`, async ({ aliasName }) => {
            users.push({
                id: socket.id,
                aliasName: aliasName,
                avatar: "https://t4.ftcdn.net/jpg/01/97/15/87/360_F_197158744_1NBB1dEAHV2j9xETSUClYqZo7SEadToU.jpg"
            });

            socket.emit(`notification`, `Bienvenido ${aliasName}`);

            const allMessageFromDB = await storageMessages.getAll();
            const allMessageDTO = allMessageFromDB.map(message => new MessageDTO(message));

    
            socket.emit(`allMessages`, allMessageDTO);
            socket.broadcast.emit(`notification`, `${aliasName} se ha unido al chat`);

            io.sockets.emit(`users`, users);
        });

        socket.on(`messageInput`, async data => {
            let date = new Date();
            const user = users.find(user => user.id === socket.id);

            const newMessage = {
                autor: user.aliasName,
                text:data,
                timestamp:date
            }

            await storageMessages.save(newMessage);

            //Servidor --> Cliente: envio mensaje
            socket.emit(`message`, newMessage);

            socket.broadcast.emit(`message`, newMessage);
        });

        // Cliente --> Servidor: un cliente se desconecta.
        socket.on('disconnect', reason => {
            const user = users.find(user => user.id === socket.id);
            users = users.filter(user => user.id !== socket.id);

            if (user) {
                socket.broadcast.emit(`notification`, `${user.aliasName} se ha ido del chat`);
            }

            io.sockets.emit(`users`, users);
        });
    });

}

module.exports = socketIoChat;