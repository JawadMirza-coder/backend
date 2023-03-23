const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const authenticate = require("./auth");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const config = require("./config");

const app = express();

/**
 * Middleware for parsing JSON body of requests
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to pass control to the next middleware function
 */
app.use(bodyParser.json());

/**
 * Middleware for parsing URL-encoded body of requests
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to pass control to the next middleware function
 */
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});
const url = config.mongoUrl;
console.log(url);
const connect = mongoose.connect(url);
mongoose.set('strictQuery', true);
connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

/**
 * Middleware for handling sessions
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to pass control to the next middleware function
 */
app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

// Middleware for initializing Passport authentication
app.use(passport.initialize());

// Middleware for handling Passport sessions
app.use(passport.session());

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware for logging requests
app.use(logger("dev"));

// Middleware for parsing JSON body of requests
app.use(express.json());

// Middleware for parsing URL-encoded body of requests
app.use(express.urlencoded({ extended: false }));

// Middleware for parsing cookies
app.use(cookieParser());

// Import the router for handling user requests
const router = require("./routes/users");
const InfoRouter = require("./routes/Info");
const Sale_StatisticsRouter = require("./routes/Sale_Statistics");
const SalesRouter = require("./routes/Sales");
const CountriesRouter = require("./routes/Countries");

// Set up the middleware for handling user requests
app.use("/", router);
app.use("/users", InfoRouter);
app.use("/sale_statistics", Sale_StatisticsRouter);
app.use("/sales", SalesRouter);
app.use("/countries", CountriesRouter);

// Middleware for handling 404 errors
app.use(function (req, res, next) {
  next(createError(404));
});

// Middleware for handling errors
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
