const { EMAIL_SERVICE_PASS } = process.env;
const nodemailer = require('nodemailer');

//Connect to smtp server and set up transport.
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    type: "login",
    user: "snowcoreg10@outlook.com", 
    pass: EMAIL_SERVICE_PASS,
  },
});

//Check connection to the smtp server.
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//Send sign up email.
exports.signUpEmail = function(email){    
    try{
        transporter.sendMail({
            from: "snowcoreg10@outlook.com",
            to: email,
            subject: "Thanks for signing up!",
            text: "Thank you for signing up. Opt in to emails to receive daily weather reports.",
            html: "Thank you for signing up. Opt in to emails to receive daily weather reports."
        })
    } catch(error){
        res.status(error.response.status)
        return res.send(error.message);
    }
};

//Send weather report.
exports.weatherReport = function(email){
  try{
    transporter.sendMail({
        from: "snowcoreg10@outlook.com",
        to: email,
        subject: "It snowed today!",
        text: "It snowed at one of your favourite resorts today!",
        html: "Visit our website to find out where it's snowing <i>RIGHT NOW!</i>"
    });
    console.log("Email sent.")
  } catch(error){
      res.status(error.response.status)
      return res.send(error.message);
  }
};