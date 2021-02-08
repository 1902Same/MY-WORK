// var socket = io("http://localhost:5000");

function Add() {
    var userInput = {
        username: document.getElementById("userInput").value,
    }
    const Http = new XMLHttpRequest();
    const url = "http://localhost:5000";
    Http.open("POST", url + "/add");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(userInput));
    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {
            let JSONres = JSON.parse(Http.responseText);
            console.log(JSONres.username);
        }
    }
    return false;
}

function getData() {

    const Http = new XMLHttpRequest();
    const url = "http://localhost:5000";
    Http.open("GET", url + "/add");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send();
    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {
            let JSONres = JSON.parse(Http.responseText);
            for (i = 0; i < JSONres.length; i++) {
                var eachuser = document.createElement("p");
                eachuser.innerHTML = `<p>${JSONres[i].username}</p>`

                document.getElementById("show").appendChild(eachuser);
            }
        }
    }



}


// socket.on('connect', function () {
//     console.log("Connected")
// });

// socket.on("NOTIFICATION", function () {
//     console.log("Notification Received!")
// });

// socket.on("COMMON-TOPIC", function (message) {
//     console.log("Common Topic Received Message!", message)
// })