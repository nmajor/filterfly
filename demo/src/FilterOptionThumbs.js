import React, { Component } from 'react';

class FilterOptionThumbs extends Component {
  constructor(props, context) {
    super(props, context);
  }
  renderFilterThumbs() {
    const { filterFly } = this.props;

    return filterFly.filters().map((name) => {
      return <div></div>
    });
  }
  render() {
    return (
      <div className="FilterImage">
        {this.renderFilterThumbs()}
      </div>
    );
  }
}

export default FilterOptionThumbs;
