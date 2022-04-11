const nodemailer = require("nodemailer");


const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 587;
const SMTP_USER = 'X32sy3CKs9@gmail.com';
const SMTP_PASSWORD = 'X32sy3CKs9123';
const API_URL = 'http://localhost:7000/'
const CLIENT_URL = 'http://localhost:3000';

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host:SMTP_HOST,
            port:SMTP_PORT,
            secure:false,
            auth:{
                user:SMTP_USER,
                pass:SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to,link){
        await this.transporter.sendMail({
            from:SMTP_USER,
            to,
            subject:"Activation account link from" + API_URL,
            text:'',
            html:`
                    <div>
                    
                    <h1> For activation your account click to link</h1>
                        <a href="${link}">${link}</a>
                    </div>                             
                `
        })
    }
}

module.exports = new MailService();