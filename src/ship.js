export class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.size) {
      this.hits += 1;
    }
  }

  isSunk() {
    if (this.hits == this.size) {
      return true;
    } else {
      return false;
    }
  }
}
