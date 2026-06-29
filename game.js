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
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") cat.speedX = 0;
});

function gameloop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// gravity 
cat.speedY += 0.5; 
cat.x += cat.speedX;
cat.y += cat.speedY;


// floor
if (cat.y + cat.height > canvas.height) {
    cat.y = canvas.height - cat.height;
    cat.speedY = 0;
    cat.onGround = true;
} else {
    cat.onGround = false;
}

// draw cat
ctx.fillStyle = "orange";
ctx.fillRect(cat.x, cat.y, cat.width, cat.height);

requestAnimationFrame(gameloop);
}

gameloop();
