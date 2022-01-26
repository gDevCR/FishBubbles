// Canvas Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

// Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect(); // Get margins from browser border
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener('mousedown', function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener('mouseup', function () {
  mouse.click = false;
});

// Player logic
const fishLeft = new Image();
fishLeft.src = 'sprites/fishLeft.png';

const fishRight = new Image();
fishRight.src = 'sprites/fishRight.png';

class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 50; // Player element is a circle
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498; // Quadrant from width Sprite
    this.spriteHeight = 327; // Quadrant from height Sprite
  }

  update() {
    const dx = this.x - mouse.x; // Distance of X
    const dy = this.y - mouse.y; // Distance of Y

    let theta = Math.atan2(dy, dx);
    this.angle = theta;

    if (mouse.x !== this.x) {
      this.x -= dx / 30; // Speed in 30
    }
    if (mouse.y !== this.y) {
      this.y -= dy / 30; // Speed in 30
    }
  }

  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    if (this.x >= mouse.x) {
      ctx.drawImage(
        fishLeft,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 60,
        0 - 45,
        this.spriteWidth / 4,
        this.spriteHeight / 4,
      );
    } else {
      ctx.drawImage(
        fishRight,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 60,
        0 - 45,
        this.spriteWidth / 4,
        this.spriteHeight / 4,
      );
    }
    ctx.restore();
  }
}

const player = new Player();

// Bubbles logic
const bubblesArray = [];
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.collitioned = false;
    this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
  }
  update() {
    this.y -= this.speed;

    //Calculate distance
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

const bubbleSound1 = document.createElement('audio');
bubbleSound1.src = 'audio/sound1.ogg';

const bubbleSound2 = document.createElement('audio');
bubbleSound2.src = 'audio/sound2.ogg';

function handleBubbles() {
  if (gameFrame % 50 === 0) {
    bubblesArray.push(new Bubble());
  }

  // TODO: Fix to evite use double for sentence for two actions
  for (let i = 0; i < bubblesArray.length; i++) {
    bubblesArray[i].update();
    bubblesArray[i].draw();
  }

  for (let i = 0; i < bubblesArray.length; i++) {
    const bubleObj = bubblesArray[i];
    if (bubleObj.y < 0 - bubleObj.radius * 2) {
      bubblesArray.splice(i, 1);
    } else {
      if (bubleObj.distance < bubleObj.radius + player.radius) {
        if (!bubleObj.collitioned) {
          // Add score
          score++;

          // Sound effect of collition
          if (bubleObj.sound === 'sound1') {
            bubbleSound1.play();
          } else {
            bubbleSound2.play();
          }

          // Update object
          bubleObj.collitioned = true;
          bubblesArray.splice(i, 1);
        }
      }
    }
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBubbles();
  player.update();
  player.draw();

  // Info
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 10, 50);

  //console.log(gameFrame);
  gameFrame++; // Counter for establish periodic events to our game
  canvasPosition = canvas.getBoundingClientRect();
  requestAnimationFrame(animate);
}
animate();
