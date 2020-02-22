// Dependencies
// =============================================================
var express = require("express");
var path = require("path");



// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting up empty array for table list
// =============================================================
var reservations = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/cur-res", function(req, res) {
  res.sendFile(path.join(__dirname, "cur-res.html"));
});

app.get("/add-res", function(req, res) {
    res.sendFile(path.join(__dirname, "add-res.html"));
  });

// Displays all tables

app.get("/api/tableList", function(req, res) {
  // these ... returns a reservations array as a string and then returns waitlist array as a string
  //then combines these to strings into a new array to have a full display list
  return res.json([...reservations,...waitlist]);
});


// Create New Characters - takes in JSON input
app.post("/api/tableList", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);
  if(reservations.length>5){
    reservations.push(newTable);
    res.json("reservation");

  }
  else{
    waitlist.push(newTable)
    res.json("waitlist");

  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
