import React, { Component } from 'react';
import './FilterImage.css';

class FilterImage extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { filterFly, filter } = this.props;

    const res = filterFly.filterImage(filter);
    const url = filterFly.toDataURL(res);

    return (
      <div className="filter-image">
        <img src={url} role="presentation" />
      </div>
    );
  }
}

export default FilterImage;
