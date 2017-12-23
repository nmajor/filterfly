import React, { Component } from 'react';
import FilterOption from './FilterOption';

class FilterOptions extends Component {
  renderFilterThumbs() {
    const { filterFly } = this.props;

    return filterFly.availableFilters().map((filter, index) => {
      return (<FilterOption
        key={index}
        onClick={this.props.onSelect}
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
