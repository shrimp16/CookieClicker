const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.listen(3000);

app.use(bodyParser.json());

app.use('/cookie', express.static("WEB-PAGE"));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.post('/register', (req, res) => {
    
    let currentUsersRaw = fs.readFileSync('./Data/accounts.json');
    let currentUsers = JSON.parse(currentUsersRaw);

    for(let i = 0; i < currentUsers.length; i++){
        if(currentUsers[i].user === req.body.user){
            res.send("User already exists");
            return;
        }
    }

    let newID = currentUsers.length + 1;

    let newUser = {
        "user" : req.body.user,
        "password" : req.body.password,
        "id" : newID
    }

    let currentSavesRaw = fs.readFileSync('./Data/saves.json');
    let currentSaves = JSON.parse(currentSavesRaw);

    let newBlankSave = {
        "id" : newID,
        "cookieValue" : 1,
        "balance" : 0,
        "structures": [0, 0, 0, 0, 0, 0, 0],
        "waifus": [false, false, false, false, false]
    };

    currentUsers.push(newUser);

    currentSaves.push(newBlankSave);

    fs.writeFile('./Data/accounts.json', JSON.stringify(currentUsers, null, 2), (err) => {
        if(err) throw err;
        console.log("New user created");
    })

    fs.writeFile('./Data/saves.json', JSON.stringify(currentSaves, null, 2), err => {
        if(err) throw err;
        console.log("New save created");
    })

    res.send("Account Created");
})

app.post('/login', (req, res) => {

    let data = fs.readFileSync('./Data/accounts.json');
    let users = JSON.parse(data);

    for(var i = 0; i < users.length; i++){
        if(users[i].user === req.body.username && users[i].password === req.body.password){
            res.send(`${users[i].id}`);
            return;
        }
    }
    
    res.send("Wrong credentials");
    
})


app.post('/save/:id', (req, res) => {

    let data = fs.readFileSync('./Data/saves.json');
    var saves = JSON.parse(data);

    for(let i = 0; i < saves.length; i++){
        if(saves[i].id === parseInt(req.params.id)){
            saves[i].cookieValue = req.body[0].cookieValue;
            saves[i].cookieValue = req.body[0].balance;
            saves[i].structures = req.body[0].structures;
            saves[i].waifus = req.body[0].waifus;
            fs.writeFile('./Data/saves.json', JSON.stringify(saves, null, 2), (err) => {
                if(err) throw err;
                console.log("File Update");
            })
        }
    }

    res.send("Saved status")

})

app.get('/load/:id', (req, res) => {

    let userValues = fs.readFileSync("Data/saves.json");
    userValues = JSON.parse(userValues);

    res.send(userValues[req.params.id - 1]);

})