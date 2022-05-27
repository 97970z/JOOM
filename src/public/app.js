const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const scroll1 = document.getElementById("scroll");

room.hidden = true;
let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
  scroll1.scrollTop = scroll1.scrollHeight;
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`Me: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  room.hidden = false;
  welcome.hidden = true;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room: ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room: ${roomName} (${newCount})`;
  addMessage(`${user} users joined 😋`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room: ${roomName} (${newCount})`;
  addMessage(`${left} user left 😭`);
});

socket.on("new_message", addMessage);
