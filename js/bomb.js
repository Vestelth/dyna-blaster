// LET'S BLOW SOME STUFF UP! ------------------ /
let bombHandler = () => {

    const range = 1;
    const bricks = $('div.brick');
    let bombNumber = 0;
    let bricksPositions = [];

    let brickBurn = (x, y) => {

      let fireLeft = $('div.game-grid').find('div.' +(x - 40)+ '-' + y);
      fireLeft.remove();

      let fireRight = $('div.game-grid').find('div.' +(x + 40)+ '-' + y);
      fireRight.remove();

      let fireUp = $('div.game-grid').find('div.'+ x + '-' + (y + 40));
      fireUp.remove();

      let fireDown = $('div.game-grid').find('div.'+ x + '-' + (y - 40));
      fireDown.remove();

    }

    $(document).on('keydown', function(event) {

        if (event.which == 32) {
          event.preventDefault();
          const playerX = $('div.player').position().left;
          const playerY = $('div.player').position().top;
          const bombX = Math.round( playerX / 40 ) * 40;
          const bombY = Math.round( playerY / 40 ) * 40

          if (bombNumber === 0){
            const makeBomb = $('<div class="bomb"></div>')
            .appendTo($('div.game-grid'));
            ;
            bombNumber ++;

            $('div.bomb').css({
              'left': bombX + 'px',
              'top': bombY + 'px',
            });

            let ticker = setTimeout(function() {
                brickBurn(bombX, bombY);

                let blowTime = setTimeout(function(){
                  console.log('Tu wywołać promień wybuchu');
                }, 500);

                $('div.bomb').remove();
                bombNumber = 0;
            }, 2200);
          }
        }
    });
} // end of bombHandler
