import Effect from './Effect';

class Vignette extends Effect {
  constructor() {
    super();

    this.props = [
      {
        name: 'Radius',
        range: [1, 10],
        default: 0,
      },
      {
        name: 'Spread',
        range: [1, 10],
        default: 0,
      },
    ];
  }
  apply(pixels, radius, spread) {
    // spread 1..10
    // radius 1..10
    spread = spread || 5;
    spread = (spread / 10) * 20;
    spread = 1 / spread;

    const mid = [pixels.width / 2, pixels.height / 2];
    radius = radius || 5;
    radius = ((mid[1] / 2) + ((mid[1] / 10) * radius));

    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const pixelNum = i / 4;
      // Get the position relative to the center
      const pos = [-(mid[0] - pixelNum % pixels.width), mid[1] - parseInt(pixelNum / pixels.width, 10)];

      // Calculate the distance using the pythagorean theorem
      // Also offset it by w/h to make it eliptical
      const dist = Math.sqrt(Math.pow(pos[0], 2) + Math.pow(pos[1] * (pixels.width / pixels.height), 2));

      // By only adjusting when the distance is equal to height/2
      // It will only affect the corners
      if (dist > radius) {
        const adjustment = spread * Math.pow((dist - radius) * spread, 2);

        d[i] = d[i] - adjustment;
        d[i + 1] = d[i + 1] - adjustment;
        d[i + 2] = d[i + 2] - adjustment;
        d[i + 3] = d[i + 3];
      }
    }
    return pixels;
  }
}

export default Vignette;
