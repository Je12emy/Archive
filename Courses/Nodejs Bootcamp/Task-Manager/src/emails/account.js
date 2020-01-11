const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jeremyzelayaR@gmail.com',
        subject: 'Thanks to joining',
        text: `Dear ${name} thanks for creating a account. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jeremyzelayaR@gmail.com',
        subject: 'Thanks you using our services, see you later!',
        text: `Dear ${name}, thanks you using our service, we hope you could let us know how we could have done better...`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}