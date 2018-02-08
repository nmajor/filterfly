import Effect from './Effect';

class ColorOverlay extends Effect {
  constructor() {
    super();

    this.settings = [
      {
        name: 'Color',
        hexColor: true,
        default: '#d2c379',
      },
      {
        name: 'Level',
        range: [0, 50],
        default: 0,
      }
    ];
  }
  apply(pixels, hex, level) {
    if (level === 0) return pixels;
    // level 0..100
    level = level || 10;
    level = level / 100;
    const fg = this._colorHexToRgb(hex) || this._colorHexToRgb('#ffcc00');
    fg[3] = level;

    const r = pixels.data;
    for (let i = 0; i < r.length; i += 4) {
      const bg = [r[i], r[i + 1], r[i + 2], r[i + 3] / 255];
      const aF = bg[3] + fg[3] - bg[3] * fg[3];

      r[i] = ((fg[0] * fg[3]) + (bg[0] * bg[3]) * (1 - fg[3])) / aF;
      r[i + 1] = ((fg[1] * fg[3]) + (bg[1] * bg[3]) * (1 - fg[3])) / aF;
      r[i + 2] = ((fg[2] * fg[3]) + (bg[2] * bg[3]) * (1 - fg[3])) / aF;
      r[i + 3] = (aF * 255);
    }
    return pixels;
  }
}

export default ColorOverlay;
