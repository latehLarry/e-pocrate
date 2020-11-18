require("./config/config");
require("./config/conn");
require("./config/passportConfig/adminConfig");
require("./config/passportConfig/userConfig");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin.routes");
const docRoute = require("./routes/doctor.routes");
const patRoute = require("./routes/patient.routes");
const userRoute = require("./routes/user.routes");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

// Make "uploads" Folder Publicly Available
server.use('/uploads/images/doctors', express.static('uploads/images/doctors'));
server.use('/uploads/images/patients', express.static('uploads/images/patients'));
server.use('/uploads/documents/doctors', express.static('uploads/documents/doctors'));
server.use('/uploads/documents/patients', express.static('uploads/documents/patients'));


server.use(cors({origin: "*"}));

//routes
server.use("/api/admin", adminRoutes);
server.use("/api/doctors", docRoute);
server.use("/api/patients", patRoute);
server.use("/api/users", userRoute);


server.get("/", function (req, res) {
    res.send("Hello From server");
  });
  
  server.listen(process.env.PORT, function () {
    console.log("Server is running on port: " + process.env.PORT);
  });



