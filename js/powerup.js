let interactiveObjects = () => {

  const levelMusic = new Audio("sounds/level-music.wav");
  const deathSound = new Audio("sounds/death.wav");
  const bonusSound = new Audio("sounds/bonus.wav");

  // EXIT LEVEL
  let exit = $('<div class="exit"></div>');
  $('div.game-grid').append(exit);
  // randomize exit position
  let spot =  Math.round(Math.random() * ($('.brick').length - 1));

  const exitX = Math.round($('.brick').eq(spot).position().left);
  const exitY = Math.round($('.brick').eq(spot).position().top);
  const exitSize = parseInt($('.exit').css('width'));
  const playerSize = parseInt($('.player').css('width'));
  const exitSound = new Audio("sounds/clear.wav");
  // set position
  $('.exit').css({'left': exitX});
  $('.exit').css({'top' : exitY});

  let playerExit = () => {
    if ($('.player').length === 0){
      return false;
    } else {
      let playerX = $('.player').position().left;
      let playerY = $('.player').position().top;
      // player - exit collision
      if (exitX < playerX + playerSize &&
          exitX + exitSize > playerX &&
          exitY < playerY + playerSize &&
          exitY + exitSize > playerY)
      {
        return true;
      }
    }
  }

  //LET'S BUFF THIS GUY, HUH?
  let power = $('<div class="powerup"></div>');
  $('div.game-grid').append(power);
  // randomize powerup position
  let place =  Math.round(Math.random() * ($('.brick').length - 1));

  const powX = Math.round($('.brick').eq(place).position().left);
  const powY = Math.round($('.brick').eq(place).position().top);
  const powSize = parseInt($('.powerup').css('width'));

  $('.powerup').css({'left': powX});
  $('.powerup').css({'top' : powY});

  let playerPower = () => {
    if ($('.player').length === 0){
      return false;
    } else {
      // set position
      let playerX = $('.player').position().left;
      let playerY = $('.player').position().top;
      // player - powerup collision
      if (powX < playerX + playerSize &&
          powX + powSize > playerX &&
          powY < playerY + playerSize &&
          powY + powSize > playerY)
      {
        $('.powerup').fadeOut(50);
        $('.powerup').remove();
        return true;
      }
    }
  }
  
  let exitListener = setInterval(function () {
      if ($('.ghost').length === 0 && playerExit()) {
        clearInterval(exitListener);
        levelMusic.pause();
        exitSound.play();
        $(document).unbind();
        $('div.win').fadeIn(20);
      }
  }, 300);

  let bonusListener = setInterval(function () {
    if (playerPower()) {
      clearInterval(bonusListener);
      bonusSound.play();
    }
  }, 300);

  levelMusic.play();

  let gameOverListener = setInterval( () => {
    if($('.player').css('display') == 'none' || $('.player').length === 0){
      $('.player').addClass('.dead')
      clearInterval(gameOverListener);
      levelMusic.pause();
      deathSound.play();
      setTimeout(function () {
        $(document).unbind();
        $('div.game-over').fadeIn(100);
      }, 500);
    }
  }, 250);


}

module.exports = interactiveObjects;
