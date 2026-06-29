const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cat ={
    x: 100,
    y: 300,
    width: 40,
    height: 40,
    speedX: 0,
    speedY: 0,
    onGround: false
};

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") cat.speedX = 5;
    if (e.key === "ArrowLeft") cat.speedX = -5;
    if (e.key === "ArrowUp" && cat.onGround) cat.speedY = -12;
};

