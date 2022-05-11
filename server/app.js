const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
// const router = express.Router();

// Controllers
// const resortsController = require("./controllers/resort");

const indexRouter = require("./routes/index")
// const weatherRouter = require("./routes/weather")
const resortsRouter = require("./routes/resort")
const testAPIRouter = require("./routes/testAPI")
const testDBRouter = require("./routes/testDB");
// const courchevelController  = require("../controllers/resort");

const app = express();

app.set("views", path.join(__dirname, "views"));

// Middlewear
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())




// fetch all available database data
// router.get("/getData", (req, res) => {
//     DataTransfer.find
// })

// routes
// app.get("/resort", resortsRouter.list);


// app.get("/resort/:id",resortsRouter.details, (req, res) => {
//     res.send('resort', { errors: {} })
// });

app.use("/", indexRouter)
app.use("/testAPI", testAPIRouter)
app.use("/testDB", testDBRouter)
// app.use("/courchevel", courchevelController.courchevel)
app.use("/resort", resortsRouter.list)


app.use(express.static(path.join(__dirname, "public")));


module.exports = app;