//prevent scrolling
window.addEventListener(
  'keydown',
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

var myGamePiece;
var myBackground;
var myObstacle;
var myObstacleObstacle;
var myCoin;
var myScore;
let isIt = false;

function startGame() {
  myGamePiece = new component(
    50,
    50,
    '../images/bluebird1.png',
    window.innerWidth / 2 - 590,
    50,
    'image'
  );
  myBackground = new component(2000, 320, '../images/desert1.svg', 0, 0, 'background');
  myObstacle = new obstacle(30, 85.71, '../images/comet.svg', 900, -50, 'obstacle');
  myObstacleObstacle = new obstacleObstacle(30, 85.71, '../images/comet.svg', 500, -50, 'obstacle');
  myCoin = new coins(
    26,
    26,
    '../images/dollar.png',
    Math.floor(Math.random() * myGameArea.canvas.width) + 20,
    Math.floor(Math.random() * myGameArea.canvas.height) + 5,
    'dollar'
  );
  myScore = new component('15px', 'Consolas', 'white', window.innerWidth - 150, 35, 'text');

  myGameArea.start();
  let eini = document.getElementById('section2');
  let restartDiv = document.getElementById('restartDiv');
  eini.insertBefore(myGameArea.canvas, restartDiv);
  let score = document.getElementById('myScore');
  score.innerHTML = 'Your Score: 0';
}

function move(dir) {
  myGamePiece.image.src = '../images/bluebirdAction.png';
  if (dir == 'up') {
    myGamePiece.speedY = -1;
  }
  if (dir == 'down') {
    myGamePiece.speedY = 1;
  }
  if (dir == 'left') {
    myGamePiece.speedX = -1;
  }
  if (dir == 'right') {
    myGamePiece.speedX = 1;
  }
}

function clearmove() {
  myGamePiece.image.src = '../images/bluebird1.png';
  myGamePiece.speedY = 0;
  myGamePiece.speedX = 0;
  myBackground.speedX = 0;
  isIt = false;
}

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 960;
    this.canvas.height = 320;
    this.context = this.canvas.getContext('2d');
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 0.1);
    window.addEventListener('keydown', function (e) {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    });
  },

  startTouch: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = 320;
    this.context = this.canvas.getContext('2d');
    this.frameNo = 0;
    this.interval = setInterval(updateGameAreaTouch, 0.1);
    window.addEventListener('keydown', function (e) {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
    myGamePiece.image.src = '../images/bluebirdtot.png';
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == 'image' || type == 'background') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function () {
    ctx = myGameArea.context;
    if (this.type == 'text') {
      ctx.font = '20px Lato';
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    }
    if (type == 'image' || type == 'background') {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      if (type == 'background') {
        ctx.drawImage(this.image, this.x + this.width - 10, this.y, this.width, this.height);
      }
    } else {
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.type == 'background') {
      if (-(this.width + 2) >= this.x && -(this.width - 1) >= this.x) {
        this.x = 0;
      }
      if (this.type == 'background') {
        if (this.x >= 0) {
          this.x = 0;
        }
      }
    }
    if (this.type == 'image') {
      if (this.x >= myGameArea.canvas.width) {
        this.x = myGameArea.canvas.width;
      }
      if (this.y <= 0) {
        this.y = 0;
      }
      if (this.x <= 0) {
        this.x = 0;
      }
      if (this.x >= 0 && this.x <= 30) {
        this.x = 30;
      }
      if (this.y >= myGameArea.canvas.height - 30) {
        this.y = myGameArea.canvas.height - 30;
      }
    }
  };
  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y + 30;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
      crash = false;
    }
    return crash;
  };
}

function obstacle(width, height, color, x, y, type) {
  this.type = type;
  if (type == 'obstacle') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == 'obstacle') {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    myObstacle.y += 1.4;
    myObstacle.x -= 1.4;

    if (this.y > myGameArea.canvas.height) {
      this.y = -50;
      this.x = Math.floor(Math.random() * myGameArea.canvas.width + 500) + 5;
    }

    if (this.x >= -200 && this.x <= -100) {
      this.x = 1000;
    }
  };
}

function obstacleObstacle(width, height, color, x, y, type) {
  this.type = type;
  if (type == 'obstacle') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == 'obstacle') {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    myObstacleObstacle.y += 1;
    myObstacleObstacle.x -= 0.5;

    if (this.y > myGameArea.canvas.height) {
      this.y = -50;
      this.x = Math.floor(Math.random() * myGameArea.canvas.width + 500) + 5;
    }

    if (this.x >= -200 && this.x <= -100) {
      this.x = 1000;
    }
  };
}

function coins(width, height, color, x, y, type) {
  this.type = type;
  if (type == 'dollar') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == 'dollar') {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > myGameArea.canvas.height) {
      this.y = myGameArea.canvas.height;
      this.x = Math.floor(Math.random() * myGameArea.canvas.width + 500) + 50;
    }

    if (this.x >= -200 && this.x <= -100) {
      this.x = 1000;
    }
  };
}

function moveup() {
  myGamePiece.speedY -= 2.5;
}

function movedown() {
  myGamePiece.speedY += 2.5;
}

function moveleft() {
  myGamePiece.speedX = -2;
  isIt = true;
}

function moveright() {
  myGamePiece.image.src = '../images/bluebirdAction.png';
  myGamePiece.speedX += 2;
  myBackground.speedX = -5;
  isIt = true;
}

function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

function reload() {
  window.location.reload();
}

function updateGameArea() {
  if (myGamePiece.crashWith(myObstacle) || myGamePiece.crashWith(myObstacleObstacle)) {
    let myScoreHey = document.getElementById('mine');

    if (myGameArea.frameNo >= localStorage.getItem('highscore')) {
      localStorage.setItem('highscore', myGameArea.frameNo);
    }
    myGameArea.stop();

    return;
  } else if (myGamePiece.crashWith(myCoin)) {
    myCoin.y = Math.floor(Math.random() * (myGameArea.canvas.height - 20) + 0);
    myCoin.x = Math.floor(Math.random() * (myGameArea.canvas.width - 30) + 30);
    myGameArea.frameNo += 1;
    let score = document.getElementById('myScore');
    score.innerHTML = 'Your Score: ' + myGameArea.frameNo;
    console.log(myCoin.x);
    console.log(myCoin.y);
  } else {
    myGameArea.clear();
    myBackground.speedX = -0.2;

    if (myGamePiece.x <= 0) {
      myGamePiece.x = 0;
    }

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if (myGamePiece.x >= 0 && myGamePiece.x <= window.innerWidth) {
      myGamePiece.speedX = -1;
    }

    if (myGameArea.keys && myGameArea.keys[37]) {
      myGamePiece.speedX = -2;
    }

    if (myGameArea.keys && myGameArea.keys[39]) {
      myGamePiece.image.src = '../images/bluebirdAction.png';
      myGamePiece.speedX = 1.7;
      myBackground.speedX -= 1.5;
    } else {
      myGamePiece.image.src = '../images/bluebird1.png';
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
      myGamePiece.speedY = -2.5;
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
      myGamePiece.speedY = 2.5;
    }
    myBackground.newPos();
    myBackground.update();
    myObstacle.newPos();
    myObstacle.update();
    myObstacleObstacle.newPos();
    myObstacleObstacle.update();
    myCoin.newPos();
    myCoin.update();
    myScore.text = 'score: ' + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
  }
}

function soore() {
  let myHigh = document.getElementById('minehigh');
  myHigh.innerHTML = 'Your high score: ' + localStorage.getItem('highscore');
}

function score() {
  let myHigh = document.getElementById('minehigh');

  if (myGameArea.frameNo >= localStorage.getItem('highscore')) {
    myHigh.innerHTML = 'Your high score: ' + myGameArea.frameNo;
  } else {
    myHigh.innerHTML = 'Your high score: ' + localStorage.getItem('highscore');
  }

  myScore.text = 'score: ' + myGameArea.frameNo;
}
