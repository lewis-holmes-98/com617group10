const Resorts = require("../../models/Resort");
const Historics = require("../../models/Historic");
const axios = require("axios");
const express = require('express');
const router = express.Router();

exports.list = async (req, res) => {
    try {
        const resorts = await Resorts.find({});
        res.send("index", { resorts: resorts });
        
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
        link = "https://api.openweathermap.org/data/2.5/weather?lat="+resortDetails.lat+"&lon="+resortDetails.long+"&appid=2afd68316886e4f486a125facf22718d"

        const response = await axios.get(link).then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });
        weatherData = response
        res.send("resort", { resortDetails: resortDetails, weatherData: weatherData});
        
     } catch (e) {
         res.status(404).send({message: JSON.stringify(e)})
     }
};


module.exports = router;