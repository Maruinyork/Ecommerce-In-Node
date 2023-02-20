const storage = require(`../../modelDAOs/factory`);
const MessageDTO = require(`../../DTOs/Message`);
const mensajesStorage = storage().mensajes;

const getChat = (req, res) => res.render('chat');

const chatIndividual = async (req, res) => {
    const userLog = req.user.username;
    const allMessageUserLog = await mensajesStorage.getById(userLog);
    const allMessageUserLogDTO = allMessageUserLog.map(message => new MessageDTO(message));

    return res.render(`sendMessages`, { allMessageUserLogDTO });
};

const chatGrupal = (req, res) => {
    const userLog = req.user.username;
    return res.redirect(`/chat?aliasName=${userLog}`);
};

module.exports = {
    getChat,
    chatIndividual,
    chatGrupal,
};
