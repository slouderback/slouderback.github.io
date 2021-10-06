var gameScreen = document.getElementById("myCanvas");
var ctx = gameScreen.getContext("2d");
var increase = true;
var size = 100;
var xPos = 0;
//Makes the canvas full screen (You should have this for almost all canvas projects)
myCanvas.style.position = "relative";
myCanvas.style.left = 0;
myCanvas.style.top = 0;
myCanvas.width = 1100;
myCanvas.height = 250;
myCanvas.style.width = 1100 + "px";
myCanvas.style.height = 250 + "px";
//set canvas background

/////////////////////////////////

var score = 0;

//Start of main code
//Good character or main character
var character = {
  xPos: gameScreen.width / 2,
  yPos: 460,
  width: 95,
  height: 170,
  draw: function () {
    var img = new Image();
    img.src = "art/escapePod.png";
    ctx.drawImage(img, this.xPos, this.yPos, this.width, this.height);
    //         ctx.rect(this.xPos, this.yPos, this.width, this.height);
    //         ctx.stroke();
  },
  move: function () {
    if (this.goUp && this.yPos > 1) {
      this.yPos -= 5;
    }
    if (this.goDown && this.yPos < myCanvas.height - this.height) {
      this.yPos += 5;
    }
    if (this.goLeft && this.xPos > 1) {
      this.xPos -= 5;
    }
    if (this.goRight && this.xPos < myCanvas.width - this.width) {
      this.xPos += 5;
    }
  },
};
//Move for good character
document.addEventListener("keydown", function (e) {
  //Go up
  if (e.keyCode === 38) {
    character.goUp = true;
  }
  //Go Down
  if (e.keyCode === 40) {
    character.goDown = true;
  }
  //Go Left
  if (e.keyCode === 37) {
    character.goLeft = true;
  }
  //Go Right
  if (e.keyCode === 39) {
    character.goRight = true;
  }
  //Shoot
  if (e.keyCode === 32) {
    shots.push(new shot());
  }
});
document.addEventListener("keyup", function (e) {
  //Go up
  if (e.keyCode === 38) {
    character.goUp = false;
  }
  //Go Down
  if (e.keyCode === 40) {
    character.goDown = false;
  }
  //Go Left
  if (e.keyCode === 37) {
    character.goLeft = false;
  }
  //Go Right
  if (e.keyCode === 39) {
    character.goRight = false;
  }
});

function shot() {
  this.width = 15;
  this.height = 60;
  this.x = character.xPos + 40;
  this.y = character.yPos;
  this.update = function () {
    this.y -= 10;
    ctx.beginPath();
    var laser = document.createElement("img");
    laser.src = "art/laser.png";
    ctx.drawImage(laser, this.x, this.y, this.width, this.height);
  };
}
var shots = [];

//End good character

//Missile code
function missile() {
  this.width = 37.5;
  this.height = 93.75;
  this.x = Math.random() * gameScreen.width;
  this.y = -50;
  this.update = function () {
    this.y += 5;
    ctx.beginPath();
    var rocket = document.createElement("img");
    rocket.src = "art/missile.png";
    ctx.drawImage(rocket, this.x, this.y, this.width, this.height);
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
  };
}
var missiles = [];
var totalMissilesLevel = 30;
//End missile code

//Stars code
function star() {
  this.width = 10;
  this.height = 10;
  this.x = Math.random() * gameScreen.width;
  this.y = -50;
  this.update = function () {
    this.y += 3;
    ctx.beginPath();
    ctx.rect(this.x, this.y, 2, 2);
    ctx.fillStyle = "white";
    ctx.fill();
  };
}
var stars = [];

//Collision detection code missiles and player
function collisionDetection() {
  for (var i = 0; i < missiles.length; i++) {
    if (
      character.xPos < missiles[i].x + missiles[i].width &&
      character.xPos + character.width > missiles[i].x &&
      character.yPos < missiles[i].y + missiles[i].height &&
      character.yPos + character.height > missiles[i].y
    ) {
      missiles = [];
      score = 0;
      break;
    }
  }
  for (var i = 0; i < shots.length; i++) {
    for (var q = 0; q < missiles.length; q++) {
      if (
        shots[i].x < missiles[q].x + missiles[q].width &&
        shots[i].x + shots[i].width > missiles[q].x &&
        shots[i].y < missiles[q].y + missiles[q].height &&
        shots[i].y + shots[i].height > missiles[q].y
      ) {
        score++;
        missiles.splice(q, 1);
        shots.splice(i, 1);
        i--;
        q--;
        break;
      }
    }
  }
}

//Shop code
var shop = {
  xPos: gameScreen.width / 2 - 125,
  yPos: gameScreen.height / 2,
  width: 250,
  height: 100,
  draw: function () {
    ctx.beginPath();
    var img = new Image();
    img.src = "art/shop.png";
    ctx.drawImage(img, this.xPos, this.yPos, this.width, this.height);
  },
};
//Main update loop
function update() {
  ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
  ctx.beginPath();
  ctx.rect(0, 0, gameScreen.width, gameScreen.height);
  ctx.fillStyle = "black";
  ctx.fill();

  if (Math.random() > 0.2) {
    stars.push(new star()); //put a new star in the array (Normal = 4)
  }
  for (var i = 0; i < stars.length; i++) {
    stars[i].update(); //Put the stars in the array on the screen
  }
  //Gets ride of stars once they leave the screen
  for (var i = 0; i < stars.length; i++) {
    if (stars[i].y > myCanvas.height) {
      stars.splice(stars[i], 1);
    }
  }

  if (Math.random() > 0.94 && totalMissilesLevel > 0) {
    missiles.push(new missile()); //put a new missile in the array (Array is above and called missiles)
    totalMissilesLevel--;
  }
  for (var i = 0; i < missiles.length; i++) {
    missiles[i].update(); //Put the missiles in the array on the screen
  }
  //Gets ride of missiles once they leave the screen
  for (var i = 0; i < missiles.length; i++) {
    if (missiles[i].y > gameScreen.height) {
      missiles.splice(i, 1);
      i--;
    }
  }

  for (var i = 0; i < shots.length; i++) {
    shots[i].update(); //Put the shots in the array on the screen
  }
  //Gets ride of the shots once they leave the screen
  for (var i = 0; i < shots.length; i++) {
    if (shots[i].y < 0) {
      shots.splice(i, 1);
      i--;
    }
  }

  character.draw();
  character.move();
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 50);
  ctx.fillText("Missiles remaining: " + totalMissilesLevel, 10, 90);

  //calling collisionDetection function
  collisionDetection();
  window.requestAnimationFrame(update);
  console.log("Missiles" + missiles.length);
  console.log("Shots" + shots.length);

  //shop update
  if (totalMissilesLevel < 1) {
    shop.draw();
  }
}
window.requestAnimationFrame(update);
//End main update loop
