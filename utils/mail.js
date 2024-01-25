const nodemail = require('nodemailer')
exports.mailTransport = ()=>
    nodemail.createTransport({
        service: process.env.service,
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }

    })