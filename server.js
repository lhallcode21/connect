var express = require("express");
var app = express();
app.get("/", function(req, res) {
  //  res.send("Welcome to connect!");
  res.sendFile(__dirname + "/adahacks2019.html");
});
var server = app.listen(3000, function() {});
