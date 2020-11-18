const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
  console.log("Database sucessfully connected")
},
error => {
  console.log("Database could not be connected: " + error)
}
);

require("../models/admin.model");
require("../models/user.model");
require("../models/doctor.model");
require("../models/patient.model");
require("../models/cv.model");
require("../models/messages.model");
require("../models/sibling.model");
