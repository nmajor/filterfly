import React, { Component } from 'react';
import FilterFly from './lib/FilterFly';
import FilterImage from './FilterImage';
import FilterOptions from './FilterOptions';
import FilterEffects from './FilterEffects';

class FilterImageContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: 'original',
      imageLoaded: false,
      filterFly: null,
    };

    this.setFilter = this.setFilter.bind(this);
    this.setImage = this.setImage.bind(this);

    this.setImage('http://nmajor.com/assets/images/me.jpg');
  }
  setImage() {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.origin = 'Anonymous';
    image.onload = () => {
      this.setState({
        imageLoaded: true,
        filterFly: new FilterFly(image)
      });
    };
    image.src = 'http://nmajor.com/assets/images/me.jpg';
  }
  setFilter(filter) {
    console.log('blah setting filter', filter);
    this.setState({ filter })
  }
  render() {
    const {
      filter,
      imageLoaded,
      filterFly,
    } = this.state;

    console.log('blah hi', filter);

    if (!imageLoaded) {
      return (<div>Loading Image...</div>);
    }

    return (
      <div className="FilterImageContainer">
        <FilterImage
          filter={filter}
          filterFly={filterFly}
        />
        <FilterOptions
          onSelect={this.setFilter}
          filterFly={filterFly}
        />
        <FilterEffects
          filter={filter}
          filterFly={filterFly}
          onChange={this.setFilter}
        />
      </div>
    );
  }
}

export default FilterImageContainer;
