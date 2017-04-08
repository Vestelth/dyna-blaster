// MOVE THE PLAYER -------------------------- /
let playerMovement = () => {
  // store key codes and currently pressed ones
  let keys = {
    UP    : 38,
    LEFT  : 37,
    RIGHT : 39,
    DOWN  : 40
  };
  // store reference to character's position
  let player = {
    x     :  2,
    y     :  2,
    speed :  4
  };

  /// key detection
  document.body.onkeyup = document.body.onkeydown = function(event){
    keys[event.which] = event.type == 'keydown';
  };

  // player movement update
  let movePlayer = (dirX, dirY) => {
    player.x += (dirX || 0) * player.speed;
    player.y += (dirY || 0) * player.speed;
    $('.player').css({'left': player.x});
    $('.player').css({'top' : player.y});
  }

  // player control
  let detectPlayerMovement = () => {
    // wall collisions
    // wall size=brick size, width = height
    let x = 0;
    let y = 0;

    const playerSize = parseInt($('.player').css('width'));
    const objSize = parseInt($('.wall').css('width'));
    
    const walls = $('.wall');
    const bricks = $('.brick');
    let objPos = [];

    // making an array with all obstacle positions
    $('.block').each( function(index) {
      x = $(this).position().left ;
      y = $(this).position().top;
      objPos.push([x, y]);
    });

    let checkCollisionLeft = () => {
        let playerX = $('.player').position().left;
        let playerY = $('.player').position().top;
        let obstacle = { left : false };

        for ( let i = 0; i < objPos.length; i++ ){
          if (playerX - 4 <= objPos[i][0] + objSize &&
              playerX + playerSize >= objPos[i][0] + 3 &&
              playerY + playerSize > objPos[i][1] &&
              playerY < objPos[i][1] + objSize
              || playerX <= 4)
          {
            obstacle.left = true;
            return true;
          }
        }
    }

    let checkCollisionRight = () => {
        let playerX = $('.player').position().left;
        let playerY = $('.player').position().top;
        let obstacle = { right : false };
        for ( let i = 0; i < objPos.length; i++ ){
          if (playerX + playerSize + 2 >= objPos[i][0] &&
              playerX <= objPos[i][0] &&
              playerY + playerSize > objPos[i][1] &&
              playerY < objPos[i][1] + objSize ||
              playerX + playerSize >= 516)
          {
            obstacle.right = true;
            return true;
          }
        }
    }

    let checkCollisionUp = () => {
        let playerX = $('.player').position().left;
        let playerY = $('.player').position().top;
        let obstacle = { up : false }
        for ( let i = 0; i < objPos.length; i++ ){
          if (playerY - 4  <= objPos[i][1] + objSize &&
              playerY + playerSize > objPos[i][1] &&
              playerX + playerSize > objPos[i][0] &&
              playerX < objPos[i][0] + objSize
              || playerY <= 4)
          {
            obstacle.up = true;
            return true;
          }
        }
    }

    let checkCollisionDown = () => {
        let playerX = $('.player').position().left;
        let playerY = $('.player').position().top;
        let obstacle = { down : false }
        for ( let i = 0; i < objPos.length; i++ ){
          if (playerY + playerSize + 4 >= objPos[i][1] &&
              playerY < objPos[i][1] &&
              playerX + playerSize > objPos[i][0] &&
              playerX < objPos[i][0] + objSize
              || playerY + playerSize >= 516)
          {
            obstacle.down = true;
            return true;
          }
        }
    }

    if ( keys[keys.LEFT] ) {
      if (checkCollisionLeft()){
        movePlayer();
      } else {
        movePlayer(-1, 0);
      }
    }
    if ( keys[keys.RIGHT] ) {
      if (checkCollisionRight()){
        movePlayer();
      } else {
        movePlayer(1, 0);
      }
    }
    if ( keys[keys.UP] ) {
      if (checkCollisionUp()){
        movePlayer();
      } else {
        movePlayer(0, -1);
      }
    }
    if ( keys[keys.DOWN] ) {
      if (checkCollisionDown()){
        movePlayer();
      } else {
        movePlayer(0, 1);
      }
    }

    $(document).on('keydown', function(event) {
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
    $(document).on('keyup', function(event) {
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
  }

  /// update current position on screen
  movePlayer();

  /// movement loop
  setInterval(function() {
    if($('.player').length != 0){
      detectPlayerMovement();
    }
  }, 40);

} // end of playerMovement() function
module.exports = playerMovement;
