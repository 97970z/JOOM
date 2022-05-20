const colors = ["#34e7e4", "#ff5e57"];
const click = document.getElementById("main");

function clickEvent() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
  const colorChange = document.createElement("style");

  colorChange.innerHTML = `body{background: linear-gradient(45deg, #34e7e4, #ff5e57)}`;
  document.body.appendChild(colorChange);
}

// click.addEventListener("click", clickEvent);
clickEvent();
