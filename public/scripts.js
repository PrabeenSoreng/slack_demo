const username = prompt("What is your name?");
// const socket = io("http://localhost:5000");
const socket = io("http://localhost:5000", {
  query: {
    username,
  },
});

// const socket2 = io("http://localhost:5000/wiki");
// const socket3 = io("http://localhost:5000/mozilla");
// const socket4 = io("http://localhost:5000/linux");

let nsSocket = "";

socket.on("nsList", (nsData) => {
  // console.log("The list of namespaces arrived", nsData);
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
      // console.log(`${nsEndpoint} I should go to now.`);
      joinNS(nsEndpoint);
    });
  });
  joinNS("/wiki");
});
