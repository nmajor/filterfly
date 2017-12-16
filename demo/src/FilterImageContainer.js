import React, { Component } from 'react';
import FilterFly from '../../src/FilterFly';
import FilterImage from './FilterImage';
import FilterOptionThumbs from './FilterOptionThumbs';

class FilterImageContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.filterFly = new FilterFly('http://nmajor.com/assets/images/me.jpg');

    this.state = {
      imageUrl: 'http://nmajor.com/assets/images/me.jpg',
      filter: 'original',
    };
  }
  render() {
    const {
      imageUrl,
      filter,
    } = this.state;

    return (
      <div className="FilterImageContainer">
        <FilterImage
          imageUrl={imageUrl}
          filter={filter}
          filterFly={this.filterFly}
        />
        <FilterOptionThumbs
          imageUrl={imageUrl}
          filterFly={this.filterFly}
        />
      </div>
    );
  }
}

export default FilterImageContainer;
