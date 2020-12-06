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

// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var notePage = req.body;
  
  
  
    console.log(notePage);
  
    dataBase.push(notePage);
    //Might need to change this to ./db/db.json
     fs.writeFile(dataBase, JSON.stringify(dataBase), err => {
         if (err){
             console.log("You've got an error")
             res.sendStatus(404);
         } else {res.sendStatus(200);
         }
     }); 



    res.json(newCharacter);
  });
  

  







  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  