const express = require("express");
var helmet = require('helmet')

var PouchDB = require("pouchdb-node");

const app = express();

// create pouchdb database in .data
var TempPouchDB = PouchDB.defaults({prefix: '.data'})


app.use(helmet()) // secure http headers.
app.use('/db', require('express-pouchdb')(TempPouchDB));

var db = new PouchDB("todoss");
var remoteCouch = 'https://panoramic-chronometer.glitch.me/db';

// tell express web server where our files live
app.use(express.static("public"));


app.get("/", function(req, res) {
  //  res.send("Welcome to connect!");
  res.sendFile(__dirname + "/adahacks2019.html");
});
var server = app.listen(3000, function() {});
