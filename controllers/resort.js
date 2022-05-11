const Resorts = require("../models/Resort");
const Historics = require("../models/Historic");
const axios = require("axios");

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

        const weekStart = await Historics.find({resort_id: resortId}).sort({forwardscore: -1}).limit(1).select("dayofyear -_id");
        const weekStartDay = await weekStart[0].dayofyear
        const date = new Date(2023,0);
        const bestDate = new Date(date.setDate(weekStartDay))

        console.log(bestDate);
        link = "https://api.openweathermap.org/data/2.5/weather?lat="+resortDetails.lat+"&lon="+resortDetails.long+"&appid=2afd68316886e4f486a125facf22718d"

        const response = await axios.get(link).then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });
        weatherData = response
        res.render("resort", { resortDetails: resortDetails, weatherData: weatherData,bestDate:bestDate});
        
     } catch (e) {
         res.status(404).send({message: JSON.stringify(e)})
     }
};
