const colors = ["#34e7e4", "#ff5e57"];
const click = document.getElementById("main");

function clickEvent() {
  const colorChange = document.createElement("style");

  colorChange.innerHTML = `body{background: linear-gradient(45deg, #34e7e4, #ff5e57)}`;
  document.body.appendChild(colorChange);
}

clickEvent();
