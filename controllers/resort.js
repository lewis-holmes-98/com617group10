const Resorts = require("../models/Resort");
const Historics = require("../models/Historic");
const Users = require("../models/User");
const axios = require("axios");
require("dotenv").config();

const { OWM_API_KEY } = process.env;

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

        const usersSaved = await Users.aggregate([
            {$unwind: "$saved"},
            {"$match": {"saved": resortId}}
        ])

        const weekStart = await Historics.find({resort_id: resortId}).sort({forwardscore: -1}).limit(1).select("dayofyear -_id");
        const weekStartDay = await weekStart[0].dayofyear
        const emptyDate = new Date(2023,0);
        const bestDate = new Date(emptyDate.setDate(weekStartDay)).toLocaleDateString()

        link = "https://api.openweathermap.org/data/2.5/weather?lat="+resortDetails.lat+"&lon="+resortDetails.long+"&appid="+OWM_API_KEY
        const response = await axios.get(link).then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });
        weatherData = response;

        var currentTime= Math.round((new Date()).getTime() / 1000);
        var twoWeek = currentTime - (2*604800);
        var oneWeek = currentTime - (1*604800);

        link = "http://history.openweathermap.org/data/2.5/history/city?lat="+resortDetails.lat+"&lon="+resortDetails.long+"&type=hour&start="+twoWeek+"&end="+oneWeek+"&appid="+OWM_API_KEY
        link2 = "http://history.openweathermap.org/data/2.5/history/city?lat="+resortDetails.lat+"&lon="+resortDetails.long+"&type=hour&start="+oneWeek+"&end="+currentTime+"&appid="+OWM_API_KEY
        const response2 = await axios.get(link).then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });
        twoWeekweatherData = response2
        const response3 = await axios.get(link2).then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });
        oneWeekweatherData = response3
        res.render("resort", { 
            resortDetails: resortDetails, 
            weatherData: weatherData, 
            twoWeekData: twoWeekweatherData, 
            oneWeekData: oneWeekweatherData,
            bestDate: bestDate,
            usersSaved: usersSaved
        });       
     } catch (e) {
         res.status(404).send({message: JSON.stringify(e)})
     }
};
