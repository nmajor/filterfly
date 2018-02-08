import Effect from './Effect';

class Brightness extends Effect {
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
    if (adjustment === 0) { return pixels; }

    adjustment = adjustment || 10;
    adjustment = (adjustment / 100) * 255;

    const adjFactor = (259 * (adjustment + 255)) / (255 * (259 - adjustment));

    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = this._truncatePixelValue(adjFactor * (d[i] - 128) + 128);
      d[i + 1] = this._truncatePixelValue(adjFactor * (d[i + 1] - 128) + 128);
      d[i + 2] = this._truncatePixelValue(adjFactor * (d[i + 2] - 128) + 128);
    }
    return pixels;
  }
}

export default Brightness;
