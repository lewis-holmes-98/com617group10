const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require('toad-scheduler')
const scheduler = new ToadScheduler()

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    type: "login",
    user: "snowcoreg10@outlook.com", 
    pass: "37BDCB1F2FD032F7DA217078FE40DCD6FB9B",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


// const task = new Task('simple task', () => {
//   console.log('Task triggered');
//   let info = transporter.sendMail({
//     from: "snowcoreg10@outlook.com", // sender address
//     to: "kvpeacock25@gmail.com",
//     subject: "Thanks for signing up!", // Subject line
//     text: "Thank you for opting in for emails. Enjoy your daily weather reports.", // plain text body
//     html: "Thank you for opting in for emails. Enjoy your daily weather reports." // html body
//   });

//   console.log("Message sent: %s", info.messageId);

// });

// function go(){
//     const job1 = new SimpleIntervalJob(
//         { seconds: 100} , task);
       
//     scheduler.addSimpleIntervalJob(job1);
// }

exports.signUpEmail = function(email){    
    try{
        transporter.sendMail({
            from: "snowcoreg10@outlook.com", // sender address
            to: email,
            subject: "Thanks for signing up!", // Subject line
            text: "Thank you for opting in for emails. Enjoy your daily weather reports.", // plain text body
            html: "Thank you for opting in for emails. Enjoy your daily weather reports." // html body
        })
    } catch(error){
        res.status(error.response.status)
        return res.send(error.message);
    }
}
