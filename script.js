// Canvas Setup ////////////////////////////
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;
ctx.font = '50px Georgia';

let score = 0;
let globalLife = 100;
let gameFrame = 0;
let gameSpeed = 1;
let gameOver = false;

// Mouse interactivity ////////////////////////////
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

// Player logic ////////////////////////////
const player = new Player();

const fishLeft = new Image();
fishLeft.src = 'sprites/fishLeft.png';

const fishRight = new Image();
fishRight.src = 'sprites/fishRight.png';

// Bubbles logic ////////////////////////////
const bubblesArray = [];
const bubbleImage = new Image();
bubbleImage.src = 'sprites/bubble01.png';

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
    const bubleObj = bubblesArray[i];
    bubleObj.update();
    bubleObj.draw();

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

  for (let i = 0; i < bubblesArray.length; i++) {}
}

// Repeat brackground ////////////////////////////
const background = new Image();
background.src = 'sprites/background1.png';

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  BG.x1 -= gameSpeed;
  if (BG.x1 < -BG.width) BG.x1 = BG.width;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);

  BG.x2 -= gameSpeed;
  if (BG.x2 < -BG.width) BG.x2 = BG.width;
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

// Enemy ////////////////////////////
const enemy1 = new Enemy();
const enemyImage = new Image();
enemyImage.src = 'sprites/enemy01.png';

function handleEnemies() {
  enemy1.draw();
  enemy1.update();
}

// Set info of game ////////////////////////////
function setCurrentInfo() {
  var scoreData = document.querySelector('#scoreData');
  scoreData.textContent = score + ' pts';

  var healthData = document.querySelector('#healthData');
  healthData.textContent = globalLife;
}

function handleGameOver() {
  ctx.fillStyle = 'white';
  ctx.fillText('GAME OVER', 250, 250);
  gameOver = true;
}

// Animation loop ////////////////////////////
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleBubbles();
  player.update();
  player.draw();
  handleEnemies();

  // Info
  // ctx.fillStyle = 'black';
  // ctx.fillText('Score: ' + textContent , 10, 50);
  setCurrentInfo();

  //console.log(gameFrame);
  gameFrame++; // Counter for establish periodic events to our game
  canvasPosition = canvas.getBoundingClientRect();
  if (!gameOver) requestAnimationFrame(animate);
}
animate();
