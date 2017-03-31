let playerMovement = require("./movement.js");
let bombHandler = require("./bomb.js");
let ghostMovement = require("./ghost-collision.js");
let interactiveObjects = require("./powerup.js");

$(function () {

  class Game {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.space   =  40;
      this.slots   =  [];
      this.board   =  $('.game-grid');
      this.wall    =  $('.wall');
      this.brick   =  $('.brick');
      this.player  =  $('.player');
    }

    // --- FIND BRICK SLOTS ------------------------- /
    generateLevelSlotsArray() {

      // make and put all possible green slots in an array
      let counter = 0;

      for( let i = 0; i < 13; i++ ){
        for( let j = 0; j < 13; j++ ){
          if ( i % 2 != 0 && j % 2 != 0 ){
            this.y = i * this.space;
            this.x = j * this.space;
            this.wall.eq(counter).css({
              'left': this.x +'px',
              'top': this.y +'px',
            });
            counter ++;
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
    generateLevel() {

      // generate slots
      this.generateLevelSlotsArray();
      // randomize brick number (28 to 32)
      let brickNum = Math.round(Math.random() * (32 - 28) + 28);
      // create string of brick divs
      let divString = '';
      for ( let i = 0; i < brickNum; i++ ){
        divString += '<div class="brick block"></div>';
      }

      // create elements with jQuery and append them
      this.board.append($(divString));

      // making 3 free slots for player
      let freeSlots = this.slots.slice();
      freeSlots.splice(0, 2);  // splice two slots
      freeSlots.splice(11, 1); // splice one slot

      // randomize x and y for all bricks
      const bricks = $('.brick');

      $.each(bricks, (i, div) => {
        let pos =  Math.round(Math.random() * (freeSlots.length - 1));
        this.x = freeSlots[pos][0];
        this.y = freeSlots[pos][1];
        $(div).css({
          'left' : this.x +'px',
          'top'  : this.y +'px',
        });
        $(div).addClass(this.x + '-' + this.y)
        // remove taken position from free slots
        freeSlots.splice(pos, 1);
      });

      // GENERATE GHOSTS ------------------------ /
      let generateGhosts = () => {

        // .ghost elements string
        let divGhostsString = '<div class="ghost mobile"></div><div class="ghost mobile"></div><div class="ghost mobile"></div><div class="ghost mobile"></div><div class="ghost mobile"></div>';

        // append .ghosts
        this.board.append($(divGhostsString));

        // select all ghost divs
        const ghosts = $('.ghost');
        // randomize x and y ghost positions
        $.each(ghosts, function (i, div) {
          let pos =  Math.round( Math.random() * (freeSlots.length - 1) );
          this.x = freeSlots[pos][0];
          this.y = freeSlots[pos][1];
          // set x and y position for each ghost
          $(div).css({
            'left': this.x + 3 +'px',
            'top': this.y + 3 +'px',
          });

          // remove each taken position
          freeSlots.splice(pos, 1);
        });
      }

      generateGhosts();

      $('div.game-over h3').on('click', function(){
        document.location.reload();
      });

    }

  } // end of Game() object

  let startGame = () => {
    const menuMusic = new Audio("sounds/menu.wav");
    menuMusic.play();

    $('h2.start').on('click', function(){

      $('div.menu').fadeOut(800);

      menuMusic.pause();

      setTimeout(function () {
        let game = new Game();
        game.generateLevel();
        playerMovement();
        ghostMovement();
        bombHandler();
        interactiveObjects();
      }, 300);

    });
  }

  startGame();

});
