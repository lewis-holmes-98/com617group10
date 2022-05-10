const Resorts = require("../models/Resort");
const User = require('../models/User');
const bcrypt = require('bcrypt');


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

        const user = new User({ 
            username: req.body.username,
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password
            });

        const emailExists = await User.findOne({ email: req.body.email })
        const usernameExists = await User.findOne({ username: req.body.username })

        if(emailExists ) {
            res.render('signup', { errors: { email: { message: 'email already exists' } }})
            return;
        }

        if(usernameExists ) {
            res.render('signup', { errors: { username: { message: 'username already exists' } }})
            return;
        }
        await user.save();
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
}



