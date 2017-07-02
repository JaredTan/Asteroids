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


  MovingObject.prototype.isCollidedWith = function(otherObject) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    let dist = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    let r1 = this.radius;
    let r2 = otherObject.radius;
    return dist <= (r1 + r2);
  };

  MovingObject.prototype.bounce = function() {
    console.log('Bounce');
    this.vel[0] *= -1;
    this.vel[1] *= -1;
  };


module.exports = MovingObject;
