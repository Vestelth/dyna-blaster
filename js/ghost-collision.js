// GHOST MOVEMENT ------------------ /

let ghostEatsPlayer = () => {

  let playerX = $('.player').position().left;
  let playerY = $('.player').position().top;
  let playerSize = parseInt($('.player').css('width'));

  $('.ghost').each( function(index) {
    let ghostX = $(this).position().left;
    let ghostY = $(this).position().top;
    let ghostSize = parseInt($(this).css('width'));

    if (ghostX < playerX + playerSize &&
        ghostX + ghostSize > playerX &&
        ghostY < playerY + playerSize &&
        ghostY + ghostSize > playerY)
    {
        //TODO: game over, restart and -1 life;
        $('.player').fadeOut(300);
    }
  });

}

let ghostPlayerTicker = setInterval(function () {
  ghostEatsPlayer();
}, 20);

let ghostMovement = () => {

  const ghostSize = parseInt($('.ghost').css('width'));
  const blockSize = parseInt($('.wall').css('width'));

  let possibleDirArray = [];
  let obj2Pos = [];
  let ghostSpeed = 1;

  let obstacle = {
    left  : false,
    right : false,
    up    : false,
    down  : false
  }

  let checkRight = (gX, gY, blX, blY) => {
    if (gX + ghostSize + 5  > blX && gX < blX &&
        gY + ghostSize > blY && gY < blY + blockSize
        || gX + ghostSize > 518)
    {
        obstacle.right = true;
        console.log(obstacle.right);
        return true;
    } else {
        console.log(obstacle.right);
        return false;
    }
  }




  //making an array with all obstacle positions
  $('.block').each( function(index) {
    x = $(this).position().left ;
    y = $(this).position().top;
    obj2Pos.push([x, y]);
  });

  let checkCollRight = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;
      let obstacle = { right  : false };
      //console.log(gX + ghostSize);
      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gX + ghostSize + 4 >= obj2Pos[i][0] &&
            gX <= obj2Pos[i][0] &&
            gY + ghostSize + 4 > obj2Pos[i][1] &&
            gY - 4 < obj2Pos[i][1] + blockSize ||
            gX + ghostSize >= 516)
        {
          obstacle.right = true;
          return true;
        }
      }
  }

  let checkCollisionLeft = () => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;
      let obstacle = { left  : false };

      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gX - 4 <= objPos[i][0] + blockSize &&
            gX + ghostSize >= obj2Pos[i][0] &&
            gY + ghostSize + 4 > obj2Pos[i][1] &&
            gY - 4 < obj2Pos[i][1] + blockSize
            || gX <= 4)
        {
          obstacle.left = true;
          return true;
        }
      }
  }

  let checkCollisionUp = () => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;
      let obstacle = { up  : false }
      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gY - 4  <= obj2Pos[i][1] + blockSize &&
            gY + ghostSize > obj2Pos[i][1] &&
            gX + ghostSize + 4 > obj2Pos[i][0] &&
            gX - 4 < obj2Pos[i][0] + blockSize
            || gY <= 4)
        {
          obstacle.up = true;
          return true;
        }
      }
  }

  let checkCollisionDown = () => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;
      let obstacle = { down  : false }
      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gY + ghostSize >= obj2Pos[i][1] &&
            gY < obj2Pos[i][1] &&
            gX + ghostSize - 2 > obj2Pos[i][0] &&
            gX < obj2Pos[i][0] + objSize
            || gY + ghostSize >= 518)
        {
          obstacle.down = true;
          return true;
        }
      }
  }

  let moveGhost = (dirX, dirY, ghost) => {
    let gX = ghost.position().left;
    let gY = ghost.position().top;
    gX += dirX * 2;
    gY += dirY * 2;
    ghost.css({'left': gX });
    ghost.css({'top' : gY });
  }

  let time = setInterval(function () {
    $('.ghost').each( function(index) {
      let thisGhost = $(this);
      let ghostX = $(this).position().left;
      let ghostY = $(this).position().top;

        if (checkCollRight(thisGhost)) {
          moveGhost(0, -1, thisGhost);
        }


    });

  }, 50);

}
