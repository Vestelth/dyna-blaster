let interactiveObjects = () => {

  const levelMusic = new Audio("sounds/level-music.wav");
  const deathSound = new Audio("sounds/death.wav");
  const bonusSound = new Audio("sounds/bonus.wav");

  // EXIT LEVEL
  let exit = $('<div class="exit"></div>');
  $('div.game-grid').append(exit);

  let spot =  Math.round(Math.random() * ($('.brick').length - 1));

  const exitX = Math.round($('.brick').eq(spot).position().left);
  const exitY = Math.round($('.brick').eq(spot).position().top);
  const exitSize = parseInt($('.exit').css('width'));
  const playerSize = parseInt($('.player').css('width'));
  const exitSound = new Audio("sounds/clear.wav");

  $('.exit').css({'left': exitX});
  $('.exit').css({'top' : exitY});

  let playerExit = () => {
    if ($('.player').length === 0){
      return false;
    } else {
      let playerX = $('.player').position().left;
      let playerY = $('.player').position().top;

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
      let playerX = $('.player').position().left;
      let playerY = $('.player').position().top;

      if (powX < playerX + playerSize &&
          powX + powSize > playerX &&
          powY < playerY + playerSize &&
          powY + powSize > playerY)
      {
        $('.powerup').fadeOut(50);
        return true;
      }
    }
  }

  let exitListener = setInterval(function () {
      if ($('.ghost').length === 0 && playerExit()) {
        clearInterval(exitListener);
        $('.exit').addClass('blink');
        levelMusic.pause();
        exitSound.play();
        $(document).unbind();
        $('div.win').fadeIn(10);
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
      clearInterval(gameOverListener);
      levelMusic.pause();
      deathSound.play();
      $(document).unbind();
      $('div.game-over').fadeIn(10);
    }
  }, 200);


}

module.exports = interactiveObjects;
