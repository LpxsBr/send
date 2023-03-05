const sender = require('nodemailer')
require('dotenv').config()
const d = new Date;

async function main() {
    let activies = ["Tomar banho", "Codar", "Comer", "Go Gym", "Dormir"]
    let hours = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    let name = "SEU NOME"
    let periodo = d.getHours() <= 12 ? "manhã" : d.getHours() < 18 ? "tarde" : "noite";
    
    let informations = sender.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: "apikey",
            pass: process.env.API_KEY_SMTP,
        },
    })

    let html = `
    <h1>Olá Sr ${name} </h1>
    <p>São exatemente ${hours} da ${periodo}</p>
    <h3>Suas atividade pra hoje são</h3>
    <li>${activies[0]}</li>
    <li>${activies[1]}</li>
    <li>${activies[2]}</li>
    <li>${activies[3]}</li>
    <li>${activies[4]}</li>
    <h3>Tenha um ótimo dia</h3>
    `
    let msgbody = await informations.sendMail({
        from: '"Test Lpxsbr 👻" <lpxsbr.test@gmail.com>', // sender address
        to: "anselmolopes.an@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "", // plain text body
        html: `${html}`, // html body
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

main().then(() => console.log('deu bom')).catch((err) => console.log(err))


// setInterval(()=>{
//     console.log("ENVIADO")

// }, 24 * 60 * 60 * 1000)