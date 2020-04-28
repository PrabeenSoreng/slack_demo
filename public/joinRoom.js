function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName);

  nsSocket.on("historyCatchUp", (history) => {
    console.log(history);
    const messagesUl = document.querySelector("#messages");
    messagesUl.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = buildHTML(msg);
      const currentMessages = messagesUl.innerHTML;
      messagesUl.innerHTML = currentMessages + newMsg;
    });
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });

  nsSocket.on("updateMembers", (numMembers) => {
    document.querySelector(".curr-room-num-users").innerHTML = `
      ${numMembers} <span class="glyphicon glyphicon-user"></span>
    `;
    document.querySelector(".curr-room-text").innerText = `${roomName}`;
  });
}
