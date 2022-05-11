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
            password: req.body.password,
            level:"U",
            emailOptIn: true // TODO: fix this to receive the checkbox
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
};


exports.unsave = async (req, res) => {
    try {
        const resortId = req.params.id;
        const userId = req.session.userID;
        await User.updateOne(
        { _id:userId}, {
            $pull: {
            saved: resortId
            }
        });
        res.redirect("/saved");
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
        const userToChange = await User.findOne({_id: userId });
        res.render("editUser", {userToChange: userToChange});
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
        const userId = req.session.userID;
        const newUsername= req.body.username;
        const newName= req.body.name; 
        const newEmail= req.body.email; 

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

        User.updateOne({_id: userId},
            { $set: {
                username: newUsername,
                name: newName,
                email: newEmail
                }
            });
    } catch (e) {

    }
};
