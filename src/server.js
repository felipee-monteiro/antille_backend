const express = require("express");
const { transporter } = require('./utils/sendEmail.js');
const { object, string, bool } = require("yup");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/', function (req, res) {
    console.log(req.query);

    return res.json({
        message: "Hello World"
    });
});

app.post('/contato', async function (req, res) {

    // const validator = object({
    //     email: string().required().email(),
    // });

    // transporter.sendMail({
    //     from: mailData.email,
    //     to: process.env.EMAIL_USER,
    //     subject: `${mailData.name} ${mailData.surname} <${mailData.email}>`,
    //     text: mailData.message,
    // });

    // try {
    //     await validator.validate(req.body);
    //     return res.json({
    //         message: "parabens, você digitou o e-mail corretamente"
    //     });
    // } catch (error) {
    //     return res.json({
    //         erro: "verifique os campos"
    //     });
    // }


});

app.listen(8080, console.log("Servidor está ouvindo na porta 80"));