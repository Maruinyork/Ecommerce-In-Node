const storage = require(`../../modelDAOs/factory`);
const ordenesStorage = storage().ordenes;
const sendEmail = require(`../../notifications/nodemailerGmail`);
const sendSMS = require('../../notifications/twilioSMS');
const sendWhatsApp = require('../../notifications/twilioWhatsApp');

const createOrdenController = async (req, res) => {
    try {
        const userLog = req.user;
        const userID = req.body.idUser;
        const orden = await ordenesStorage.createOrden(userID);

        auxEmail(userLog, orden);

        //Descomentar para recibir el pedido en mensaje
    //    sendSMS(`Su pedido ha sido recibido y se encuentra en proceso`, `+16672618331`, `+5491121681478`);
    //    auxWhatsApp(userLog, orden);

        return res.render(`hop`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al crear la orden ${err}`
        });
    }
};

const viewOrdenesController = async (req, res) => {
    try {
        let allOrdenes = await ordenesStorage.getAll();

        return res.status(200).send({
            success: true,
            ordenes: allOrdenes
        });

    } catch (err) {
        return res.status(404).send({
            success: false,
            message: `Error al obtener las ordenes`
        });
    }
};

const auxEmail = async (userLog, orden) => {
    let detallePedido = ``;

    orden.products.forEach(element => {
        detallePedido += `
        <li>UNIDADES: ${1}. PRODUCTO: ${element.nombre}. CODIGO: ${element._id} </li>
    `;
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: `${userLog.email}`,
        subject: `Nuevo pedido de: ${userLog.username}`,
        html: `
            <h3>Nuevo pedido</h3>
            <p> Datos del cliente:</p>
            <ul>
            <li> Nombre: ${userLog.username}</li>
            <li> Email: ${userLog.email}</li>
            <li> Teléfono: ${userLog.telefono}</li>
            <li> Direccion: ${userLog.direccion}</li>
            </ul>
            <p> Pedido:</p>
            <ul>
            ${detallePedido}
            </ul>
        `
    };
    const email = await sendEmail(mailOptions);
}

const auxWhatsApp = async (userLog, orden) => {
    let detallePedido = ``;

    orden.products.forEach(element => {
        detallePedido +=
            `
            - UNIDADES: ${1}. PRODUCTO: ${element.nombre}. CODIGO: ${element._id}
            `;
    });

    const body =
        `Nuevo pedido
        Datos del cliente:
        Nombre: ${userLog.username}
        ${userLog.email}
        Teléfono: ${userLog.telefono}
        Direccion: ${userLog.direccion}
        Pedido:
        ${detallePedido}
        `;
    await sendWhatsApp(body, `whatsapp:+14155238886`, process.env.PHONE_NUMBER_WHATSAPP);
}

module.exports = {
    viewOrdenesController,
    createOrdenController,
};
