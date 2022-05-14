const Resorts = require("../models/Resort");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const emailService = require('../emailService.js');
const { off } = require("../models/Resort");
const axios = require("axios");


exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.render('login', { errors: { username: { message: 'username not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userID = user._id;
            res.redirect('/');
            return
        }

        res.render('login', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.create = async (req, res) => {
    try {

        if (req.body.emailYes) emailOpt = true
        else emailOpt = false
        const user = new User({ 
            username: req.body.username,
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password,
            level:1,
            emailOptIn: emailOpt
            });

        const userWithProposedEmail = await User.findOne({ email: req.body.email })
        const usernameExists = await User.findOne({ username: req.body.username })

        if(userWithProposedEmail ) {
            res.render('signup', { errors: { email: { message: 'email already exists' } }})
            return;
        }

        if(usernameExists ) {
            res.render('signup', { errors: { username: { message: 'username already exists' } }})
            return;
        }
        await user.save();

        try{
            emailService.signUpEmail(req.body.email);
        }catch(e){
            console.log(e)
        }
        res.redirect('/?message=user saved')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('signup', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
};


exports.save = async (req, res) => {
    try {
        const resortId = req.params.id;
        const userId = req.session.userID;
        const resortName = await Resorts.findOne({_id: resortId})
        console.log(resortName.name)
        await User.updateOne({ _id: userId}, {$addToSet:{saved: resortId}});
        res.redirect(`/resort/`+resortName.name);
    } catch (e) {
        res.status(404).send({
        message: `Cannot leave -  error ${id}.`,
        });
    }
};


exports.unsave = async (req, res) => {
    try {
        const resortId = req.params.id;
        const userId = req.session.userID;
        const resortName = await Resorts.findOne({_id: resortId})

        await User.updateOne(
        { _id:userId}, {
            $pull: {
            saved: resortId
            }
        });
        
        res.redirect(`/resort/`+resortName.name);
        
    } catch (e) {
        res.status(404).send({
        message: `Cannot leave -  error ${id}.`,
        });
    }
};


exports.edit = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const userToUpdate = await User.findOne({_id: userId });
        res.render("editUser", {userToChange: userToUpdate});
    } catch (e) {
        res.status(404).send({message: JSON.stringify(e)});
    }
};


exports.adminDelete = async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndRemove(id);
      res.redirect("/adminPage");
    } catch (e) {
      res.status(404).send({
        message: `unable to delete user ${id}.`,
      });
    }
  };


  exports.userDelete = async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndRemove(id);
      console.log("User deleted: " + req.params.id)
      res.redirect("/");
    } catch (e) {
      res.status(404).send({
        message: `unable to delete user ${id}.`,
      });
    }
  };


exports.makeAdmin= async (req, res) => {
const id = req.params.id;
try {
    await User.findOneAndUpdate({ _id: id }, { 
        isAdmin: true
        });
        res.redirect("/adminPage");
} catch (e) {
    res.status(404).send({
    message: `unable to delete user ${id}.`,
    });
}
};


exports.update = async (req, res) => {
    try {
        const userToUpdateId = req.params.id;
        const userToChange = await User.findOne({_id: userToUpdateId });
        
        const newUsername= req.body.username;
        const newName= req.body.name; 
        const newEmail= req.body.email; 

        const userWithProposedEmail = await User.findOne({ email: newEmail })
        if (userWithProposedEmail){
            if(userWithProposedEmail != userToChange && userToChange.email != userWithProposedEmail.email ) {
                res.render('editUser', { 
                    errors: { email: { message: 'email already exists' } }, 
                    userToChange: userToChange});
                return;
            }
        }

        const userWithProposedUsername = await User.findOne({ username: newUsername })
        if (userWithProposedUsername){
            if(userWithProposedUsername != userToChange && userToChange.username != userWithProposedUsername.username ) {
                res.render('editUser', { 
                    errors: { username: { message: 'username already exists' } }, 
                    userToChange: userToChange});
                return;
            }
        }

        await User.updateOne({_id: userToUpdateId},
            {$set: {
                username: newUsername,
                name: newName,
                email: newEmail
            }
        });

        if(req.body.level) {
        await User.updateOne({_id: userToUpdateId},
            {$set: {
                level: req.body.level
            }
        })
        };

        const updatedUser = await User.findOne({_id: userToUpdateId });
        res.render('editUser', { 
            errors: {} , 
            userToChange: updatedUser});
        return;
    } catch (e) {

    }
};

exports.weatherReport = async (req, res) => {

    mailingUsers = await User.find({emailOptIn:true});

    const resorts = await Resorts.find({});

    count = 0
    var didItSnow = []

    for(resort in resorts){

        const currentResort = resorts[count]

        var currentTime= Math.round((new Date()).getTime() / 1000);
        var oneWeek = currentTime - (1*604800);

        link = "http://history.openweathermap.org/data/2.5/history/city?lat="+currentResort.lat+"&lon="+currentResort.long+"&type=hour&start="+oneWeek+"&end="+currentTime+"&appid=2afd68316886e4f486a125facf22718d"
        
        const response = await axios.get(link).then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });

        const resortWeatherData = response

        weatherDescription = resortWeatherData.list[resortWeatherData.cnt-1].weather[0].description

        if(weatherDescription.toLowerCase().includes("snow")){
            didItSnow.push((currentResort._id).toString())
        }

        count ++
    }

    count = 0
    for(user in mailingUsers){

        const user = mailingUsers[count]
        const savedResorts = await Resorts.find({
        _id: {$in: user.saved}});


        if(savedResorts){

            savedCount = 0
            sendEmail = false
            for(resort in savedResorts){
                const savedResortId = savedResorts[savedCount]._id
                if(didItSnow.includes(savedResortId.toString())){
                    console.log("diditsnowincludes")
                    sendEmail = true
                    break;
                }
                
                savedCount ++
            }

            if(sendEmail){
                emailService.weatherReport(user.email)
            }
        } 

        count ++
    }

    res.redirect("/adminPage");



}