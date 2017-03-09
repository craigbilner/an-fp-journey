const riverCanvas = document.getElementById('td-river');
const riverCtx = riverCanvas.getContext('2d');
const shipCanvas = document.getElementById('td-ships');
const shipCtx = shipCanvas.getContext('2d');

class Game {
  constructor() {
    this.river = new River(riverCtx);
    this.ships = new Ships(shipCtx);
  }

  begin() {
    this.river.create();
    this.ships.create(this.river.course);
    this.setSail();
  }

  setSail() {
    const hasFinished = this.ships.drawNext();

    if (!hasFinished) {
      requestAnimationFrame(() => this.setSail());
    }
  }
}

const game = new Game();
game.begin();
