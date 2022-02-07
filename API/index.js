const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.listen(3000);

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/load/:user/:password', (req, res) => {

    let readUsers = fs.readFileSync("accounts.json");
    let users = JSON.parse(readUsers);

    let readUserValues = fs.readFileSync("saves.json");
    let userValues = JSON.parse(readUserValues);

    let id;

    for(let i = 0; i < users.length; i++){
        if(users[i].user === req.params.user && users[i].password === req.params.password){
            id = users[i].id
        }
    }

    res.send(userValues[id - 1]);

})