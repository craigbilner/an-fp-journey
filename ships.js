class Ship {
  constructor(river) {
    this.river = river;
    this.hasFinished = false;
    this.v = {
      x: 5,
      y: 0,
    };
  }

  takeThreeFromRiver() {
    if (!this.river.length) {
      return [];
    }

    if (this.river.length === 1) {
      const [
        { x: x1, y: y1 },
      ] = this.river;

      return [
        { x: x1, y: y1 },
      ];
    }

    if (this.river.length === 2) {
      const [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
      ] = this.river;

      return [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: x2, y: y2 },
      ];
    }

    const [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
    ] = this.river;

    this.c1 = {
      x: x1,
      y: y1,
    };
    this.c2 = {
      x: x2,
      y: y2,
    };
    this.c3 = {
      x: x3,
      y: y3,
    };
  }

  nextPosition() {
    if (!this.x && !this.y) {
      this.takeThreeFromRiver();

      this.x = this.c1.x;
      this.y = this.c1.y;

      return {
        x: this.x,
        y: this.y,
      };
    }

    if (this.river.length === 1) {
      this.x += this.v.x;
      this.y += this.v.y;

      if (this.x >= (this.river[0].x + RiverPart.width)) {
        this.hasFinished = true;
        return;
      }
    }

    const { isCorner, v } = Ship.nextInfo(this.c1, this.c2, this.c3);

    if (isCorner) {
      if (this.v.x > 0) {
        const diff = (this.x + this.v.x) - this.c2.x;
        if (diff >= 0) {
          this.x = this.c2.x;

          if (v.y < 0) {
            this.y -= diff;
          } else {
            this.y += diff;
          }
          this.v = v;
        } else {
          this.x += this.v.x;
          this.y += this.v.y;
        }

        if (this.x >= (this.c1.x + RiverPart.width)) {
          if (this.river.length > 1) {
            this.river.shift();
          }
          this.takeThreeFromRiver();
        }
      } else if (this.v.y < 0) {
        const diff = this.c2.y - (this.y + this.v.y);
        if (diff >= 0) {
          this.y = this.c2.y;
          this.x += diff;
          this.v = v;
        } else {
          this.x += this.v.x;
          this.y += this.v.y;
        }

        if (this.y <= (this.c1.y - RiverPart.height)) {
          if (this.river.length > 1) {
            this.river.shift();
          }
          this.takeThreeFromRiver();
        }
      } else {
        const diff = (this.y + this.v.y) - this.c2.y;
        if (diff >= 0) {
          this.y = this.c2.y;
          this.x += diff;
          this.v = v;
        } else {
          this.x += this.v.x;
          this.y += this.v.y;
        }

        if (this.y >= (this.c1.y + RiverPart.height)) {
          if (this.river.length > 1) {
            this.river.shift();
          }
          this.takeThreeFromRiver();
        }
      }
    } else {
      this.x += this.v.x;
      this.y += this.v.y;

      if (this.v.x > 0) {
        if (this.x >= (this.c1.x + RiverPart.width)) {
          if (this.river.length > 1) {
            this.river.shift();
          }
          this.takeThreeFromRiver();
        }
      } else if (this.v.y < 0) {
        if (this.y <= (this.c1.y - RiverPart.height)) {
          if (this.river.length > 1) {
            this.river.shift();
          }
          this.takeThreeFromRiver();
        }
      } else {
        if (this.y >= (this.c1.y + RiverPart.height)) {
          if (this.river.length > 1) {
            this.river.shift();
          }
          this.takeThreeFromRiver();
        }
      }
    }

    return {
      x: this.x,
      y: this.y,
    };
  }

  draw(ctx) {
    ctx.clearRect(this.x, this.y, RiverPart.width, RiverPart.height);
    const np = this.nextPosition();

    if (!np) {
      return;
    }

    const { x, y } = np;
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, RiverPart.width, RiverPart.height);
  }

  static nextInfo({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }) {
    const isCorner = (x1 !== x3) && (y1 !== y3);
    let x = 0;
    let y = 0;

    if (isCorner) {
      if (y3 < y2) {
        y = -5;
      } else if (y3 > y2) {
        y = 5;
      } else {
        x = 5;
      }
    }

    return {
      isCorner,
      v: {
        x,
        y,
      },
    };
  }
}

class IronShip extends Ship {

}

class Warship extends Ship {

}

class IronWarship extends (Warship, IronShip) {

}

class Submarine extends Ship {

}

class Cruiser extends Ship {

}

class AmphibiousCruiser extends (Submarine, Cruiser) {

}

class Ships {
  constructor(ctx) {
    this.ctx = ctx;
  }

  create(river) {
    this.river = river;

    const allTheShips = [
      IronShip,
      Warship,
      IronWarship,
      Submarine,
      Cruiser,
      AmphibiousCruiser,
    ];

    const [{ x, y }] = this.river;
    this.ships = [new allTheShips[0](this.river)];
  }

  updateShips() {
    let finished = 0;
    this.ships.forEach(ship => {
      if (!ship.hasFinished) {
        ship.draw(this.ctx);
      } else {
        finished += 1;
      }
    });

    if (finished === this.ships.length) {
      return true;
    }

    return false;
  }

  drawNext() {
    return this.updateShips();
  }
}
