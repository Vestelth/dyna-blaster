/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// LET'S BLOW SOME STUFF UP! ------------------ /

var bombHandler = function bombHandler() {

    var bricks = $('div.brick');
    var range = 1;
    var bombNumber = 0;
    var bricksPositions = [];

    // event to make bomb with space button
    $(document).on('keydown', function (event) {

        if (event.which == 32) {
            event.preventDefault();
            var playerX = $('.player').position().left;
            var playerY = $('.player').position().top;
            var bombX = Math.round(playerX / 40) * 40;
            var bombY = Math.round(playerY / 40) * 40;

            // create bomb TO.DO: make 'limit' instead of a 0
            if (bombNumber === 0) {
                var makeBomb = $('<div class="bomb"></div>').appendTo($('.game-grid'));
                $('.bomb').css({
                    'left': bombX + 'px',
                    'top': bombY + 'px'
                });

                // destroy bricks after bomb explodes
                var tickerStart = function tickerStart(x, y) {
                    var ticker = setTimeout(function () {
                        // destroy brick walls
                        brickBurn(x, y);
                        // hurt player or ghosts
                        bombCharDamage(x, y);

                        $('.bomb').remove();

                        bombNumber--;
                    }, 2000);
                };
                tickerStart(bombX, bombY);
                bombNumber++;
            }
        }
    });

    // find bricks for each blow direction and destroy them
    var brickBurn = function brickBurn(x, y) {

        var fireLeft = $('.game-grid').find('.' + (x - 40) + '-' + y);
        fireLeft.fadeOut(400);

        var fireRight = $('.game-grid').find('.' + (x + 40) + '-' + y);
        fireRight.fadeOut(400);

        var fireUp = $('.game-grid').find('.' + x + '-' + (y + 40));
        fireUp.fadeOut(400);

        var fireDown = $('.game-grid').find('.' + x + '-' + (y - 40));
        fireDown.fadeOut(400);
    };

    var bombCharDamage = function bombCharDamage(bX, bY) {

        $('.mobile').each(function (index) {
            var charX = $(this).position().left;
            var charY = $(this).position().top;
            var charSize = parseInt($(this).css('width'));
            var bombSize = parseInt($('.bomb').css('width'));

            if (charX + charSize > bX - range * 40 && charX < bX + bombSize + range * 40 && charY + charSize > bY && charY < bY + bombSize) {
                $(this).fadeOut(300);
            } else if (charY + charSize > bY - range * 40 && charY < bY + bombSize + range * 40 && charX + charSize > bX && charX < bX + bombSize) {
                $(this).fadeOut(300);
            }
        });
    };
    return true;
}; // end of bombHandler
module.exports = bombHandler;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// GHOST MOVEMENT ------------------ /

// let ghostBehaviour = () => {

var ghostEatsPlayer = function ghostEatsPlayer() {

  var playerX = $('.player').position().left;
  var playerY = $('.player').position().top;
  var playerSize = parseInt($('.player').css('width'));

  $('.ghost').each(function (index) {
    var ghostX = $(this).position().left;
    var ghostY = $(this).position().top;
    var ghostSize = parseInt($(this).css('width'));

    if (ghostX < playerX + playerSize && ghostX + ghostSize > playerX && ghostY < playerY + playerSize && ghostY + ghostSize > playerY) {
      //TODO: game over, restart and -1 life;
      $('.player').fadeOut(300);
    }
  });
};

var ghostMovement = function ghostMovement() {

  var ghostPlayerTicker = setInterval(function () {
    ghostEatsPlayer();
  }, 20);

  var ghostSize = parseInt($('.ghost').css('width'));
  var blockSize = parseInt($('.wall').css('width'));
  var ghostDiv = $('.ghost');

  // brick positions for ghosts
  var obj2Pos = [];

  $('.block').each(function (index) {
    var x = Math.round($(this).position().left);
    var y = Math.round($(this).position().top);
    obj2Pos.push([x, y]);
  });

  $(document).on('keydown', function (event) {
    if (event.which == 32) {
      event.preventDefault();

      setTimeout(function () {
        var bX = Math.round($('.bomb').position().left);
        var bY = Math.round($('.bomb').position().top);

        obj2Pos.push([bX, bY]);
      }, 100);

      setTimeout(function () {
        obj2Pos = [];
        $('.block').each(function (index) {
          var x = $(this).position().left;
          var y = $(this).position().top;
          obj2Pos.push([x, y]);
        });
      }, 4000);
    }
  });

  //making an array with all obstacle positions

  var checkCollRight = function checkCollRight(ghost) {
    var gX = ghost.position().left;
    var gY = ghost.position().top;

    for (var i = 0; i < obj2Pos.length; i++) {
      if (gX + ghostSize + 4 >= obj2Pos[i][0] && gX < obj2Pos[i][0] && gY + ghostSize + 1 >= obj2Pos[i][1] && gY - 1 <= obj2Pos[i][1] + blockSize || gX + ghostSize >= 516) {
        return true;
      }
    }
  };

  var checkCollLeft = function checkCollLeft(ghost) {
    var gX = ghost.position().left;
    var gY = ghost.position().top;

    for (var i = 0; i < obj2Pos.length; i++) {
      if (gX - 3 <= obj2Pos[i][0] + blockSize && gX + ghostSize > obj2Pos[i][0] && gY + ghostSize + 1 >= obj2Pos[i][1] && gY - 1 <= obj2Pos[i][1] + blockSize || gX <= 4) {
        return true;
      }
    }
  };
  var checkCollUp = function checkCollUp(ghost) {
    var gX = ghost.position().left;
    var gY = ghost.position().top;

    for (var i = 0; i < obj2Pos.length; i++) {
      if (gY - 4 <= obj2Pos[i][1] + blockSize && gY + ghostSize > obj2Pos[i][1] && gX + ghostSize >= obj2Pos[i][0] && gX <= obj2Pos[i][0] + blockSize || gY <= 4) {
        return true;
      }
    }
  };
  var checkCollDown = function checkCollDown(ghost) {
    var gX = ghost.position().left;
    var gY = ghost.position().top;

    for (var i = 0; i < obj2Pos.length; i++) {
      if (gY + ghostSize + 4 >= obj2Pos[i][1] && gY < obj2Pos[i][1] && gX + ghostSize >= obj2Pos[i][0] && gX <= obj2Pos[i][0] + blockSize || gY + ghostSize >= 516) {
        return true;
      }
    }
  };

  var moveGhost = function moveGhost(dirX, dirY, ghost) {
    var gX = ghost.position().left;
    var gY = ghost.position().top;
    gX += dirX * 2;
    gY += dirY * 2;
    ghost.css({ 'left': gX });
    ghost.css({ 'top': gY });
  };

  $('.ghost').each(function (index) {
    var thisGhost = $(this);
    var direction = {
      right: false,
      left: false,
      up: false,
      down: false
    };

    var time = setInterval(function () {

      if (direction.right && !checkCollRight(thisGhost)) {
        moveGhost(1, 0, thisGhost);
      } else if (direction.left && !checkCollLeft(thisGhost)) {
        moveGhost(-1, 0, thisGhost);
      } else if (direction.up && !checkCollUp(thisGhost)) {
        moveGhost(0, -1, thisGhost);
      } else if (direction.down && !checkCollDown(thisGhost)) {
        moveGhost(0, 1, thisGhost);
      } else {
        var possibleDir = ['right', 'up', 'down', 'left'];

        if (checkCollRight(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'right') {
              possibleDir.splice(i, 1);
              direction.right = false;
            }
          }
        }
        if (checkCollLeft(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'left') {
              possibleDir.splice(i, 1);
              direction.left = false;
            }
          }
        }
        if (checkCollUp(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'up') {
              possibleDir.splice(i, 1);
              direction.up = false;
            }
          }
        }
        if (checkCollDown(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'down') {
              possibleDir.splice(i, 1);
              direction.down = false;
            }
          }
        }
        var newDir = Math.round(Math.random() * (possibleDir.length - 1));
        switch (possibleDir[newDir]) {
          case 'left':
            direction.left = true;
            // moveGhost(-1, 0, thisGhost);
            break;
          case 'right':
            direction.right = true;
            // moveGhost(1, 0, thisGhost);
            break;
          case 'up':
            direction.up = true;
            // moveGhost(0, -1, thisGhost);
            break;
          case 'down':
            direction.down = true;
            // moveGhost(0, 1, thisGhost);
            break;
        }
      }
    }, 40);
  });
};

module.exports = ghostMovement;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// MOVE THE PLAYER -------------------------- /
var playerMovement = function playerMovement() {
  // store key codes and currently pressed ones
  var keys = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
  };
  // store reference to character's position
  var player = {
    x: 2,
    y: 2,
    speed: 4
  };

  /// key detection
  document.body.onkeyup = document.body.onkeydown = function (event) {
    keys[event.which] = event.type == 'keydown';
  };

  // player movement update
  var movePlayer = function movePlayer(dirX, dirY) {
    player.x += (dirX || 0) * player.speed;
    player.y += (dirY || 0) * player.speed;
    $('.player').css({ 'left': player.x });
    $('.player').css({ 'top': player.y });
  };

  // player control
  var detectPlayerMovement = function detectPlayerMovement() {
    // wall collisions
    // wall size = brick size // width = height
    var x = 0;
    var y = 0;

    var playerSize = parseInt($('.player').css('width'));
    var objSize = parseInt($('.wall').css('width'));
    var walls = $('.wall');
    var bricks = $('.brick');
    var objPos = [];

    // making an array with all obstacle positions
    $('.block').each(function (index) {
      x = $(this).position().left;
      y = $(this).position().top;
      objPos.push([x, y]);
    });

    var checkCollisionLeft = function checkCollisionLeft() {
      var playerX = $('.player').position().left;
      var playerY = $('.player').position().top;
      var obstacle = { left: false };

      for (var i = 0; i < objPos.length; i++) {
        if (playerX - 4 <= objPos[i][0] + objSize && playerX + playerSize >= objPos[i][0] + 3 && playerY + playerSize > objPos[i][1] && playerY < objPos[i][1] + objSize || playerX <= 4) {
          obstacle.left = true;
          return true;
        }
      }
    };

    var checkCollisionRight = function checkCollisionRight() {
      var playerX = $('.player').position().left;
      var playerY = $('.player').position().top;
      var obstacle = { right: false };
      for (var i = 0; i < objPos.length; i++) {
        if (playerX + playerSize + 2 >= objPos[i][0] && playerX <= objPos[i][0] && playerY + playerSize > objPos[i][1] && playerY < objPos[i][1] + objSize || playerX + playerSize >= 516) {
          obstacle.right = true;
          return true;
        }
      }
    };

    var checkCollisionUp = function checkCollisionUp() {
      var playerX = $('.player').position().left;
      var playerY = $('.player').position().top;
      var obstacle = { up: false };
      for (var i = 0; i < objPos.length; i++) {
        if (playerY - 4 <= objPos[i][1] + objSize && playerY + playerSize > objPos[i][1] && playerX + playerSize > objPos[i][0] && playerX < objPos[i][0] + objSize || playerY <= 4) {
          obstacle.up = true;
          return true;
        }
      }
    };

    var checkCollisionDown = function checkCollisionDown() {
      var playerX = $('.player').position().left;
      var playerY = $('.player').position().top;
      var obstacle = { down: false };
      for (var i = 0; i < objPos.length; i++) {
        if (playerY + playerSize + 2 >= objPos[i][1] && playerY < objPos[i][1] && playerX + playerSize > objPos[i][0] && playerX < objPos[i][0] + objSize || playerY + playerSize >= 516) {
          obstacle.down = true;
          return true;
        }
      }
    };

    if (keys[keys.LEFT]) {
      // <-- animate here
      if (checkCollisionLeft()) {
        movePlayer();
      } else {
        movePlayer(-1, 0);
      }
    }
    if (keys[keys.RIGHT]) {
      // <-- animate here
      if (checkCollisionRight()) {
        movePlayer();
      } else {
        movePlayer(1, 0);
      }
    }
    if (keys[keys.UP]) {
      // <-- animate here
      if (checkCollisionUp()) {
        movePlayer();
      } else {
        movePlayer(0, -1);
      }
    }
    if (keys[keys.DOWN]) {
      // <-- animate here
      if (checkCollisionDown()) {
        movePlayer();
      } else {
        movePlayer(0, 1);
      }
    }
  };

  /// update current position on screen
  movePlayer();

  /// movement loop
  setInterval(function () {
    detectPlayerMovement();
  }, 40);
}; // end of playerMovement() function
module.exports = playerMovement;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var playerMovement = __webpack_require__(2);
var bombHandler = __webpack_require__(0);
var ghostMovement = __webpack_require__(1);

$(function () {
  var Game = function () {
    function Game() {
      _classCallCheck(this, Game);

      this.x = 0;
      this.y = 0;
      this.space = 40;
      this.slots = [];
      // this.gridArr =  [];
      this.board = $('.game-grid');
      this.wall = $('.wall');
      this.brick = $('.brick');
      this.player = $('.player');
    }

    // --- FIND BRICK SLOTS ------------------------- /


    _createClass(Game, [{
      key: "generateLevelSlotsArray",
      value: function generateLevelSlotsArray() {

        // make and put all possible green slots in an array
        var counter = 0;

        for (var i = 0; i < 13; i++) {
          // this.gridArr.push([]);
          for (var j = 0; j < 13; j++) {
            if (i % 2 != 0 && j % 2 != 0) {
              this.y = i * this.space;
              this.x = j * this.space;
              this.wall.eq(counter).css({
                'left': this.x + 'px',
                'top': this.y + 'px'
              });
              counter++;
              // making array of object on the board
              // 1 - there's a wall
              // 0 - there's nothing
              // this.gridArr[i].push(1);
            } else {
              // this.gridArr[i].push(0);
              this.y = i * this.space;
              this.x = j * this.space;
              this.slots.push([this.x, this.y]);
            }
          }
        }
        // console.log(this.gridArr);
      }

      // --- GENERATE LEVEL --------------------------- /

    }, {
      key: "generateLevel",
      value: function generateLevel() {
        var _this = this;

        // generate slots
        this.generateLevelSlotsArray();
        // randomize brick number (28 to 32)
        var brickNum = Math.round(Math.random() * (32 - 28) + 28);
        // create string of brick divs
        var divString = '';
        for (var i = 0; i < brickNum; i++) {
          divString += '<div class="brick block"></div>';
        }

        // create elements with jQuery and append them
        this.board.append($(divString));

        // making 3 free slots for player
        var freeSlots = this.slots.slice();
        freeSlots.splice(0, 2); // splice two slots
        freeSlots.splice(11, 1); // splice one slot

        // randomize x and y for all bricks
        var bricks = $('.brick');

        $.each(bricks, function (i, div) {
          var pos = Math.round(Math.random() * (freeSlots.length - 1));
          _this.x = freeSlots[pos][0];
          _this.y = freeSlots[pos][1];
          $(div).css({
            'left': _this.x + 'px',
            'top': _this.y + 'px'
          });
          $(div).addClass(_this.x + '-' + _this.y);
          // remove taken position from free slots
          freeSlots.splice(pos, 1);
        });

        // GENERATE GHOSTS ------------------------ /
        var generateGhosts = function generateGhosts() {

          // .ghost elements string
          var divGhostsString = '<div class="ghost mobile"></div><div class="ghost mobile"></div><div class="ghost mobile"></div><div class="ghost mobile"></div><div class="ghost mobile"></div>';

          // append .ghosts
          _this.board.append($(divGhostsString));

          // select all ghost divs
          var ghosts = $('.ghost');
          // randomize x and y ghost positions
          $.each(ghosts, function (i, div) {
            var pos = Math.round(Math.random() * (freeSlots.length - 1));
            $(this).data('dir', '');
            this.x = freeSlots[pos][0];
            this.y = freeSlots[pos][1];
            // set x and y position for each ghost
            $(div).css({
              'left': this.x + 3 + 'px',
              'top': this.y + 3 + 'px'
            });

            // remove each taken position
            freeSlots.splice(pos, 1);
          });
        };

        generateGhosts();
      }
    }]);

    return Game;
  }(); // end of Game() object


  var game = new Game();
  game.generateLevel();

  playerMovement();
  ghostMovement();
  bombHandler();
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(2);
__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);