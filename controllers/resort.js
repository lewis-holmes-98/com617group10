const Resorts = require("../models/Resort");
const Historics = require("../models/Historic");

const bodyParser = require("body-parser");

exports.list = async (req, res) => {
    try {
        const resorts = await Resorts.find({});
        res.render("index", { resorts: resorts });
        
    } catch (e) {
        res.status(404).send({message: "ERROR"})
    }
};

exports.details = async (req, res) => {
    const id = req.params.id;
    try {
        const resortDetails = await Resorts.findOne({name: id});
        const resortId = resortDetails._id;
        resortHistoric = await Historics.find({resort_id: resortId});
        
        //const

        //console.log(Historic);

        res.render("resort", { resortDetails: resortDetails });
        
    } catch (e) {
        res.status(404).send({message: "ERROR"})
    }
};
