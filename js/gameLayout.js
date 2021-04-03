function hide() {
  let divHide = document.getElementById('game1hidediv');
  let score = document.getElementById('score');
  let restart = document.getElementById('restart');
  restart.style.display = 'inline';
  divHide.style.display = 'none';
  score.style.display = 'inline';

  startGame();
}

function restart() {
  startGame();
}

function refresh() {
  window.location.reload();
}

function reload() {
  location.reload();
}
