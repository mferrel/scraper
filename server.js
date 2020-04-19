//Dependencies
var express = require("express");
var handlebars = require("express-handlebars");

//Initialize Express
var app = express();

var PORT = 3000;
//Middleware
//the data that you get from the webpage takes the information from the post request and makes the data clean and readable
app.use(express.urlencoded({extended: true}))
//parses the client-side data and converts it to JSON
app.use(express.json())

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