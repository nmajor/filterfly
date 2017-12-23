import Effect from './Effect';

class Saturation extends Effect {
  constructor() {
    super();

    this.props = [
      {
        name: 'Level',
        range: [ -100, 100],
        default: 0,
      }
    ];
  }
  apply(pixels, adjustment) {
    // adjustment -100..100
    adjustment = adjustment || 20;
    adjustment = 1 + ((adjustment / 100) * 4);

    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const hsv = this._rgbToHsv([d[i], d[i + 1], d[i + 2]]);
      if (adjustment > 0) {
        hsv[1] = hsv[1] * adjustment;
      } else {
        hsv[1] = hsv[1] / Math.abs(adjustment);
      }
      const rgb = this._hsvToRgb(hsv);
      d[i] = rgb[0];
      d[i + 1] = rgb[1];
      d[i + 2] = rgb[2];
    }
    return pixels;
  }
}

export default Saturation;
