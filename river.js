class RiverPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, RiverPart.width, RiverPart.height);
  }
}
RiverPart.width = 10;
RiverPart.height = 10;

class River {
  constructor(ctx) {
    this.ctx = ctx;
    this.river = [];
  }

  create() {
    const y = River.getRandomIntInclusive(0, this.ctx.canvas.height - RiverPart.height);
    let next = new RiverPart(0, y);

    while ((next.x + RiverPart.width) < this.ctx.canvas.width) {
      this.river.push(next);
      const options = this.getValidPositions(next);

      if (!options.length) {
        break;
      }

      const nextPosition = River.pickRandomPosition(options);

      next = new RiverPart(nextPosition.x, nextPosition.y);
    }

    this.river.forEach(part => part.draw(this.ctx));
  }

  getValidPositions(rp) {
    const options = [];

    if ((rp.x + RiverPart.width * 2) <= this.ctx.canvas.width) {
      // can go right
      options.push({
        x: rp.x + RiverPart.width,
        y: rp.y,
      });
    }

    if ((rp.y + RiverPart.height * 2) <= this.ctx.canvas.height) {
      // can go down
      options.push({
        x: rp.x,
        y: rp.y + RiverPart.height,
      });
    }

    if ((rp.x - RiverPart.width) >= 0) {
      // can go left
      options.push({
        x: rp.x - RiverPart.width,
        y: rp.y,
      });
    }

    if ((rp.y - RiverPart.height) >= 0) {
      // can go up
      options.push({
        x: rp.x,
        y: rp.y - RiverPart.height,
      });
    }

    return options;
  }

  static pickRandomPosition(options) {
    const indx = River.getRandomIntInclusive(0, options.length - 1);
    return options[indx];
  }

  static getRandomIntInclusive(min, max) {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);

    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
  }
}
