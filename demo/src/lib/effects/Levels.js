import Effect from './Effect';

class Levels extends Effect {
  constructor() {
    super();

    this.props = [
      {
        name: 'Color',
        options: ['r', 'g', 'b'],
        default: 'b',
      },
      {
        name: 'Level',
        range: [-100, 100],
        default: 0,
      }
    ];
  }
  apply(pixels, color, adjustment) {
    // adjustment -100..100
    // color 'r', 'g', or 'b'
    adjustment = adjustment || 10;
    adjustment = (adjustment / 100) * 255;
    color = color || 'r';

    const colorOffsetMap = {
      r: 0,
      g: 1,
      b: 2,
    };
    const offset = colorOffsetMap[color];
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i + offset] = this._truncatePixelValue(adjustment + d[i + offset]);
    }
    return pixels;
  }
}

export default Levels;
