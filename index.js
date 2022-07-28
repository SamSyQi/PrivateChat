const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//Data
const messages = [];

io.on('connection', (socket) => {
    socket.on('client-connected-announce', (name) => {
        console.log(name, "has connected to the server.");
    })
    io.emit("loading-messages", messages);
    socket.on("user-chat", (data) => {
        messages.push(data);
        io.emit("loading-messages", messages);
    })
})

server.listen(8080, () => {
    console.log("Listening on port 8080");
})