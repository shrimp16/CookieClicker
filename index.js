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

app.get('/load/:id', (req, res) => {

    let userValues = fs.readFileSync("Data/saves.json");
    userValues = JSON.parse(userValues);

    res.send(userValues[req.params.id - 1]);

})

app.post('/login', (req, res) => {

    let id;

    let username = req.body[0].username;
    let password = req.body[0].password;

    let users = fs.readFileSync("Data/accounts.json");
    users = JSON.parse(users);
    
    for(let i = 0; i < users.length; i++){
        if(username === users[i].user && password === users[i].password){
            console.log(users[i].id);
            id = users[i].id;
        }else{
            continue;
        }
    }

    res.send("The id is: " + id);
    
})