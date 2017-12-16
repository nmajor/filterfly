import React, { Component } from 'react';

class FilterImage extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="FilterImage">
        <img src={this.props.imageUrl} role="presentation" />
      </div>
    );
  }
}

export default FilterImage;
