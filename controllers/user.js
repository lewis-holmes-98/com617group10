const Resorts = require("../models/Resort");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const emailService = require('../emailService.js');
const { off } = require("../models/Resort");
const axios = require("axios");
require("dotenv").config();

const { OWM_API_KEY } = process.env;

// Login a user
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        // if user not found
        if (!user) {
            res.render('login', { errors: { username: { message: 'username not found' } } })
            return;
        }

        // compare hashed password
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

// Create a new user.
exports.create = async (req, res) => {
    try {

        // If opt-in to email
        if (req.body.emailYes) emailOpt = true
        else emailOpt = false

        // Create user
        const user = new User({ 
            username: req.body.username,
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password,
            level:1,
            emailOptIn: emailOpt
            });

        // Check if the proposed email and username already exists
        const userWithProposedEmail = await User.findOne({ email: req.body.email })
        const usernameExists = await User.findOne({ username: req.body.username })

        // If exists then give errors
        if(userWithProposedEmail ) {
            res.render('signup', { errors: { email: { message: 'email already exists' } }})
            return;
        }

        if(usernameExists ) {
            res.render('signup', { errors: { username: { message: 'username already exists' } }})
            return;
        }
        
        // If does not exist then save new user
        await user.save();

        // Try and send sign up email
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

// Save resort.
exports.save = async (req, res) => {
    try {
        const resortId = req.params.id;
        const userId = req.session.userID;
        const resortName = await Resorts.findOne({_id: resortId})
        
        // Add saved resort to users saved set 
        await User.updateOne({ _id: userId}, {$addToSet:{saved: resortId}});
        res.redirect(`/resort/`+resortName.name);
    } catch (e) {
        res.status(404).send({
        message: `Cannot leave -  error ${id}.`,
        });
    }
};

// Remove saved resort from user.
exports.unsave = async (req, res) => {
    try {
        const resortId = req.params.id;
        const userId = req.session.userID;
        const resortName = await Resorts.findOne({_id: resortId})
        
        // Remove resort Id from saved
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

// Provide EditUser page with user profile.
exports.edit = async (req, res) => {
    try {
        const userId = req.params.id;
        const userToUpdate = await User.findOne({_id: userId });

        res.render("editUser", {userToChange: userToUpdate});
    } catch (e) {
        res.status(404).send({message: JSON.stringify(e)});
    }
};

// Remove a user profile as an admin.
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

// Delete profile as a user.
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

// Make a user an admin as an admin.
exports.makeAdmin= async (req, res) => {
    const id = req.params.id;
    try {
        await User.findOneAndUpdate({ _id: id }, {isAdmin: true});

        res.redirect("/adminPage");
    } catch (e) {
        res.status(404).send({
        message: `unable to delete user ${id}.`,
        });
    }
};

// Update a profile.
exports.update = async (req, res) => {
    try {
        const userToUpdateId = req.params.id;
        const userToChange = await User.findOne({_id: userToUpdateId });
        
        // Get params
        const newUsername= req.body.username;
        const newName= req.body.name; 
        const newEmail= req.body.email; 

        // If new proposed email already exists then reject
        const userWithProposedEmail = await User.findOne({ email: newEmail })
        if (userWithProposedEmail){
            if(userWithProposedEmail != userToChange && userToChange.email != userWithProposedEmail.email ) {
                res.render('editUser', { 
                    errors: { email: { message: 'email already exists' } }, 
                    userToChange: userToChange});
                return;
            }
        }

        // If new proposed username already exists then reject
        const userWithProposedUsername = await User.findOne({ username: newUsername })
        if (userWithProposedUsername){
            if(userWithProposedUsername != userToChange && userToChange.username != userWithProposedUsername.username ) {
                res.render('editUser', { 
                    errors: { username: { message: 'username already exists' } }, 
                    userToChange: userToChange});
                return;
            }
        }

        // update user
        await User.updateOne({_id: userToUpdateId},
            {$set: {
                username: newUsername,
                name: newName,
                email: newEmail
            }
        });

        // If updating user level
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
        res.status(404).send({message: JSON.stringify(e)});
    }
};

// Send weather report
exports.weatherReport = async (req, res) => {

    mailingUsers = await User.find({emailOptIn:true});

    const resorts = await Resorts.find({});

    count = 0
    var didItSnow = []

    // Find whether it has snowed or not at each resort
    for(resort in resorts){

        const currentResort = resorts[count]

        var currentTime= Math.round((new Date()).getTime() / 1000);
        var oneWeek = currentTime - (1*604800);

        link = "http://history.openweathermap.org/data/2.5/history/city?lat="+currentResort.lat+"&lon="+currentResort.long+"&type=hour&start="+oneWeek+"&end="+currentTime+"&appid="+OWM_API_KEY
        
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

    // For each mailing list user construct and send email if it has snowed
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