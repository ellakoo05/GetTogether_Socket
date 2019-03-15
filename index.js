const express = require("express");
const app = express();
const port = process.env.PORT || 8880;

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin: *");
    res.header("Access-Control-Allow-Methods: GET, POST");
    res.header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
    next();
});

const server = app.listen(port, (err) => {
    if (err) {
        return false;
    }
});

var io = require("socket.io")(server);

var chatSpace = io.of("/chat");
chatSpace.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data.roomName);
    })

    socket.on("send_msg", (data) => {
        console.log(data);
        chatSpace.to(data.roomName).emit("receive_msg", data);
    })
});