const sgMail = require("@sendgrid/mail")

const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to:"jayeshk118@gmail.com",
    from:"jayeshk118@gmail.com",
    subject:"this is my first creation",
    text:"I hope this one acutally get to you"
})