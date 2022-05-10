const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index")
// const weatherRouter = require("./routes/weather")
const resortsRouter = require("./routes/resorts")
const testAPIRouter = require("./routes/testAPI")
const testDBRouter = require("./routes/testDB");
const courchevelController  = require("../controllers/resort");

const app = express();

app.set("views", path.join(__dirname, "views"));

// Middlewear
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter)
app.use("/testAPI", testAPIRouter)
app.use("/testDB", testDBRouter)
app.use("/courchevel", courchevelController.courchevel)


// app.use("/weather", weatherRouter)
// app.use("/resorts", resortsRouter)

// todo: Add error handler



// Models
// const resortModel = require("../models/Resort")

// Controllers
// const resortsController = require("../controllers/resort");
// const { useParams } = require("react-router-dom");
// app.get("/weather", resortsController.list)
// app.get("/weather", (req, res) => {
//   resortModel.findOne({ name: req.useParams.formattedName})
//   .then(function(dbResortName) {
//     res.json(dbResortName)
//   })
// })


// Routes 
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "components", "app.jsx"));
// });

module.exports = app;