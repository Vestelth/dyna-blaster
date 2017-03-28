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

let ghostMovement = (callback) => {

  const ghostSize = parseInt($('.ghost').css('width'));
  const blockSize = parseInt($('.wall').css('width'));
  const ghostDiv = $('.ghost');
  obj2Pos = [];
  $('.block').each( function(index) {
      x = $(this).position().left;
      y = $(this).position().top;
      obj2Pos.push([x, y]);
  });

  $(document).on('keydown', function(event) {
      if (event.which == 32) {
        event.preventDefault();
        setTimeout(function () {
          obj2Pos =[];
          $('.block').each( function(index) {
              x = $(this).position().left;
              y = $(this).position().top;
              obj2Pos.push([x, y]);
          });
        }, 2000);
      }
  });

  //making an array with all obstacle positions

  let checkCollRight = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for (let i = 0; i < obj2Pos.length; i++){
        if (gX + ghostSize + 4 >= obj2Pos[i][0] &&
            gX < obj2Pos[i][0] &&
            gY + ghostSize + 1 >= obj2Pos[i][1] &&
            gY - 1 <= obj2Pos[i][1] + blockSize ||
            gX + ghostSize >= 516)
        {
          return true;
        }
      }
  }

  let checkCollLeft = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for (let i = 0; i < obj2Pos.length; i++){
        if (gX - 3 <= obj2Pos[i][0] + blockSize &&
            gX + ghostSize > obj2Pos[i][0] &&
            gY + ghostSize + 1 >= obj2Pos[i][1] &&
            gY - 1 <= obj2Pos[i][1] + blockSize
            || gX <= 4)
        {
          return true;
        }
      }
  }
  let checkCollUp = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for (let i = 0; i < obj2Pos.length; i++){
        if (gY - 4 <= obj2Pos[i][1] + blockSize &&
            gY + ghostSize > obj2Pos[i][1] &&
            gX + ghostSize >= obj2Pos[i][0] &&
            gX <= obj2Pos[i][0] + blockSize
            || gY <= 4)
        {
          return true;
        }
      }
  }
  let checkCollDown = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for (let i = 0; i < obj2Pos.length; i++){
        if (gY + ghostSize + 4 >= obj2Pos[i][1] &&
            gY < obj2Pos[i][1] &&
            gX + ghostSize >= obj2Pos[i][0] &&
            gX <= obj2Pos[i][0] + blockSize
            || gY + ghostSize >= 516)
        {
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

  $('.ghost').each(function(index) {
    let thisGhost = $(this);
    let direction = {
        right : false,
        left  : false,
        up    : false,
        down  : false
    }

    let time = setInterval(function () {

      if (direction.right && !checkCollRight(thisGhost)){
        moveGhost(1, 0, thisGhost);
      } else if (direction.left && !checkCollLeft(thisGhost)){
        moveGhost(-1, 0, thisGhost);
      } else if (direction.up && !checkCollUp(thisGhost)){
        moveGhost(0, -1, thisGhost);
      } else if (direction.down && !checkCollDown(thisGhost)){
        moveGhost(0, 1, thisGhost);
      } else {
        let possibleDir = ['right','up','down','left'];

        if (checkCollRight(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'right'){
              possibleDir.splice(i, 1);
              direction.right = false;
            }
          }
        }
        if (checkCollLeft(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'left'){
              possibleDir.splice(i, 1);
              direction.left = false;
            }
          }
        }
        if (checkCollUp(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'up'){
              possibleDir.splice(i, 1);
              direction.up = false;
            }
          }
        }
        if (checkCollDown(thisGhost)) {
          for (var i = 0; i < possibleDir.length; i++) {
            if (possibleDir[i] === 'down'){
              possibleDir.splice(i, 1);
              direction.down = false;
            }
          }
        }
        let newDir = Math.round(
          Math.random() * (possibleDir.length - 1)
        );
        switch(possibleDir[newDir]) {
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


}
