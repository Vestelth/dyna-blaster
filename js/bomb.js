// LET'S BLOW SOME STUFF UP! ------------------ /

let bombHandler = () => {

    const bricks = $('div.brick');
    let range = 1;
    let bombLimit = 1;
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
          if ($('.bomb').length === 0){
            const makeBomb = $('<div class="bomb" id="bomb1"></div>')
            .appendTo($('.game-grid'));
            $('#bomb1').css({
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
                  $('#bomb1').remove();
              }, 2500);
            }
            tickerStart(bombX, bombY);

          } else if ($('.powerup').length === 0 && $('.bomb').length === 1) {
            let bomb2X = Math.round( playerX / 40 ) * 40;
            let bomb2Y = Math.round( playerY / 40 ) * 40;
            const makeBomb2 = $('<div class="bomb" id="bomb2"></div>')
            .appendTo($('.game-grid'));
            $('#bomb2').css({
              'left': bomb2X + 'px',
              'top': bomb2Y + 'px',
            });

            // destroy bricks after bomb explodes
            let tickerStart = (x, y) => {
              let ticker = setTimeout(() => {
                  // destroy brick walls
                  brickBurn(x, y);
                  // hurt player or ghosts
                  bombCharDamage(x, y);
                  boom.play();
                  $('#bomb2').remove();
              }, 2500);
            }
            tickerStart(bomb2X, bomb2Y);
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
