const sender = require('nodemailer')
require('dotenv').config()
const d = new Date;
const express = require('express');
const app = express()

app.use(express.json())

while(True){

}

app.get('/', (req, res)=>res.json('Funcionando'))

async function main(username) {
    let activies = ["Tomar banho", "Codar", "Comer", "Go Gym", "Dormir"]
    let hours = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    let name = username || "SEU NOME"
    let periodo = d.getHours() <= 12 ? "manhã" : d.getHours() < 18 ? "tarde" : "noite";

    let informations = sender.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: "apikey",
            pass: process.env.API_KEY_SMTP,
        },
    })

    let weekDay = ['domingo','segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
    let html
    switch (d.getDay()) {
        case 0 || 6:
            html = `
            <h1>Olá Sr ${name} </h1>
            <h2>Hoje é ${weekDay[d.getDay()]}</h2>
            <p>São exatemente ${hours} da ${periodo}</p>
            <h3>Bom final de semana hehe </h3>
            <h4>Tenha um ótimo dia</h4>
            `
            break;
        case 1:
            html =
                `
                <h1>Olá Sr ${name} </h1>
                <h2>Hoje é ${weekDay[d.getDay()]}</h2>
                <p>São exatemente ${hours} da ${periodo}</p>
                <h3>Suas atividade pra hoje são</h3>
                ${
                    activies.map((activitie)=>{
                        return(`<li>${activitie}</li>`)
                    })
                }
                <h3>Tenha um ótimo dia</h3>
                `
            break;
        case 2:
            html =
                `
                <h1>Olá Sr ${name} </h1>
                <h2>Hoje é ${weekDay[d.getDay()]}</h2>
                <p>São exatemente ${hours} da ${periodo}</p>
                <h3>Suas atividade pra hoje são</h3>
                ${
                    activies.map((activitie)=>{
                        return(`<li>${activitie}</li>`)
                    })
                }
                <h3>Tenha um ótimo dia</h3>
                `
            break;
        case 3:
            html =
                `
                <h1>Olá Sr ${name} </h1>
                <h2>Hoje é ${weekDay[d.getDay()]}</h2>
                <p>São exatemente ${hours} da ${periodo}</p>
                <h3>Suas atividade pra hoje são</h3>
                ${
                    activies.map((activitie)=>{
                        return(`<li>${activitie}</li>`)
                    })
                }
                <h3>Tenha um ótimo dia</h3>
                `
            break;
        case 4:
            html =
                `
                <h1>Olá Sr ${name} </h1>
                <h2>Hoje é ${weekDay[d.getDay()]}</h2>
                <p>São exatemente ${hours} da ${periodo}</p>
                <h3>Suas atividade pra hoje são</h3>
                ${
                    activies.map((activitie)=>{
                        return(`<li>${activitie}</li>`)
                    })
                }
                <h3>Tenha um ótimo dia</h3>
                `
            break;
        case 6:
            html =
                `
                <h1>Olá Sr ${name} </h1>
                <h2>Hoje é ${weekDay[d.getDay()]}</h2>
                <p>São exatemente ${hours} da ${periodo}</p>
                <h3>Suas atividade pra hoje são</h3>
                ${
                    activies.map((activitie)=>{
                        return(`<li>${activitie}</li>`)
                    })
                }
                <h3>Tenha um ótimo dia</h3>
                `
            break;
        default:
            break;
    }


    // `
    // <h1>Olá Sr ${name} </h1>
    // <p>São exatemente ${hours} da ${periodo}</p>
    // <h3>Suas atividade pra hoje são</h3>
    // ${
    //     activies.map((activitie)=>{
    //         return(`<li>${activitie}</li>`)
    //     })
    // }
    // <h3>Tenha um ótimo dia</h3>
    // `
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


app.get('/send/:name', (req, res)=>{
    const {name} = req.params
    res.json('Enviada')
    main(name).then(() => console.log('deu bom')).catch((err) => console.log(err))
})

app.listen(8080, (req, res)=>{
    async () => setInterval(async ()=>{
        console.log("ENVIADO")
        main().then(() => console.log('deu bom')).catch((err) => console.log(err))
    }, 2 * 60 * 60 * 1000)
    console.log("rodando")
})


