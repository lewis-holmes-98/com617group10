require("dotenv").config()
const mongoose = require("mongoose");
const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");


const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI), { useNewUrlParser: true };
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDb is running", err);
  process.exit()
});

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Models
const resortModel = require("./models/Resort")

// Controllers
const resortsController = require("./controllers/resort");
const { useParams } = require("react-router-dom");
// app.get("/weather", resortsController.list)
app.get("/weather", (req, res) => {
  resortModel.findOne({ name: req.useParams.formattedName})
  .then(function(dbResortName) {
    res.json(dbResortName)
  })
})