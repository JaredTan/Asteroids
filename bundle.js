/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);
const Game = __webpack_require__(2);


document.addEventListener("DOMContentLoaded", function() {
  let cancan = document.getElementById('canvas');
  let ctx = cancan.getContext('2d');

  let gameview = new GameView(new Game(), ctx);
  gameview.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

let Asteroid = __webpack_require__(3);


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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let Util = __webpack_require__(4);
let MovingObject = __webpack_require__(5);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {


const Util = {
  inherits (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }
};


module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);