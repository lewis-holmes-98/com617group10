require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/User");
app.set("view engine", "ejs");

const { PORT, MONGODB_URI } = process.env;

/* Controllers */
const resortsController = require("./controllers/resort");
const usersController = require("./controllers/user");
const savedApiController = require("./controllers/api/saved");
const savedController = require("./controllers/saved");
const adminController = require("./controllers/admin");

/* Database */
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    // useCreateIndex: true, 
    // autoIndex: true, 
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

/* App routes */
app.get("/", resortsController.list);


app.get("/resort/:id",resortsController.details, (req, res) => {
    res.render('resort', { errors: {} })
});


/* Users */
app.get("/signup", (req, res) => {
  res.render('signup', { errors: {} })
});

app.post("/signup", usersController.create);

app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});

app.post("/login", usersController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/users/editUser/:id",usersController.edit);
//app.get("/users/userDelete/:id", usersController.userDelete);
app.get("/users/adminDelete/:id", usersController.adminDelete);
app.get("/users/makeAdmin/:id", usersController.makeAdmin);

/* Admin page */
app.get("/adminPage", adminController.adminControls);

/* Saved */
app.post("/api/saved", savedApiController.create);

app.get("/saved", authMiddleware, savedController.list, (req, res) => {
  res.render("saved", { errors: {} });
});

app.get("/user/unsave/:id",usersController.unsave);



/* Local app */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
