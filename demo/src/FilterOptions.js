import React, { Component } from 'react';
import FilterOption from './FilterOption';

class FilterOptions extends Component {
  renderFilterThumbs() {
    const { filterFly } = this.props;

    return filterFly.filters().map((filter, index) => {
      return (<FilterOption
        key={index}
        onClick={this.props.selectFilter}
        filter={filter}
        filterFly={filterFly}
      />);
    });
  }
  render() {
    return (
      <div className="FilterOptions">
        {this.renderFilterThumbs()}
      </div>
    );
  }
}

export default FilterOptions;
