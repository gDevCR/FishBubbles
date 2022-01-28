class Enemy {
  constructor() {
    this.x = canvas.width - 200;
    this.y = Math.random() * (canvas.height - 150) + 90;
    this.radius = 60;
    this.speed = Math.random() * 2 + 2;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 418;
    this.spriteHeight = 397;
  }
  draw() {
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    ctx.drawImage(
      enemyImage,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 60,
      this.y - 70,
      this.spriteWidth / 3,
      this.spriteHeight / 3,
    );
  }
  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.radius * 2) {
      this.x = canvas.width + 200;
      this.y = Math.random() * (canvas.height - 150) + 90;
      this.speed = Math.random() * 2 + 2;
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
    //Collition with player
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius + player.radius) {
      if (globalLife === 0) {
        handleGameOver();
      } else if (!player.isHurt) {
        globalLife -= 10;
        globalLife = globalLife < 0 ? 0 : globalLife;
        player.isHurt = true;
      }
    } else {
      player.isHurt = false;
    }
  }
}
