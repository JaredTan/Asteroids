let Util = require("./utils.js");
let MovingObject = require("./moving_object.js");

function COLORS() {return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function RADIUS() {return 15 + (Math.random() * 100) % 25;}

const VELOCITY = 5;

function Asteroid(options = {}) {
  options.color = COLORS();
  options.radius = RADIUS();
  options.pos = [
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000)
  ];
  options.vel = [
    (Math.random() - 0.5) * VELOCITY,
    (Math.random() - 0.5) * VELOCITY
  ];
  MovingObject.call(this, options);
}

Asteroid.prototype.bounce = function() {
  // console.log('Bounce'!);
  this.vel[0] *= -1;
  this.vel[1] *= -1;
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
