const GameView = require('./game_view.js');
const Game = require('./game.js');


document.addEventListener("DOMContentLoaded", function() {
  let cancan = document.getElementById('canvas');
  let ctx = cancan.getContext('2d');

  let gameview = new GameView(new Game(), ctx);
  gameview.start();
});
