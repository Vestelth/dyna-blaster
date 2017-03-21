$(function () {

  class Level {
  }

  class Ghosts {
  }

  class Game {
    constructor() {
      let self = this;
      this.x = 0;
      this.y = 0;
      this.space   =  40;
      this.slots   =  [];
      this.gridArr =  [];
      this.board   =  $('div.game-grid');
      this.player  =  $('div.player');
      this.wall    =  $('div.wall');
      this.brick   = $('div.brick');
      // this.takenSlots = [];
      this.ghosts = new Ghosts();
      this.level = new Level();
    }

    // --- FIND BRICK SLOTS ------------------------- /
    generateLevelSlotsArray() {
      // make and put all possible green slots in an array
      let counter = 0;

      for( let i = 0; i < 13; i++ ){
        this.gridArr.push([]);
        for( let j = 0; j < 13; j++ ){
          if ( i % 2 != 0 && j % 2 != 0 ){
            this.y = i * this.space;
            this.x = j * this.space;
            $('div.wall').eq(counter).css({
              'left': this.x +'px',
              'top': this.y +'px',
            });
            counter ++;
            // making array of object on the board
            this.gridArr[i].push(1);
          } else {
            this.gridArr[i].push(0);
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
        divString += '<div class="brick"></div>';
      }

      // create elements with jQuery and append them
      $('div.game-grid').append($(divString));

      // making 3 grid slots for player
      let freeSlots = this.slots.slice();
      freeSlots.splice(0, 2);  // splice two
      freeSlots.splice(11, 1); // splice one

      // randomize x and y for all bricks
      const bricks = $('div.brick');

      $.each(bricks, function (i, div) {
        let pos =  Math.round( Math.random() * (freeSlots.length - 1) );
        this.x = freeSlots[pos][0];
        this.y = freeSlots[pos][1];
        $(div).css({
          'left': this.x +'px',
          'top': this.y +'px',
        });

        // remove taken position from free slots
        freeSlots.splice(pos, 1);
      });

      // GENERATE GHOSTS ------------------------ /
      function generateGhosts() {
        // string for div.ghost elements
        let divGhostsString = '<div class="ghost"></div><div class="ghost"></div><div class="ghost"></div><div class="ghost"></div>';

        // create div.ghost elements and append them
        $('div.game-grid').append($(divGhostsString));
        // select all ghost divs
        let ghosts = $('div.ghost');
        // randomize x and y for all ghosts
        $.each(ghosts, function (i, div) {
          let pos =  Math.round( Math.random() * (freeSlots.length - 1) );
          this.x = freeSlots[pos][0];
          this.y = freeSlots[pos][1];
          // set x and y position for each ghost
          $(div).css({
            'top': this.y +'px',
            'left': this.x +'px',
          });
          // delete each taken position
          freeSlots.splice(pos, 1);
        });
      }

      generateGhosts();
    }

    // MOVE THE PLAYER -------------------------- /
    playerMovement() {
      /// store key codes and currently pressed ones
      let keys = {
        UP    : 38,
        LEFT  : 37,
        RIGHT : 39,
        DOWN  : 40
      };
      /// store reference to character's position and element
      let player = {
        x     :  2,
        y     :  2,
        speed :  4,
        div   :  $('div.player')
      };

      /// key detection
      document.body.onkeyup = document.body.onkeydown = function(event){
        keys[event.which] = event.type == 'keydown';
      };

      /// player movement update
      function movePlayer(dirX, dirY) {
        player.x += (dirX || 0) * player.speed;
        player.y += (dirY || 0) * player.speed;
        player.div.css({'left': player.x});
        player.div.css({'top' : player.y});
      }


      /// player control
      function detectPlayerMovement() {

        //wall collisions
        // wall size = brick size // width = height
        let x = 0;
        let y = 0;
        const playerSize = parseInt($('div.player').css('width'));
        const objSize = parseInt($('div.wall').css('width'));

        const walls = $('div.wall');
        const bricks = $('div.brick');
        let objPos = [];

        // making an array with all obstacle positions
        $('div.brick').each( function(index) {
          x = $(this).position().left ;
          y = $(this).position().top;
          objPos.push([x, y]);
        });
        $('div.wall').each( function(index) {
          x = $(this).position().left;
          y = $(this).position().top;
          objPos.push([x, y]);
        });

        function checkCollisionLeft() {
            let playerX = $('div.player').position().left;
            let playerY = $('div.player').position().top;
            let obstacle = { left  : false };

            for ( let i = 0; i < objPos.length; i++ ){
              if (playerX - 2 <= objPos[i][0] + objSize &&
                  playerX + playerSize >= objPos[i][0] + 3 &&
                  playerY + playerSize > objPos[i][1] &&
                  playerY < objPos[i][1] + objSize
                  || playerX - 1 <= 0)
              {
                obstacle.left = true;
                return true;
              }
            }
        }

        function checkCollisionRight() {
            let playerX = $('div.player').position().left;
            let playerY = $('div.player').position().top;
            let obstacle = { right  : false };
            for ( let i = 0; i < objPos.length; i++ ){
              if (playerX + playerSize >= objPos[i][0] &&
                  playerX <= objPos[i][0] &&
                  playerY + playerSize > objPos[i][1] &&
                  playerY < objPos[i][1] + objSize ||
                  playerX + playerSize >= 520)
              {
                obstacle.right = true;
                return true;
              }
            }
        }

        function checkCollisionUp() {
            let playerX = $('div.player').position().left;
            let playerY = $('div.player').position().top;
            let obstacle = { up  : false }
            for ( let i = 0; i < objPos.length; i++ ){
              if (playerY - 2  <= objPos[i][1] + objSize &&
                  playerY + playerSize > objPos[i][1] &&
                  playerX + playerSize - 2 > objPos[i][0] &&
                  playerX < objPos[i][0] + objSize
                  || playerY <= 0)
              {
                obstacle.up = true;
                return true;
              }
            }
        }

        function checkCollisionDown() {
            let playerX = $('div.player').position().left;
            let playerY = $('div.player').position().top;
            let obstacle = { down  : false }
            for ( let i = 0; i < objPos.length; i++ ){
              if (playerY + playerSize >= objPos[i][1] &&
                  playerY < objPos[i][1] &&
                  playerX + playerSize - 2 > objPos[i][0] &&
                  playerX < objPos[i][0] + objSize
                  || playerY + playerSize >=520)
              {
                obstacle.down = true;
                return true;
              }
            }
        }

        if ( keys[keys.LEFT] ) {
          // <-- animate here
          if (checkCollisionLeft()){
            movePlayer();
          } else {
            movePlayer(-1, 0);
          }
        }
        if ( keys[keys.RIGHT] ) {
          // <-- animate here
          if (checkCollisionRight()){
            movePlayer();
          } else {
            movePlayer(1, 0);
          }
        }
        if ( keys[keys.UP] ) {
          // <-- animate here
          if (checkCollisionUp()){
            movePlayer();
          } else {
            movePlayer(0, -1);
          }
        }
        if ( keys[keys.DOWN] ) {
          // <-- animate here
          if (checkCollisionDown()){
            movePlayer();
          } else {
            movePlayer(0, 1);
          }
        }

      }

      /// update current position on screen
      movePlayer();

      /// movement loop
      setInterval(function() {
        detectPlayerMovement();
      }, 20);

    } // end of playerMovement() method

  } // end of Game() object

  let game = new Game();
  game.generateLevel();
  game.playerMovement();

});
