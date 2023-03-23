// the main for possport js here password is converted in salt and hash

// Import necessary modules
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./model/User");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("./config.js");

// Create and export a function to generate JWT tokens
exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey);
};

// Configure options for JWT strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
exports.verifyUser = passport.authenticate("jwt", { session: false });

passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
