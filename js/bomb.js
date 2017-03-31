// LET'S BLOW SOME STUFF UP! ------------------ /

let bombHandler = () => {

    const bricks = $('div.brick');
    let range = 1;
    let bombNumber = 0;
    let bricksPositions = [];
    let boom = new Audio("sounds/boom.wav");

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
                  boom.play();
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
      fireLeft.fadeOut(300);
      fireLeft.remove();

      let fireRight = $('.game-grid').find('.' + (x + 40) + '-' + y);
      fireRight.fadeOut(300);
      fireRight.remove();

      let fireUp = $('.game-grid').find('.' + x + '-' + (y + 40));
      fireUp.fadeOut(300);
      fireUp.remove();

      let fireDown = $('.game-grid').find('.'+ x + '-' + (y - 40));
      fireDown.fadeOut(300);
      fireDown.remove();

    }

    // bomb hurts moving characters
    let bombCharDamage = (bX, bY) => {
        $('.mobile').each( function(index) {
          const charX = $(this).position().left;
          const charY = $(this).position().top;
          const charSize = parseInt($(this).css('width'));
          const bombSize = parseInt($('.bomb').css('width'));
          if ($('.powerup').length != 0) {
            range = 1;
          } else {
            range = 2;
          }
          
          if (charX + charSize > bX - (range * 40) &&
              charX < bX + bombSize + (range * 40) &&
              charY + charSize > bY && charY < bY + bombSize)
          {
              $(this).fadeOut(400);
              $(this).remove();
          } else if
             (charY + charSize > bY - (range * 40) &&
              charY < bY + bombSize + (range * 40) &&
              charX + charSize > bX && charX < bX + bombSize)
          {
              $(this).fadeOut(400);
              $(this).remove();
          }
        });
    }

} // end of bombHandler
module.exports = bombHandler;
