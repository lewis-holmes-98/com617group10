require("dotenv").config()
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

const indexRouter = require("./routes/index")
const testAPIRouter = require("./routes/testAPI")

// const { PORT, MONGODB_URI } = process.env;

// mongoose.connect(MONGODB_URI), { useNewUrlParser: true };
// mongoose.connection.on("error", (err) => {
//   console.error(err);
//   console.log("MongoDB connection error. Please make sure MongoDb is running", err);
//   process.exit()
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

app.set("views", path.join(__dirname, "views"));

// Middlewear
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"))
// });

app.use("/", indexRouter)
app.use("/testAPI", testAPIRouter)







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