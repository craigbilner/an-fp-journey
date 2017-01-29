const canvas = document.getElementById('td-game');
const ctx = canvas.getContext('2d');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.river = new River(ctx);
  }

  begin() {
    this.river.create();
  }
}

const game = new Game(ctx);
game.begin();
