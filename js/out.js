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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
  var boom = new Audio("sounds/boom.wav");

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
            boom.play();
            $('.bomb').remove();

            bombNumber--;
          }, 2500);
        };
        tickerStart(bombX, bombY);
        bombNumber++;
      }
    }
  });

  // find bricks for each blow direction and destroy them
  var brickBurn = function brickBurn(x, y) {

    var fireLeft = $('.game-grid').find('.' + (x - 40) + '-' + y);
    fireLeft.fadeOut(300);
    fireLeft.remove();

    var fireRight = $('.game-grid').find('.' + (x + 40) + '-' + y);
    fireRight.fadeOut(300);
    fireRight.remove();

    var fireUp = $('.game-grid').find('.' + x + '-' + (y + 40));
    fireUp.fadeOut(300);
    fireUp.remove();

    var fireDown = $('.game-grid').find('.' + x + '-' + (y - 40));
    fireDown.fadeOut(300);
    fireDown.remove();
  };

  // bomb hurts moving characters
  var bombCharDamage = function bombCharDamage(bX, bY) {
    $('.mobile').each(function (index) {
      var charX = $(this).position().left;
      var charY = $(this).position().top;
      var charSize = parseInt($(this).css('width'));
      var bombSize = parseInt($('.bomb').css('width'));
      if ($('.powerup').length != 0) {
        range = 1;
      } else {
        range = 2;
      }

      if (charX + charSize > bX - range * 40 && charX < bX + bombSize + range * 40 && charY + charSize > bY && charY < bY + bombSize) {
        $(this).fadeOut(400);
        $(this).remove();
      } else if (charY + charSize > bY - range * 40 && charY < bY + bombSize + range * 40 && charX + charSize > bX && charX < bX + bombSize) {
        $(this).fadeOut(400);
        $(this).remove();
      }
    });
  };
}; // end of bombHandler
module.exports = bombHandler;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// GHOST MOVEMENT ------------------ /

var ghostMovement = function ghostMovement() {

  var ghostEatsPlayer = function ghostEatsPlayer() {

    if ($('.player').length === 0) {
      return false;
    } else {
      var playerX = $('.player').position().left;
      var playerY = $('.player').position().top;
      var playerSize = parseInt($('.player').css('width'));
      var monstah = $('.ghost');

      monstah.each(function (index) {
        var ghostX = $(this).position().left;
        var ghostY = $(this).position().top;
        var ghostSize = parseInt($(this).css('width'));

        if (ghostX < playerX + playerSize && ghostX + ghostSize > playerX && ghostY < playerY + playerSize && ghostY + ghostSize > playerY) {
          $('.player').fadeOut(400);
        }
      });
    }
  };

  // checks if ghost eats player

  var ghostPlayerTicker = setInterval(function () {
    ghostEatsPlayer();
  }, 100);

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

  // make bomb block ghost pathway
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
      }, 2850);
    }
  });

  // checking ghost collisions w/obstacles
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
  // ghost moving function
  var moveGhost = function moveGhost(dirX, dirY, ghost) {
    var gX = ghost.position().left;
    var gY = ghost.position().top;
    gX += dirX * 2;
    gY += dirY * 2;
    ghost.css({ 'left': gX });
    ghost.css({ 'top': gY });
  };

  // ghost 'AI' - pathfinding
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
            break;
          case 'right':
            direction.right = true;
            break;
          case 'up':
            direction.up = true;
            break;
          case 'down':
            direction.down = true;
            break;
        }
      }
    }, 50);
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
    // wall size=brick size,width = height
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
      if (checkCollisionLeft()) {
        movePlayer();
      } else {
        movePlayer(-1, 0);
      }
    }
    if (keys[keys.RIGHT]) {
      if (checkCollisionRight()) {
        movePlayer();
      } else {
        movePlayer(1, 0);
      }
    }
    if (keys[keys.UP]) {
      if (checkCollisionUp()) {
        movePlayer();
      } else {
        movePlayer(0, -1);
      }
    }
    if (keys[keys.DOWN]) {
      if (checkCollisionDown()) {
        movePlayer();
      } else {
        movePlayer(0, 1);
      }
    }

    $(document).on('keydown', function (event) {
      if (event.which == keys.LEFT) {
        $('.player').removeClass('playerRight playerUp playerDown');
        $('.player').addClass('playerLeft');
      }
      if (event.which == keys.RIGHT) {
        $('.player').removeClass('playerLeft playerUp playerDown');
        $('.player').addClass('playerRight');
      }
      if (event.which == keys.UP) {
        $('.player').removeClass('playerRight playerDown playerLeft');
        $('.player').addClass('playerUp');
      }
      if (event.which == keys.DOWN) {
        $('.player').removeClass('playerRight playerUp playerLeft');
        $('.player').addClass('playerDown');
      }
    });
    $(document).on('keyup', function (event) {
      if (event.which == keys.LEFT) {
        $('.player').removeClass('playerLeft');
      }
      if (event.which == keys.RIGHT) {
        $('.player').removeClass('playerRight');
      }
      if (event.which == keys.UP) {
        $('.player').removeClass('playerUp');
      }
      if (event.which == keys.DOWN) {
        $('.player').removeClass('playerDown');
      }
    });
  };

  /// update current position on screen
  movePlayer();

  /// movement loop
  setInterval(function () {
    if ($('.player').length != 0) {
      detectPlayerMovement();
    }
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
var interactiveObjects = __webpack_require__(4);

$(function () {
  var Game = function () {
    function Game() {
      _classCallCheck(this, Game);

      this.x = 0;
      this.y = 0;
      this.space = 40;
      this.slots = [];
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
          for (var j = 0; j < 13; j++) {
            if (i % 2 != 0 && j % 2 != 0) {
              this.y = i * this.space;
              this.x = j * this.space;
              this.wall.eq(counter).css({
                'left': this.x + 'px',
                'top': this.y + 'px'
              });
              counter++;
              // making array of object on the board;
            } else {
              this.y = i * this.space;
              this.x = j * this.space;
              this.slots.push([this.x, this.y]);
            }
          }
        }
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

        $('div.game-over h3').on('click', function () {
          document.location.reload();
        });
      }
    }]);

    return Game;
  }(); // end of Game() object

  var startGame = function startGame() {
    var menuMusic = new Audio("sounds/menu.wav");
    menuMusic.play();

    $('h2.start').on('click', function () {

      $('div.menu').fadeOut(800);

      menuMusic.pause();

      setTimeout(function () {
        var game = new Game();
        game.generateLevel();
        playerMovement();
        ghostMovement();
        bombHandler();
        interactiveObjects();
      }, 300);
    });
  };

  startGame();
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var interactiveObjects = function interactiveObjects() {

  var levelMusic = new Audio("sounds/level-music.wav");
  var deathSound = new Audio("sounds/death.wav");
  var bonusSound = new Audio("sounds/bonus.wav");

  // EXIT LEVEL
  var exit = $('<div class="exit"></div>');
  $('div.game-grid').append(exit);

  var spot = Math.round(Math.random() * ($('.brick').length - 1));

  var exitX = Math.round($('.brick').eq(spot).position().left);
  var exitY = Math.round($('.brick').eq(spot).position().top);
  var exitSize = parseInt($('.exit').css('width'));
  var playerSize = parseInt($('.player').css('width'));
  var exitSound = new Audio("sounds/clear.wav");

  $('.exit').css({ 'left': exitX });
  $('.exit').css({ 'top': exitY });

  var playerExit = function playerExit() {
    if ($('.player').length === 0) {
      return false;
    } else {
      var playerX = $('.player').position().left;
      var playerY = $('.player').position().top;

      if (exitX < playerX + playerSize && exitX + exitSize > playerX && exitY < playerY + playerSize && exitY + exitSize > playerY) {
        return true;
      }
    }
  };

  //LET'S BUFF THIS GUY, HUH?
  var power = $('<div class="powerup"></div>');
  $('div.game-grid').append(power);

  var place = Math.round(Math.random() * ($('.brick').length - 1));

  var powX = Math.round($('.brick').eq(place).position().left);
  var powY = Math.round($('.brick').eq(place).position().top);
  var powSize = parseInt($('.powerup').css('width'));

  $('.powerup').css({ 'left': powX });
  $('.powerup').css({ 'top': powY });

  var playerPower = function playerPower() {
    if ($('.player').length === 0) {
      return false;
    } else {
      var playerX = $('.player').position().left;
      var playerY = $('.player').position().top;

      if (powX < playerX + playerSize && powX + powSize > playerX && powY < playerY + playerSize && powY + powSize > playerY) {
        $('.powerup').fadeOut(50);
        $('.powerup').remove();
        return true;
      }
    }
  };

  var exitListener = setInterval(function () {
    if ($('.ghost').length === 0 && playerExit()) {
      clearInterval(exitListener);
      levelMusic.pause();
      exitSound.play();
      $(document).unbind();
      $('div.win').fadeIn(10);
    }
  }, 300);

  var bonusListener = setInterval(function () {
    if (playerPower()) {
      clearInterval(bonusListener);
      bonusSound.play();
    }
  }, 300);

  levelMusic.play();

  var gameOverListener = setInterval(function () {
    if ($('.player').css('display') == 'none' || $('.player').length === 0) {
      $('.player').addClass('.dead');
      clearInterval(gameOverListener);
      levelMusic.pause();
      deathSound.play();
      setTimeout(function () {
        $(document).unbind();
        $('div.game-over').fadeIn(100);
      }, 500);
    }
  }, 200);
};

module.exports = interactiveObjects;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(2);
__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);