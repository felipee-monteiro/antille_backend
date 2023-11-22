const express = require("express");
const cors = require("cors");
const { transporter } = require('./utils/sendEmail.js');
const { object, string, ValidationError } = require("yup");
const { config } = require("dotenv");
const helmet = require("helmet");

config();

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(helmet());

app.post('/contato', async function (req, res) {
    console.log(req.body);
    try {
        
        const validator = object({
            email: string().required("E-mail Obrigatório").email("Verifique o formato do e-mail"),
            nome: string().required("Nome Obrigatório"),
            razao: string().required("Razão Obrigatória"),
            tel: string().max(15),
            mensagem: string().required('Mensagem obrigatória')
        });

        const mailData = await validator.validate(req.body);

        await transporter().sendMail({
            from: mailData.email,
            to: process.env.EMAIL_USER,
            subject: `${mailData.nome} <${mailData.email}>`,
            text: `Nome: ${mailData.nome}\n\nRazão: ${mailData.razao}\n\nMensagem: ${mailData.mensagem}\n\nTelefone: ${mailData.telefone || "Não Informado"}`,
        });

        return res.status(200).json({
            success: true
        });

    } catch (e) {
        console.log(e)
        if (e instanceof ValidationError) {
            return res.status(400).json({ errors: e.errors });
        }

        return res.status(500).json({ error: 'internal server error' });
    }
});

app.listen(8080, console.log("Servidor está ouvindo na porta 8080"));