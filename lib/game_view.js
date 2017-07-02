function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
}

GameView.prototype.start = function() {
  setInterval(() => this.movement(), Math.floor(1000/60));
  setInterval(() => this.game.draw(this.ctx), Math.floor(1000/60));
};

GameView.prototype.movement = function() {
  this.game.moveObjects();
  // this.game.checkCollisions();
};

module.exports = GameView;
