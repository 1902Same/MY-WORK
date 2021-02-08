var express = require("express");
var path = require("path");
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require("http");
var socketIO = require('socket.io');

var app = express();
var PORT = process.env.PORT || 5000;
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get("/signup", (req, res, next) => {
    res.send("Signup Response Accessed")
})

app.use("/", express.static(path.resolve(path.join(__dirname, 'public'))))
var server = http.createServer(app);
var io = socketIO(server);

var user = [];



app.listen(PORT, () => {
    console.log("Server is running on Port : ", PORT);
})