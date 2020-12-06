// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")
var dataBase = require("./db/db.json")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    return res.json(characters);
  });


  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  







  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  