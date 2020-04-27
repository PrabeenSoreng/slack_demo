const socket = io("http://localhost:5000");
const socket2 = io("http://localhost:5000/admin");

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", {
    data: "Data from the client.",
  });
});

socket.on("joinedLevel1", (msg) => {
  console.log(msg);
});

socket2.on("welcomeAdminChannel", (msg) => {
  console.log(msg);
});
