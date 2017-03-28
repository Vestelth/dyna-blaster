LET'S BUFF THIS GUY, HUH?

let powerUp = () => {
  let power = $('<div class="powerup"></div>');
  $('div.game-grid').append(power);

  let place =  Math.round(Math.random() * ($('.brick').length - 1));
  console.log(place);
  let powX = Math.round($('.brick').eq(place).position().left);
  let powY = Math.round($('.brick').eq(place).position().top);
  console.log(powX,powY);
  console.log(power);
  $('.powerup').css({'left': powX});
  $('.powerup').css({'top' : powY});

  console.log(power.css('left'));
}

module.exports = powerUp;
