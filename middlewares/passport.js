const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt').ExtractJwt;
const User = require('../models/UserModel');
const apiConfig = require('../config/api');

function setPassortConfigs(passport) {
  const options = {};

  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = apiConfig.secretOrKey;
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findById({ id: jwt_payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
}

module.exports = setPassortConfigs;
