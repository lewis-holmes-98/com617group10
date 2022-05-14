const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require('toad-scheduler')
const scheduler = new ToadScheduler()
require("dotenv").config();

const { EMAIL_SERVICE_PASS } = process.env;

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    type: "login",
    user: "snowcoreg10@outlook.com", 
    pass: EMAIL_SERVICE_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

exports.signUpEmail = function(email){    
    try{
        transporter.sendMail({
            from: "snowcoreg10@outlook.com", // sender address
            to: email,
            subject: "Thanks for signing up!", // Subject line
            text: "Thank you for signing up. Opt in to emails to receive daily weather reports.", // plain text body
            html: "Thank you for signing up. Opt in to emails to receive daily weather reports." // html body
        })
    } catch(error){
        res.status(error.response.status)
        return res.send(error.message);
    }
}

exports.weatherReport = function(email){
  try{
    transporter.sendMail({
        from: "snowcoreg10@outlook.com", // sender address
        to: email,
        subject: "It snowed today!", // Subject line
        text: "It snowed at one of your favourite resorts today!", // plain text body
        html: "Visit our website to find out where it's snowing <i>RIGHT NOW!</i>" // html body
    });

    console.log("Email sent.")

  } catch(error){
      res.status(error.response.status)
      return res.send(error.message);
  }
}