let Asteroid = require("./asteroid.js");
let Util = require("./utils.js");

function Game(DIM_X = 1000, DIM_Y = 1000, NUM_ASTEROIDS = 25)  {
  this.DIM_X = DIM_X;
  this.DIM_Y = DIM_Y;
  this.asteroids = [];
  while(this.asteroids.length < NUM_ASTEROIDS){
    let asteroid = this.addAsteroids();
    for (var i = 0; i < this.asteroids.length-1; i++) {
      if(asteroid.isCollidedWith(this.asteroids[i])) {
        this.asteroids.pop();
      }
    }
  }
}

Game.prototype.addAsteroids = function() {
  let asteroid = new Asteroid();
  this.asteroids.push(asteroid);
  return asteroid;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 1000, 1000);
  this.asteroids.forEach( el => el.draw(ctx) );
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( el => el.move() );
};

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.asteroids.length - 1; i++) {
    for (let j = i + 1; j < this.asteroids.length; j++) {
      let ast1 = this.asteroids[i];
      let ast2 = this.asteroids[j];
      ast1.objectCollisions.forEach(function(collision, i) {
        if (!ast1.isCollidedWith(collision)) {
          ast1.objectCollisions.splice(i, 1);
        }
      });
      ast2.objectCollisions.forEach(function(collision, i) {
        if (!ast1.isCollidedWith(collision)) {
          ast1.objectCollisions.splice(i, 1);
        }
      });
      if (ast1.isCollidedWith(ast2) && !ast1.objectCollisions.includes(ast2)) {
        ast1.objectCollisions.push(ast2);
        ast2.objectCollisions.push(ast1);
        // ast1.separateObjects(ast2);
        ast1.newVel(ast2);
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
