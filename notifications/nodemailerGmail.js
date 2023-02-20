const { createTransport } = require(`nodemailer`);
const dotenv = require(`dotenv`);
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASS_EMAIL = process.env.PASS_EMAIL;

const transporter = createTransport({
    host: `smtp.ethereal.email`,
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASS_EMAIL
    }
});

const sendEmail = async (options) => {
    try {
        const response = await transporter.sendMail(options);
    } catch (e) {
        console.error(e);
    }
}

module.exports = sendEmail;
