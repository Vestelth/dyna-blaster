$(function () {

class Level {
  generateLevel() {
    // generate slots
    this.generateLevelSlotsArray();

    // randomize brick number (28 to 32)
    let brickNum = Math.round(Math.random() * (32 - 28) + 28);

    // create string od brick divs
    let divString = '';
    for ( let i = 0; i < brickNum; i++ ){
      divString += '<div class="brick"></div>';
    }
    // create elements with jQuery and append them
    $('div.game-grid').append($(divString));

    // remove av. slots - making some space for player first location
    let freeSlots = this.slots.slice();
    freeSlots.splice(0, 2);
    freeSlots.splice(11, 1);

    // randomize x and y for all bricks
    let bricks = $('div.brick');
    $.each(bricks, function (i, div) {
      let pos =  Math.round( Math.random() * (freeSlots.length - 1) );
      this.x = freeSlots[pos][0];
      this.y = freeSlots[pos][1];

      $(div).css({
        'left': this.x +'px',
        'top': this.y +'px',
      });

      // remove taken position from free slots
      freeSlots.splice(pos, 1);
    });

    // GENERATE GHOSTS ------------------------ /
    function generateGhosts() {
      // string for div.ghost elements
      let divGhostsString = '<div class="ghost"></div><div class="ghost"></div><div class="ghost"></div><div class="ghost"></div>';

      // create div.ghost elements and append them
      $('div.game-grid').append($(divGhostsString));
      // select all ghost divs
      let ghosts = $('div.ghost');
      // randomize x and y for all ghosts
      $.each(ghosts, function (i, div) {
        let pos =  Math.round( Math.random() * (freeSlots.length - 1) );
        this.x = freeSlots[pos][0];
        this.y = freeSlots[pos][1];
        // set x and y position for each ghost
        $(div).css({
          'top': this.y +'px',
          'left': this.x +'px',
        });
        // delete each taken position
        freeSlots.splice(pos, 1);
      });
    }
    generateGhosts();
  }
}

class Ghosts {

}

class Game {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.board = $('div.game-grid');
    this.player = $('div.player');
    this.brick = $('div.brick');
    this.slots = [];
    // this.freeSlots = [];
    // this.ghosts = new Ghosts();
    this.level = new Level();
  }

  showLevel() {

  }

  // --- FIND BRICK SLOTS ------------------------- /
  generateLevelSlotsArray() {
    // make and put all possible green slots in an array
    for( let i = 0; i < 13; i++ ){
      for( let j = 0; j < 13; j++ ){
        if ( i % 2 != 0  && j % 2 != 0 ){
        } else {
          this.y = i * 40;
          this.x = j * 40;
          this.slots.push([this.x, this.y]);
        }
      }
    }
  }

  // --- GENERATE LEVEL --------------------------- /

}

let game = new Game();
game.generateLevel();

});
