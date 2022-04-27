require("dotenv").config()
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8080"
};

const { PORT, MONGODB_URI } = process.env;

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const PORT = process.env.PORT || 8080;

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    // useCreateIndex: true, 
    // autoIndex: true, 
   }).then(() => {
    console.log('Connected to database.');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Controllers
const resortsController = require("../../controllers/resort");

app.get("/weather", resortsController.list)