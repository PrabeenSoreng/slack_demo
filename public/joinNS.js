function joinNS(endpoint) {
  const nsSocket = io(`http://localhost:5000${endpoint}`);
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

  nsSocket.on("messageToClients", (msg) => {
    console.log(msg);
    document.querySelector("#message").innerHTML += `<li>${msg.text}</li>`;
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newMessage = document.querySelector("#user-message").nodeValue;
      socket.emit("newMessageToServer", { text: newMessage });
    });
}
