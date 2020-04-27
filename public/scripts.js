const socket = io("http://localhost:5000");
// const socket2 = io("http://localhost:5000/wiki");
// const socket3 = io("http://localhost:5000/mozilla");
// const socket4 = io("http://localhost:5000/linux");

socket.on("nsList", (nsData) => {
  console.log("The list of namespaces arrived", nsData);
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `
      <div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>
    `;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      console.log(`${nsEndpoint} I should go to now.`);
    });
  });

  const nsSocket = io("http://localhost:5000/wiki");
  nsSocket.on("nsRoomLoad", (nsRooms) => {
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    nsRooms.forEach((room) => {
      let glyph;
      if (room.privateRoom) glyph = "lock";
      else glyph = "globe";
      roomList.innerHTML += `
      <li class="room">
      <span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}
    </li>
      `;
    });
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log("Some one clicked on", e.target.innerText);
      });
    });
  });
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", {
    data: "Data from the client.",
  });
});

socket.on("joinedLevel1", (msg) => {
  console.log(msg);
});
