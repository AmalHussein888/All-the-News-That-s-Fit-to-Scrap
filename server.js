var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var db = require("./models");

var PORT = process.env.PORT || 3000;


var app = express();


app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));



mongoose.Promise = Promise;




require("./routes/api-routes.js")(app);

var db = process.env.MONGODB_URI || "mongodb://localhost/webscrapingHW";

mongoose.connect(db, function(error) {
  if (error) {
      return error;
  }
  else {
    console.log("Connection Success!");
  }
});

app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});