class RiverPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, RiverPart.width, RiverPart.height);
  }
}
RiverPart.width = 50;
RiverPart.height = 50;

class River {
  constructor(ctx) {
    this.ctx = ctx;
    this.riverParts = {};
    this.course = [];
  }

  create() {
    const y = River.getRandomIntInclusive(0, this.ctx.canvas.height - RiverPart.height);
    this.riverParts[`0|${y}`] = new RiverPart(0, y);
    let next = new RiverPart(RiverPart.width, y);

    while ((next.x + RiverPart.width) < this.ctx.canvas.width) {
      this.riverParts[`${next.x}|${next.y}`] = next;
      const options = this.getValidPositions(next);

      if (!options.length) {
        const finalPart = new RiverPart(next.x + RiverPart.width, next.y);
        this.riverParts[`${finalPart.x}|${finalPart.y}`] = finalPart;
        break;
      }

      const nextPosition = River.pickRandomPosition(options);

      next = new RiverPart(nextPosition.x, nextPosition.y);
    }

    const keys = Object.keys(this.riverParts);
    this.course = [];

    for (let i = 0; i < keys.length; i++) {
      this.course.push(this.riverParts[keys[i]]);
    }

    this.course.forEach(part => part.draw(this.ctx));
  }

  getValidPositions(rp) {
    const options = [];

    if ((rp.x + (RiverPart.width * 2)) >= this.ctx.canvas.width) {
      return options;
    }

    if ((rp.x + RiverPart.width * 2) <= this.ctx.canvas.width) {
      const x = rp.x + RiverPart.width;
      // can go right
      if (!this.riverParts[`${x}|${rp.y}`]) {
        options.push({
          x,
          y: rp.y,
        });
      }
    }

    if ((rp.y + RiverPart.height * 2) <= this.ctx.canvas.height) {
      const y = rp.y + RiverPart.height;
      // can go down
      if (!this.riverParts[`${rp.x}|${y}`] && !this.riverParts[`${rp.x - RiverPart.width}|${y}`]) {
        options.push({
          x: rp.x,
          y,
        });
      }
    }

    if ((rp.y - RiverPart.height) >= 0) {
      const y = rp.y - RiverPart.height;
      // can go up
      if (!this.riverParts[`${rp.x}|${y}`] && !this.riverParts[`${rp.x - RiverPart.width}|${y}`]) {
        options.push({
          x: rp.x,
          y,
        });
      }
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
