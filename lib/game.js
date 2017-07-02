let Asteroid = require("./asteroid.js");


function Game(DIM_X = 1000, DIM_Y = 1000, NUM_ASTEROIDS = 50)  {
  this.DIM_X = DIM_X;
  this.DIM_Y = DIM_Y;
  this.asteroids = [];
  for (var i = 0; i <= NUM_ASTEROIDS; i++) {
    this.addAsteroids();
  }
}

Game.prototype.addAsteroids = function() {
  this.asteroids.push(new Asteroid());
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 1000, 1000);
  this.asteroids.forEach( el => el.draw(ctx) );
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( el => el.move() );
};

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.asteroids.length; i++) {
    for (let j = 0; j < this.asteroids.length; j++) {
      const ast1 = this.asteroids[i];
      const ast2 = this.asteroids[j];

      if (ast1.isCollidedWith(ast2)) {
        ast1.bounce;
        ast2.bounce;
      }
    }
  }
};

// Game.prototype.checkCollisions = function(asteroid) {
//   this.asteroids.forEach ( el => {
//     if (asteroid !== el && el.isCollidedWith(asteroid)) {
//       console.log('Bounce!')
//       asteroid.bounce();
//       el.bounce();
//     }
//   });
// };

module.exports = Game;
