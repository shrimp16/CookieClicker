const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { off } = require('process');

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

    let data = fs.readFileSync('./Data/accounts.json');
    let myObject = JSON.parse(data);
    let id = "default";

    for(var i = 0; i < myObject.length; i++){
        if(myObject[i].user === req.body[0].username && myObject[i].password === req.body[0].password){
            //201
            res.send(`ID: ${myObject[i].id}`);
            return;
        }
    }

    res.send("wrong");
    
})