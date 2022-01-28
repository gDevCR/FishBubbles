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
    this.isHurt = false; // Indicate if the player is recent hurt
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

    if (gameFrame % 5 === 0) {
      this.frame++;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame === 3 || this.frame === 7 || this.frame === 11) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frameY = 2;
      else this.frameY = 0;
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
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

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
