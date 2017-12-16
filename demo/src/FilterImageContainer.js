import React, { Component } from 'react';
import FilterFly from './FilterFly';
import FilterImage from './FilterImage';
import FilterOptions from './FilterOptions';

class FilterImageContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: 'original',
      imageLoaded: false,
    };

    this.image = this.image || new Image();
    this.image.crossOrigin = 'Anonymous';
    this.image.origin = 'Anonymous';
    this.image.onload = () => {
      this.filterFly = new FilterFly(this.image);
      this.setState({ imageLoaded: true });
    };
    this.image.src = 'http://nmajor.com/assets/images/me.jpg';
  }
  render() {
    const {
      filter,
      imageLoaded,
    } = this.state;

    if (!imageLoaded) {
      return (<div>Loading Image...</div>);
    }

    return (
      <div className="FilterImageContainer">
        <FilterImage
          filter={filter}
          filterFly={this.filterFly}
        />
        <FilterOptions
          filterFly={this.filterFly}
        />
      </div>
    );
  }
}

export default FilterImageContainer;
