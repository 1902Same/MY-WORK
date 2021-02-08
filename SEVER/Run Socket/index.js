function add() {
    var input = {
        userInput = document.getElementById("userInput").value
    }
}

var socket = io("http://localhost:5000/");

socket.on('connect', function () {
    console.log("Connected");
})

socket.on("NOTIFICATION", function () {
    console.log("Notification Received");
})

socket.on("COMMON_TOPIC", function () {
    console.log("Common Topic Received", message)
})