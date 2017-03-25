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
        // TO.DO: game over, restart and life--;
        $('.player').fadeOut(300);
    }
  });

}

let ghostPlayerTicker = setInterval(function () {
  ghostEatsPlayer();
}, 20);

let ghostMovement = () => {


  let moveInterval = setInterval(function() {

  }, 40);

  $('.ghost').each( function(index) {

  });
}
