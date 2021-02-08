var express = require("express");
var path = require("path");
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var PORT = process.env.PORT || 5000;
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get("/signup", (req, res, next)=>{
    res.send("Signup Response!")
})

app.use("/", express.static(path.resolve(path.join(__dirname, 'public'))))

var server = http.createServer(app);
var io = socketIO(server);

var users = [];

io.on('connection', (user)=>{
    
    console.log("User ID : ", user.id);
    user.emit("NOTIFICATION","some data");

    users.push(user);
    console.log("User Count : ", users.length);

    setTimeout(function (){
        users[0].emit("NOTIFICATION","New Message")
    },10000)

    console.log('A User Connected!')
});

setInterval(function () {
    io.emit("COMMON-TOPIC", `Some common data: ${new Date().getSeconds()}`)
}, 3000);

server.listen(PORT, ()=>{
    console.log("Server is running on PORT : " , PORT);
})