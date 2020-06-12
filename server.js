//Dependencies
var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");

//Require all models
var db = require("./models");

//Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

//Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

//Parse request body as JSON
app.use(express.urlencoded({extended: true}))

//parses the client-side data and converts it to JSON
app.use(express.json())

// // Use morgan logger for logging requests
// // app.use(logger("dev"));

app.engine("handlebars", handlebars({defaultLayout: "main"}));

//the first argument is the name of the extension, the second argument is where you want to populate/render the whole page 
app.set("view engine", "handlebars");

//static refers to converting the public folder (the local host) into a static route
app.use(express.static("public"));

var apiRoute = require("./routes/apiRoutes");

apiRoute(app);

// Set the app to listen on port 3000
app.listen(PORT, function() {
    console.log("App running on Port 3000!");
  });







