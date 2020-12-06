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
app.use(express.static('public'))


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(dataBase);
});


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.post("/api/notes", function (req, res) {
    
    var notePage = req.body;

    dataBase.push(notePage);
    dataBase.forEach((o, i) => o.id = i + 1);

    
    fs.writeFile("./db/db.json", JSON.stringify(dataBase), err => {
        if (err) {
            console.log("You've got an error")
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    });
});

app.delete("/api/notes/:id", function (req, res){

    var deleted =  req.params.id;
    for ( let i = 0; i < dataBase.length; i++){
        if(dataBase[i].id == deleted){
            dataBase.splice(i,1)
            break;
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(dataBase), err => {
        if (err) {
            console.log("You've got an error")
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    });
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
