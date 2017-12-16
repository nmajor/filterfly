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
      <div className="FilterImageContainer">
        <FilterImage
          filter={filter}
          filterFly={filterFly}
        />
        <FilterOptions
          onSelect={this.setFilter}
          filterFly={filterFly}
        />
      </div>
    );
  }
}

export default FilterImageContainer;
