const twilio = require(`twilio`);
const dotenv = require(`dotenv`);
dotenv.config();


const accountSid = process.env.TWILIO_SID; 
const authToken = process.env.TWILIO_TOKEN; 

const client = twilio(accountSid, authToken);

const sendSMS = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: '+541121681478'
        })
        console.log(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendSMS;