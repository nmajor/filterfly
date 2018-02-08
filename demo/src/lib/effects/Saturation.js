import Effect from './Effect';

class Saturation extends Effect {
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
    const max = 0.9;
    if (adjustment === 0) return pixels;
    adjustment = adjustment / 80;

    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const hsv = this._rgbToHsv([d[i], d[i + 1], d[i + 2]]);
      if (adjustment > 0) {
        const diff = max - hsv[1];
        hsv[1] = hsv[1] + (diff * adjustment);
      } else {
        hsv[1] = hsv[1] - (hsv[1] * Math.abs(adjustment));;
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
