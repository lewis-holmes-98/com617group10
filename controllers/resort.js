const Resorts = require("../models/Resort");

exports.list = async (req, res) => {
    try {
        const resorts = await Resorts.find({});
        res.render("resorts", { resorts: resorts })
    } catch (e) {
        res.status(404).send({message: "OPPSIE DAISY"})
    }
};

exports.courchevel = async (req, res) => {
    try {
        const resort = await Resorts.find({formattedName: Courchevel})
        res.render(courchevel, {resort: courchevel})
    } catch (e) {
        res.status(404).send({message: "OPPSIE DAISY"})
    }
};

// exports.update