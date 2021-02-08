var express = require("express");

var app = express();

app.use(function middleware(req, res, next) {
    console.log("METHOD: ", req.method);
    console.log("URL: ", req.url);
    console.log("REMOTE ADDRESS: ", req.connection.remoteAddress);
    console.log("REMOTE PORT: ", req.connection.remotePort);
    next();
})

app.get("/bulb", function (req, res, next) {
    console.log("GET");
    res.send("Abdul is send GET");
})
app.post("/bulb", function (req, res, next) {
    console.log("POST");
    res.send("Abdul is send POST");
})
app.put("/bulb", function (req, res, next) {
    console.log("PUT");
    res.send("Abdul is send PUT");
})
app.delete("/bulb", function (req, res, next) {
    console.log("DELETE");
    res.send("Abdul is send DELETE");
})

app.listen(3000, () => {
    console.log("Abdul is runing on 3000")
})