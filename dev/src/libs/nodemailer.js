const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stevenstradersystem@gmail.com',
        pass: 'trader$@stevens'
    }
});
let host = "http://stevenstrader.herokuapp.com//services/"
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

var sendoutbidnotification = function(bidder,title,bid)
{
    
    let mailOptions = {
    from: '"Stevens Trader" <stevenstradersystem@gmail.com>', // sender address
    to: bidder.email, // list of receivers
    subject: 'Stevens Trader  Outbid Notification', // Subject line
    text: 'You got outbid on this item ('+title+') new price is '+bid+'$', // plain text body
    //html: '<b>Hello world ?</b>' // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error)
     {
        console.log("Error in nodemailer while sending email Outbid notification");
        //console.log(error);
    }
    
});
}


var sendbidnotification = function(email,title,bid)
{   
    console.log(email)
    let mailOptions = {
    from: '"Stevens Trader" <stevenstradersystem@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Stevens Trader  Bid Notification', // Subject line
    text: 'You got new bid on your item ('+title+') new price is '+bid+'$', // plain text body
    //html: '<b>Hello world ?</b>' // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error)
     {
        console.log("Error in nodemailer while sending email Outbid notification");
        //console.log(error);
    }
    
});
}

exports.sendbidnotification = sendbidnotification
exports.sendChangePasswordEmail = sendChangePasswordEmail
exports.sendoutbidnotification = sendoutbidnotification

