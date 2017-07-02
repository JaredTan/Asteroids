
const Util = {
  inherits (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },

  // assume radius ~ mass for vel change equation. Densities not implemented.

  newVel (mass1, mass2, vel1, vel2) {
    return (vel1 * (mass1 - mass2) + (2 * mass2 * vel2)) / (mass1 + mass2);
  },

  dist (x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }

};




module.exports = Util;
