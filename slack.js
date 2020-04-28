const express = require("express");
const socketio = require("socket.io");
let namespaces = require("./data/namespaces.js");

const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(5000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  socket.emit("nsList", nsData);
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
    nsSocket.on("joinRoom", (roomToJoin, numberOfMembersCB) => {
      nsSocket.join(roomToJoin);
      io.of("/wiki")
        .in(roomToJoin)
        .clients((error, clients) => {
          numberOfMembersCB(clients.length);
        });
    });
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "rbunch",
        avatar: "https://via.placeholder.com/30",
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      io.of("/wiki").to(roomTitle).emit("messageToClients", fullMsg);
    });
  });
});
