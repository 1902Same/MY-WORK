const PORT = process.env.PORT || 3000;

var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
var path = require("path");
const mongoose = require("mongoose");

////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://root:root@cluster0.cnbo3.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

/////////////////////////Connect & Disconnect Events///////////////////
mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected")
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1)
});

mongoose.connection.on('error', function (err) {
    console.log("Mongoose connection error: ", err);
    process.exit(1)
});

process.on('SIGINT', function () {
    console.log("App is terminating");
    mongoose.connection.close(function () {
        console.log("Mongoose default connection closed");
        process.exit(0)
    });
});

var userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "gender": String,
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var userModel = mongoose.model("users", userSchema);

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/", express.static(path.resolve(path.join(__dirname, "frontend"))));

app.post("/signup", (req, res, next) => {
    if (!req.body.name
        || !req.body.email
        || !req.body.password
        || !req.body.phone
        || !req.body.gender) {

        res.status(403).send(`
        please send name, email, passwod, phone and gender in json body.
            e.g:
            {
                "name": "malik",
                "email": "malikasinger@gmail.com",
                "password": "abc",
                "phone": "03001234567",
                "gender": "Male"
            }`)
        return;
    }


    var newUser = new userModel({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "phone": req.body.phone,
        "gender": req.body.gender,
    })

    newUser.save((err, data) => {
        if (!err) {
            res.send({
                message: "User created",
                status: 200
            });
        }
        else {
            console.log(err);
            res.send({
                message: "User create error" + err,
                status: 503
            });
        }
    });
});

app.post("/login", (res, req, next) => {

    console.log(req.body.email);


    if (!req.body.email || !req.body.password) {

        res.status(403).send(`
            please send email and passwod in json body.
            e.g:
            {
                "email": "malikasinger@gmail.com",
                "password": "abc",
            }`)
        return;
    }

    userModel.findOne({ email: req.body.email },
        function (err, user) {
            if (err) {
                res.status(500).send({
                    message: "an error occured: " + JSON.stringify(err)
                });
            } else if (user) {

                res.send({
                    message: "login success",
                    user: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        gender: user.gender,
                    },
                });

            }

        });


    // if (!req.body.email || !req.body.password) {
    //     res.status(403).send(`
    //         please send email and passwod in json body.
    //         e.g:
    //         {
    //             "email": "malikasinger@gmail.com",
    //             "password": "abc",
    //         }`)
    //     return;
    // }

    // userModel.findOne({ uemail: req.body.uemail },
    //     function (err, user) {
    //         if (err) {
    //             res.status(500).send({
    //                 message: "An error occured: " + JSON.stringify(err)
    //             });
    //         }
    //         else if (user) {
    //             if (user.password === req.body.password) {
    //                 res.send({
    //                     message: "Login Success",
    //                     user: {
    //                         name: user.name,
    //                         uemail: user.uemail,
    //                         phone: user.phone,
    //                         gender: user.gender
    //                     }
    //                 });
    //             } else {
    //                 res.status(401).send({
    //                     message: "Incorrect Password"
    //                 })
    //             }
    //         }
    //         else {
    //             res.status(403).send({
    //                 message: "User not found!"
    //             });
    //         }
    //     });
});

app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT)
});