// LET'S BLOW SOME STUFF UP! ------------------ /

let bombHandler = () => {

    const bricks = $('div.brick');
    const range = 1;
    let bombNumber = 0;
    let bricksPositions = [];

    // event to make bomb with space button
    $(document).on('keydown', function(event) {

        if (event.which == 32) {
          event.preventDefault();
          let playerX = $('.player').position().left;
          let playerY = $('.player').position().top;
          let bombX = Math.round( playerX / 40 ) * 40;
          let bombY = Math.round( playerY / 40 ) * 40;

          // create bomb TO.DO: make 'limit' instead of a 0
          if (bombNumber === 0){
            const makeBomb = $('<div class="bomb"></div>')
            .appendTo($('.game-grid'));
            $('.bomb').css({
              'left': bombX + 'px',
              'top': bombY + 'px',
            });

            // destroy bricks after bomb explodes
            let tickerStart = (x, y) => {
              let ticker = setTimeout(() => {
                  // destroy brick walls
                  brickBurn(x, y);
                  // hurt player or ghosts
                  bombCharDamage(x, y);

                  $('.bomb').remove();

                  bombNumber --;

              }, 2500);
            }
            tickerStart(bombX, bombY);
            bombNumber ++;
          }
        }
    });

    // find bricks for each blow direction and destroy them
    let brickBurn = (x, y) => {

      let fireLeft = $('.game-grid').find('.' + (x - 40) + '-' + y);
      fireLeft.fadeOut(400);

      let fireRight = $('.game-grid').find('.' + (x + 40) + '-' + y);
      fireRight.fadeOut(400);

      let fireUp = $('.game-grid').find('.' + x + '-' + (y + 40));
      fireUp.fadeOut(400);

      let fireDown = $('.game-grid').find('.'+ x + '-' + (y - 40));
      fireDown.fadeOut(400);
    }

    // bomb hurts moving characters
    let bombCharDamage = (bX, bY) => {
        $('.mobile').each( function(index) {
          let charX = $(this).position().left;
          let charY = $(this).position().top;
          let charSize = parseInt($(this).css('width'));
          let bombSize = parseInt($('.bomb').css('width'));

          if (charX + charSize > bX - (range * 40) &&
              charX < bX + bombSize + (range * 40) &&
              charY + charSize > bY && charY < bY + bombSize)
          {

              $(this).fadeOut(300);

          } else if
             (charY + charSize > bY - (range * 40) &&
              charY < bY + bombSize + (range * 40) &&
              charX + charSize > bX && charX < bX + bombSize)
          {

              $(this).fadeOut(300);
              
          }
        });
    }
    return true;

} // end of bombHandler
module.exports = bombHandler;
