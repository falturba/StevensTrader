const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stevenstradersystem@gmail.com',
        pass: 'trader$@stevens'
    }
});
let host = "http://localhost:3000/services/"
var sendChangePasswordEmail = function(email,url)
{

    let service = host + "generatepassword/"
    let mailOptions = {
    from: '"Stevens Trader" <stevenstradersystem@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Change Password Request', // Subject line
    text: 'Either you or someone else requested to change the password of your account at Stevens Trader. If that is not you, just ignore this message. Otherwise click this link to generate a temp password  '+service+url, // plain text body
    //html: '<b>Hello world ?</b>' // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error)
     {
        console.log("Error in nodemailer while sending email change password");
        console.log(error);
    }
    
});
}

exports.sendChangePasswordEmail = sendChangePasswordEmail