var socket = io("http://localhost:5000/");

        socket.on('connect',function(){
            console.log("Connected")
        });

        socket.on("NOTIFICATION",function(){
            console.log("Notification Received!")
        });

        socket.on("COMMON-TOPIC",function(message){
            console.log("Common Topic Received Message!",message)
        })