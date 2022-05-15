require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/User");
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const { PORT, MONGODB_URI } = process.env;

/* Controllers */
const resortsController = require("./controllers/resort");
const usersController = require("./controllers/user");
const savedController = require("./controllers/saved");
const adminController = require("./controllers/admin");

/* Database connection*/
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
   }).then(() => {
    console.log('Connected to database.');
});
  
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("Not connecting to database.");
    process.exit();
});


/* Middleware */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'secret database', cookie: { expires: new Date(253402300000000) } }))

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

const authEdit = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if(!(user.level == 2 || user.level == 3 || req.session.userID == req.params.id)) {
    return res.redirect('/');
  }
  next()
}


/* App routes */
// Home
app.get("/", resortsController.list);

// Resort page
app.get("/resort/:id",resortsController.details, (req, res) => {res.render('resort', { errors: {} })});

// Users
app.get("/signup", (req, res) => {res.render('signup', { errors: {} })})
app.post("/signup", usersController.create);

app.get("/login", (req, res) => {res.render('login', { errors: {} })});
app.post("/login", usersController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

// Edit and delete users
app.get("/users/editUser/:id",authEdit, usersController.edit, (req, res) => {res.render('editUser', { errors: {} })});
app.get("/users/userDelete/:id", authEdit, usersController.userDelete);
app.get("/users/adminDelete/:id",authMiddleware, usersController.adminDelete);
app.get("/users/makeAdmin/:id",authMiddleware, usersController.makeAdmin);
app.post("/users/update/:id",authMiddleware, usersController.update);
app.get("/user/save/:id",usersController.save);
app.get("/user/unsave/:id",usersController.unsave);
app.get("/saved/unsave/:id",savedController.unsave);

// Email users route
app.get("/emailUsers",usersController.weatherReport);

// Admin page
app.get("/adminPage",authMiddleware, adminController.adminControls);

// Saved page
app.get("/saved", authMiddleware, savedController.list, (req, res) => {
  res.render("saved", { errors: {} });
});

/* Local app */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });


nodeCron = require("node-cron")
const emailService = require("./emailService.js");
const job = nodeCron.schedule("00 00 18 * * *", () => {
    emailService.weatherReport()
  });