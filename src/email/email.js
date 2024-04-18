const nodemailer = require('nodemailer')
const Email = require('email-templates')
const path = require('path');

class Emails {
    constructor(from, to, subject = '', text = '') {
        this.email = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        this.emailTemplate = new Email({
            message: { from },
            send: true,
            transport: this.email,
            views: {
                root: path.resolve('src/email/templates/'),
                options: {
                    extension: 'ejs'
                }
            }
        })
        this.mailOptions = {
            from, to, subject, text
        }
    }

    setFrom(val) {
        this.mailOptions['from'] = val
        return this
    }
    setTo(val) {
        this.mailOptions['to'] = val
        return this
    }
    setSubject(val) {
        this.mailOptions['subject'] = val
        return this
    }
    setText(val) {
        this.mailOptions['text'] = val
        return this
    }
    async sendEmail() {
        await this.email.sendMail(this.mailOptions, function (err, info) {
            if (err) console.log(err);
            return info
        })
    }
    async renderEmail(variables) {
        const html = await this.emailTemplate.render('confirmationEmail', variables);
        return html;
    }
    async sendEmailTemplate(variables) {
        try {
            const html = await this.renderEmail(variables)
            const info = await this.email.sendMail({
                ...this.mailOptions,
                html: html
            })
            return info
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Emails