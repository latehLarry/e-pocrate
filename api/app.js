require("./config/config");
require("./config/conn");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(cors({origin: "*"}));


server.get("/", function (req, res) {
    res.send("Hello From server");
  });
  
  server.listen(process.env.PORT, function () {
    console.log("Server is running on port: " + process.env.PORT);
  });



