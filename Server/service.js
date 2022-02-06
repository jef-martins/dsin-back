const express = require("express");
const app = express();
/********************/
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
/********************/
module.exports = app