//check environment
const env = process.env.NODE_ENV || "development";
//check config env
const config = require("./config.json");
const envConfig = config[env];
//adding env config values to process.env
Object.keys(envConfig).forEach((key) => (process.env[key] = envConfig[key]));