const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(5000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.emit("messageFromServer", {
    data: "Data from server.",
  });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.join("level1");
  socket
    .to("level1")
    .emit("joinedLevel1", `${socket.id} says I've joined level 1 room.`);
});

const adminChannel = io.of("/admin");
adminChannel.on("connection", (socket) => {
  console.log("Someone is connected to the admin Namespace");
  adminChannel.emit("welcomeAdminChannel", "Welcome to the admin channel!!!");
});
