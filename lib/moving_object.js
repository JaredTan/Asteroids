let Util = require("./utils.js");

function MovingObject(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] = (this.pos[0] + this.vel[0]) % 1000;
    this.pos[0] < 0 ? this.pos[0] += 1000 : this.pos[0] ;
    this.pos[1] = (this.pos[1] + this.vel[1]) % 1000;
    this.pos[1] < 0 ? this.pos[1] += 1000 : this.pos[1];
  };

  MovingObject.prototype.bounce = function() {
    this.vel[0] *= -1;
    this.vel[1] *= -1;
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    distBetween = Util.dist(x1, x2, y1, y2)
    let r1 = this.radius;
    let r2 = otherObject.radius;
    return distBetween <= (r1 + r2);
  };

  // Vector physics causes balls to get stuck together. separate balls.

  MovingObject.prototype.newVel = function(otherAsteroid) {
    let originalThisVelX = this.vel[0];
    let originalThisVelY = this.vel[1];
    let originalOtherVelX = otherAsteroid.vel[0];
    let originalOtherVelY = otherAsteroid.vel[1];
    this.vel[0] = Util.newVel(this.radius, otherAsteroid.radius, originalThisVelX, originalOtherVelX);
    this.vel[1] = Util.newVel(this.radius, otherAsteroid.radius, originalThisVelY, originalOtherVelY);
    otherAsteroid.vel[0] = Util.newVel(otherAsteroid.radius, this.radius, originalOtherVelX, originalThisVelX);
    otherAsteroid.vel[1] = Util.newVel(otherAsteroid.radius, this.radius, originalOtherVelY, originalThisVelY);
  };

  MovingObject.prototype.separateObjects = function(otherObject) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    distBetween = Util.dist(x1, x2, y1, y2);
    let r1 = this.radius;
    let r2 = otherObject.radius;
    overlapDist = r1 + r2 - distBetween;
    let dx = (x2 - x1) / overlapDist ;
    let dy = (y2 - y1) / overlapDist ;
    this.pos[0] -= (overlapDist/16) * dx;
    this.pos[1] -= (overlapDist/16) * dy;
    otherObject.pos[0] += (overlapDist/16) * dx;
    otherObject.pos[1] += (overlapDist/16) * dy;
  };



module.exports = MovingObject;
