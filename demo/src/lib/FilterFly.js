import filters from './defaultFilters.json';

import Brightness from './effects/Brightness';
import Contrast from './effects/Contrast';
import Grayscale from './effects/Grayscale';
import ColorOverlay from './effects/ColorOverlay';
import Levels from './effects/Levels';
import Vignette from './effects/Vignette';
import Saturation from './effects/Saturation';
import Hue from './effects/Hue';

class FilterFly {
  constructor(image, initialFilters) {
    this.image = image;
    this.filters = initialFilters || filters;

    this.effects = {
      brightness: new Brightness(),
      contrast: new Contrast(),
      grayscale: new Grayscale(),
      colorOverlay: new ColorOverlay(),
      levels: new Levels(),
      vignette: new Vignette(),
      saturation: new Saturation(),
      hue: new Hue(),
    }
  }
  getPixels() {
    const c = this.getCanvas(this.image.width, this.image.height);
    const ctx = c.getContext('2d');
    ctx.drawImage(this.image, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
  }
  getCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }
  toCanvas(pixels) {
    const canvas = this.getCanvas(pixels.width, pixels.height);
    canvas.getContext('2d').putImageData(pixels, 0, 0);
    return canvas;
  }
  toDataURL(pixels) {
    const canvas = this.getCanvas(pixels.width, pixels.height);
    canvas.getContext('2d').putImageData(pixels, 0, 0);
    return canvas.toDataURL();
  }
  filterImage(filter) {
    // If its not a string its expected
    // to be an object with effect data
    if (typeof(filter) === 'string') {
      filter = this.filters[filter];
    }

    let pixels = this.getPixels(this.image);

    return this.applyFilter(pixels, filter);
  }
  applyFilter(pixels, filter) {
    for (let effect in filter) {
      if (filter.hasOwnProperty(effect)) {
        pixels = this.effects[effect].apply.apply(this.effects[effect], [pixels, ...filter[effect]]);
      }
    }

    return pixels
  }
  availableFilters() {
    const filters = [];

    for (let filter in this.filters) {
      if (this.filters.hasOwnProperty(filter)) {
        filters.push(filter);
      }
    }

    return filters;
  }
}

export default FilterFly;
