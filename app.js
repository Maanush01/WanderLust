if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

process.removeAllListeners("warning");

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

if (!dbUrl || !process.env.SECRET) {
  throw new Error("ATLASDB_URL and SECRET must be set in .env");
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in the Mongo Session Store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
//root page
// app.get('/', (req, res) => {
//     let { name ="MANUSH" }= req.cookies;
//     res.send(`hi ${name}`);
// });

app.use(session(sessionOptions));

app.use(flash());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  next();
});

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
//mongo connection
async function main() {
  await mongoose.connect(dbUrl);
}

//ListingSchema validation as middleware
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};
//ReviewSchema validation as middleware
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  return res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/api/chat", require("./routes/chat.js"));
app.use("/", userRouter);

// app.get("/demouser",async (req, res)=>{
//     let fakeUser = new User({
//         email : "manus@gmail.com",
//         username : "manus",
//     });
//     let regUser = await User.register(fakeUser,"Manus@2004");
//     res.send(regUser);
// });

//error handler for all the routes except the defined ones
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
}); //Any of the 2 can be used
// app.use((req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

//error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("listing/error.ejs", { message });
});

//port listen
app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

// I am manush!!
