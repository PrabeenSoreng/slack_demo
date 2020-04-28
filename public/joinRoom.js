function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (numberOfMembers) => {
    document.querySelector(".curr-room-num-users").innerHTML = `
      ${numberOfMembers} <span class="glyphicon glyphicon-user"></span>
    `;
  });
}
