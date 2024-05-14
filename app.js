const express = require('express');
const app = express();
const port = 3000;
const Validator = require('./helpers/validator');
const User = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var usersArray = [];
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

app.post('/register',(req, res) => {
    console.log('User Array before registration: '+JSON. stringify(usersArray, undefined, 4));
    const validator = Validator.validateRegistrationInfo(req.body, usersArray);
    if(validator.validationStatus == true){
        const user = new User(req.body.email, req.body.fullName, bcrypt.hashSync(req.body.password,8), req.body.preferences);
        usersArray.push(user);
        console.log('User Array after inserting new registration: '+JSON. stringify(usersArray, undefined, 4));
        console.log('New registered user: '+JSON. stringify(usersArray[usersArray.length-1], undefined, 4));
        return res.status(validator.responseStatus).json(usersArray[usersArray.length-1]);
    }
    else{
        return res.status(validator.responseStatus).json(validator.message);
    }
});

app.post('/login', (req, res) => {
    let emailPassed = req.body.email;
    let passwordPassed = req.body.password;
    let findUser = usersArray.filter(val => val.email == emailPassed);
    if(findUser.length == 0){
        return res.status(404).json("User not found/Invalid user");
    }
    else{
        let isPasswordValid = bcrypt.compareSync(passwordPassed, findUser[0].password);
        if(!isPasswordValid){
            return res.status(401).json("Password Incorrect");
        }
        var token = jwt.sign({
            email: emailPassed
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });
        return res.status(200).send({
            user:{
                email: findUser[0].email
            },
            message: "Login Successful",
            accessToken: token
        });
    }
});

module.exports = app;