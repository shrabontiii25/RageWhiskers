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

let enemy = {
    x: 300,
    y: 320,
    width: 40,
    height: 40,
    speed: 2,
    direction: 1
};

let score = 0;

setInterval(() => {score++;}, 1000);

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

function platformCollides(cat, platform) {
    return (
        cat.x < platform.x + platform.width &&
        cat.x + cat.width > platform.x &&
        cat.y < platform.y + platform.height &&
        cat.y + cat.height > platform.y
    );
}

function resetGame() {
    cat.x = 100;
    cat.y = 300;
    cat.speedX = 0;
    cat.speedY = 0;
    score = 0;
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

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

  //move enemy 
  enemy.x += enemy.speed * enemy.direction;
  if (enemy.x + enemy.width > 600 || enemy.x < 200) enemy.direction *= -1;

  //check enemy collision
  if (collides(cat, enemy)) resetGame();

// draw enemy
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

// draw cat
  ctx.fillStyle = "orange";
  ctx.fillRect(cat.x, cat.y, cat.width, cat.height);

  requestAnimationFrame(gameLoop);
}

gameLoop();