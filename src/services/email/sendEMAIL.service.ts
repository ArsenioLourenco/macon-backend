import nodemailer from "nodemailer";

export interface ISendEmail{
    destiny: string,
    message: string
}

export default class SendEMAIL{
    async execute({ destiny, message }: ISendEmail){
        try{
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            transporter.sendMail({
                from: `${process.env.EMAIL_USER}`+`<`+`${process.env.EMAIL_USER}>`,
                to: destiny,
                subject: "Acabou de Reserar sua Viagem",
                text: message
            }).then(message =>{
                console.log(message)
            }).catch(err => {
                console.log(err.message)
            });
        }catch(err){
            return err.message;
        }
    }
}
