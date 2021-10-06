const sgMail = require("@sendgrid/mail")

const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:"jayeshk118@gmail.com",
        subject:"Thanks for joining in !",
        text:`Welcome to the app ${name}. Let me know how you get along with the app`
    })
}

const sendCancellationEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:"jayeshk118@gmail.com",
        subject:"Sorry to see you go!",
        text:`Goodbye, ${name}, I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail:sendWelcomeEmail,
    sendCancellationEmail
}