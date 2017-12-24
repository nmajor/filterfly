import React, { Component } from 'react';

class FilterImage extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { filterFly, filter } = this.props;

    console.log('blah hi', filter);

    const res = filterFly.filterImage(filter);
    const url = filterFly.toDataURL(res);

    return (
      <div className="FilterImage">
        <img src={url} role="presentation" />
      </div>
    );
  }
}

export default FilterImage;
