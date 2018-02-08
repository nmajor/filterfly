import Effect from './Effect';

class Contrast extends Effect {
  constructor() {
    super();

    this.settings = [
      {
        name: 'Level',
        range: [ -50, 50],
        default: 0,
      }
    ];
  }
  apply(pixels, adjustment) {
    // adjustment -100..100
    adjustment = (adjustment / 100) * 255;

    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = this._truncatePixelValue(adjustment + d[i]);
      d[i + 1] = this._truncatePixelValue(adjustment + d[i + 1]);
      d[i + 2] = this._truncatePixelValue(adjustment + d[i + 2]);
    }
    return pixels;
  }
}

export default Contrast;
