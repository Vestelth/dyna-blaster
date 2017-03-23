// MOVE THE PLAYER -------------------------- /
let playerMovement = () => {
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
  let movePlayer = (dirX, dirY) => {
    player.x += (dirX || 0) * player.speed;
    player.y += (dirY || 0) * player.speed;
    player.div.css({'left': player.x});
    player.div.css({'top' : player.y});
  }

  /// player control
  let detectPlayerMovement = () => {
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

    let checkCollisionLeft = () => {
        let playerX = $('div.player').position().left;
        let playerY = $('div.player').position().top;
        let obstacle = { left  : false };

        for ( let i = 0; i < objPos.length; i++ ){
          if (playerX - 2 <= objPos[i][0] + objSize &&
              playerX + playerSize >= objPos[i][0] + 3 &&
              playerY + playerSize > objPos[i][1] &&
              playerY < objPos[i][1] + objSize
              || playerX <= 2)
          {
            obstacle.left = true;
            return true;
          }
        }
    }

    let checkCollisionRight = () => {
        let playerX = $('div.player').position().left;
        let playerY = $('div.player').position().top;
        let obstacle = { right  : false };
        for ( let i = 0; i < objPos.length; i++ ){
          if (playerX + playerSize >= objPos[i][0] &&
              playerX <= objPos[i][0] &&
              playerY + playerSize > objPos[i][1] &&
              playerY < objPos[i][1] + objSize ||
              playerX + playerSize >= 518)
          {
            obstacle.right = true;
            return true;
          }
        }
    }

    let checkCollisionUp = () => {
        let playerX = $('div.player').position().left;
        let playerY = $('div.player').position().top;
        let obstacle = { up  : false }
        for ( let i = 0; i < objPos.length; i++ ){
          if (playerY - 2  <= objPos[i][1] + objSize &&
              playerY + playerSize > objPos[i][1] &&
              playerX + playerSize - 2 > objPos[i][0] &&
              playerX < objPos[i][0] + objSize
              || playerY <= 2)
          {
            obstacle.up = true;
            return true;
          }
        }
    }

    let checkCollisionDown = () => {
        let playerX = $('div.player').position().left;
        let playerY = $('div.player').position().top;
        let obstacle = { down  : false }
        for ( let i = 0; i < objPos.length; i++ ){
          if (playerY + playerSize >= objPos[i][1] &&
              playerY < objPos[i][1] &&
              playerX + playerSize - 2 > objPos[i][0] &&
              playerX < objPos[i][0] + objSize
              || playerY + playerSize >= 518)
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
  }, 30);

} // end of playerMovement() function
