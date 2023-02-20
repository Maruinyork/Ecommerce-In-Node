const twilio = require(`twilio`);
require('dotenv').config();

const ACCOUNT_SID = process.env.TWILIO_SID;
const AUTH_TOKEN = process.env.TWILIO_TOKEN;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);


// const options = {
//     body: 'Hola soy un wpp de node.js',
//     from: 'whatsapp:+14155238886',
//     to: `whatsapp:${process.env.PHONE_NUMBER_WHATSAPP}`
// }
// ; (async ()=>{
//     try {
//         const message = await client.messages.create(options)
//         console.log(message)
//     } catch(err){
//         console.log(err)
//     }
// }) ()

const sendWhatsApp = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: 
            `whatsapp:+5491121681478`
        })
        console.log(message);

    } catch (e) {
        console.error(e.message);
    }

}

module.exports = sendWhatsApp;
//Prueba ejemplo de clase
// module.exports = options; 