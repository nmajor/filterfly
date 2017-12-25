import Effect from './Effect';

class Levels extends Effect {
  constructor() {
    super();

    this.settings = [
      {
        name: 'Red',
        range: [-100, 100],
        default: 0,
      },
      {
        name: 'Green',
        range: [-100, 100],
        default: 0,
      },
      {
        name: 'Blue',
        range: [-100, 100],
        default: 0,
      }
    ];
  }
  apply(pixels, rAdj, gAdj, bAdj) {
    // adjustment -100..100
    // color 'r', 'g', or 'b'
    rAdj = (rAdj / 100) * 255;
    gAdj = (gAdj / 100) * 255;
    bAdj = (bAdj / 100) * 255;

    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = this._truncatePixelValue(rAdj + d[i]);
      d[i + 1] = this._truncatePixelValue(gAdj + d[i + 1]);
      d[i + 2] = this._truncatePixelValue(bAdj + d[i + 2]);
    }
    return pixels;
  }
}

export default Levels;
