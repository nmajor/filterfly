import React, { Component } from 'react';
import FilterFly from '../../lib/FilterFly';
import FilterImage from '../FilterImage/FilterImage';
import FilterOptions from '../FilterOptions/FilterOptions';
import FilterEffects from '../FilterEffects/FilterEffects';

class ImageContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: 'original',
      imageLoaded: false,
      filterFly: null,
    };

    this.setFilter = this.setFilter.bind(this);
    this.setImage = this.setImage.bind(this);

    this.setImage('/img/pyramid.jpg');
  }
  setImage(img) {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.origin = 'Anonymous';
    image.onload = () => {
      this.setState({
        imageLoaded: true,
        filterFly: new FilterFly(image)
      });
    };
    // image.src = 'http://nmajor.com/assets/images/me.jpg';
    image.src = img;
  }
  setFilter(filter) {
    this.setState({ filter })
  }
  render() {
    const {
      filter,
      imageLoaded,
      filterFly,
    } = this.state;

    if (!imageLoaded) {
      return (<div>Loading Image...</div>);
    }

    return (
      <div className="container-fluid">
        <div className="col-md-8 container-main">
          <FilterImage
            filter={filter}
            filterFly={filterFly}
          />
          <FilterOptions
            onSelect={this.setFilter}
            filterFly={filterFly}
          />
        </div>
        <div className="col-md-4 container-aside">
          <FilterEffects
            filter={filter}
            filterFly={filterFly}
            onChange={this.setFilter}
          />
        </div>
      </div>
    );
  }
}

export default ImageContainer;
