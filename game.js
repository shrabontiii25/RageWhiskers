const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cat = {
  x: 100,
  y: 300,
  width: 40,
  height: 40,
  speedX: 0,
  speedY: 0,
  onGround: false
};

const platforms = [
  { x: 0, y: 360, width: 800, height: 40 },
  { x: 150, y: 280, width: 120, height: 15 },
  { x: 350, y: 220, width: 120, height: 15 },
  { x: 550, y: 160, width: 120, height: 15 },
];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") cat.speedX = 5;
  if (e.key === "ArrowLeft") cat.speedX = -5;
  if (e.key === "ArrowUp" && cat.onGround) cat.speedY = -12;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") cat.speedX = 0;
});

function collides(cat, platform) {
  return (
    cat.x < platform.x + platform.width &&
    cat.x + cat.width > platform.x &&
    cat.y + cat.height > platform.y &&
    cat.y + cat.height < platform.y + platform.height + cat.speedY + 1
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cat.speedY += 0.5;
  cat.x += cat.speedX;
  cat.y += cat.speedY;

  cat.onGround = false;

  for (let p of platforms) {
    if (collides(cat, p)) {
      cat.y = p.y - cat.height;
      cat.speedY = 0;
      cat.onGround = true;
    }

    ctx.fillStyle = "#888888";
    ctx.fillRect(p.x, p.y, p.width, p.height);
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(cat.x, cat.y, cat.width, cat.height);

  requestAnimationFrame(gameLoop);
}

gameLoop();