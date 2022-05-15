const Resorts = require("../models/Resort");
const Users = require("../models/User");

// Shows resort and user data to admin.
exports.adminControls = async (req, res) => {
    try {

        const resorts = await Resorts.find({});
        const users = await Users.find({});

        const numUsers = await Users.countDocuments({level: 1});
        const numAdmins = await Users.countDocuments({level:{$gte:2}});

        const resortSaves = await Users.aggregate([
            {$unwind:"$saved"},
            {
                $group: {
                    _id:"$saved",
                    count: {$sum:1}
                }
            },
            {$lookup:
                {
                   from: "resorts",
                   localField: "_id",
                   foreignField: "_id",
                   as: "resortName"
                }
            },
            {$unwind:"$resortName"},
            {$addFields:{name:"$resortName.formattedName"}}   
        ])

        res.render("adminPage", { 
            resorts: resorts, 
            users:users,
            numUsers:numUsers,
            numAdmins:numAdmins,
            resortSaves: resortSaves
         });
        
    } catch (e) {
        res.status(404).send({message: "ERROR"})
    }
};