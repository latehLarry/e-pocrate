const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const Admin = mongoose.model("Admin");

passport.use('admin-rule',
  new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
      Admin.findOne({ email: username },
        (err, admin) => {
          if (err)
            return done(err);
          // unknown user
          else if (!admin)
            return done(null, false, { message: "Cette utilisateur n'\existe pas!" });
          // wrong password
          else if (!admin.verifyPassword(password))
            return done(null, false, { message: 'Mot de passe incorrecte!' });
          // authentication succeeded
          else
            return done(null, admin);
        });
    })
);
