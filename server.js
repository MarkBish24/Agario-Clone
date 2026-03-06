// Agar.io clone server
// Where the server is created
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () => {
    console.log("Server running on port 9000");
});

const socketio = require("socket.io");
const io = socketio(expressServer);

// app organization

// server.js is Not the entry point, it creates our servers
// and exports them
module.exports = {
    app,
    io
}


