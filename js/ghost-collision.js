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

  //making an array with all obstacle positions
  $('.block').each( function(index) {
    x = $(this).position().left ;
    y = $(this).position().top;
    obj2Pos.push([x, y]);
  });

  let checkCollRight = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gX + ghostSize + 4 >= obj2Pos[i][0] &&
            gX <= obj2Pos[i][0] &&
            gY + ghostSize + 4 > obj2Pos[i][1] &&
            gY - 4 < obj2Pos[i][1] + blockSize ||
            gX + ghostSize >= 516)
        {
          return true;
        }
      }
  }

  let checkCollLeft = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gX - 4 <= obj2Pos[i][0] + blockSize &&
            gX + ghostSize >= obj2Pos[i][0] &&
            gY + ghostSize + 4 > obj2Pos[i][1] &&
            gY - 4 < obj2Pos[i][1] + blockSize
            || gX <= 4)
        {
          return true;
        }
      }
  }

  let checkCollUp = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gY - 4  <= obj2Pos[i][1] + blockSize &&
            gY + ghostSize > obj2Pos[i][1] &&
            gX + ghostSize + 4 > obj2Pos[i][0] &&
            gX - 4 < obj2Pos[i][0] + blockSize
            || gY <= 4)
        {
          return true;
        }
      }
  }

  let checkCollDown = (ghost) => {
      let gX = ghost.position().left;
      let gY = ghost.position().top;

      for ( let i = 0; i < obj2Pos.length; i++ ){
        if (gY + ghostSize + 4 >= obj2Pos[i][1] &&
            gY < obj2Pos[i][1] &&
            gX + ghostSize > obj2Pos[i][0] &&
            gX < obj2Pos[i][0] + blockSize
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

  let time = setInterval(function () {
    $('.ghost').each( function(index) {
      let thisGhost = $(this);
      let ghostX = $(this).position().left;
      let ghostY = $(this).position().top;
      let possibleDir = ['right','left','up','down'];

      if (checkCollRight(thisGhost)) {
        console.log('collision right detected');
        for (var i = 0; i < possibleDir.length; i++) {
          if (possibleDir[i] === 'right'){
            possibleDir.splice(i, 1);
          }
        }
      }
      if (checkCollLeft(thisGhost)) {
        console.log('collision left detected');
        for (var i = 0; i < possibleDir.length; i++) {
          if (possibleDir[i] === 'left'){
            possibleDir.splice(i, 1);
          }
        }
      }
      if (checkCollUp(thisGhost)) {
        console.log('collision up detected');
        for (var i = 0; i < possibleDir.length; i++) {
          if (possibleDir[i] === 'up'){
            possibleDir.splice(i, 1);
          }
        }
      }
      if (checkCollDown(thisGhost)) {
        console.log('collision down detected');
        for (var i = 0; i < possibleDir.length; i++) {
          if (possibleDir[i] === 'down'){
            possibleDir.splice(i, 1);
          }
        }
      }

      let newDir =  Math.round( Math.random() * (possibleDir.length - 1) );

      console.log(possibleDir[newDir]);

      switch(possibleDir[newDir]) {
        case 'left':
          console.log('case left');
          moveGhost(-1 , 0, thisGhost);
          break;
        case 'right':
          console.log('case right');
          moveGhost(1, 0, thisGhost);
          break;
        case 'up':
          console.log('case up');
          moveGhost(0, -1, thisGhost);
          break;
        case 'down':
          console.log('case down');
          moveGhost(0, 1, thisGhost);
      }

    });

  }, 200);

}
