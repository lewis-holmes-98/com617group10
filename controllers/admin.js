const Resorts = require("../models/Resort");
const Users = require("../models/User");


exports.adminControls = async (req, res) => {
    try {
        const resorts = await Resorts.find({});
        const users = await Users.find({});
        // show count of resort favourites, show count of users, show each user with an option to make admin and delete account
        res.render("adminPage", { resorts: resorts, users:users });
        
    } catch (e) {
        res.status(404).send({message: "ERROR"})
    }
};