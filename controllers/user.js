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
            level:1,
            emailOptIn: true // TODO: fix this to receive the checkbox
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
        console.log(req.url)
        await User.updateOne(
        { _id:userId}, {
            $pull: {
            saved: resortId
            }
        });
        res.redirect("/");
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
        const updatedUser = await User.findOne({_id: userToUpdateId });
        res.render('editUser', { 
            errors: {} , 
            userToChange: updatedUser});
        return;
    } catch (e) {

    }
};
