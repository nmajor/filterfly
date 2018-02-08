import Effect from './Effect';

class Vignette extends Effect {
  constructor() {
    super();

    this.settings = [
      {
        name: 'Radius',
        range: [0, 100],
        default: 0,
      },
      {
        name: 'Spread',
        range: [0, 100],
        default: 0,
      },
    ];
  }
  apply(pixels, radius, spread) {
    if (radius === 0 || spread === 0) return pixels;

    const maxSpread = 20;
    spread = 1 / (maxSpread * (spread / 100));

    const maxRadius = Math.sqrt(Math.pow((pixels.width / 2), 2) + Math.pow((pixels.height / 2), 2));
    const minRadius = maxRadius / 2;
    radius = maxRadius - ((maxRadius - minRadius) * (radius / 100));

    const mid = [pixels.width / 2, pixels.height / 2];
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const pixelNum = i / 4;
      // Get the position relative to the center
      const pos = [-(mid[0] - pixelNum % pixels.width), mid[1] - parseInt(pixelNum / pixels.width, 10)];

      // Calculate the distance using the pythagorean theorem
      const dist = Math.sqrt(Math.pow(pos[0], 2) + Math.pow(pos[1], 2));
      // const dist = Math.sqrt(Math.pow(pos[0], 2) + Math.pow(pos[1] * (pixels.width / pixels.height), 2));

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
