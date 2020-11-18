const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

passport.use('user-rule',
  new localStrategy({ usernameField: 'username' },
    (username, password, done) => {
      User.findOne({ username: username },
        (err, doctor) => {
          if (err)
            return done(err);
          // unknown user
          else if (!doctor)
            return done(null, false, { message: "Cette utilisateur n'\existe pas!" });
          // wrong password
          else if (!doctor.verifyPassword(password))
            return done(null, false, { message: 'Mot de passe incorrecte!' });
          // authentication succeeded
          else
            return done(null, doctor);
        });
    })
);

