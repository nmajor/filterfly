import React, { Component } from 'react';
import './FilterOptions.css'
import FilterOption from '../FilterOption/FilterOption';

class FilterOptions extends Component {
  renderFilterThumbs() {
    const { filterFly, activeFilter } = this.props;

    return filterFly.availableFilters().map((filter, index) => {
      return (<FilterOption
        key={index}
        onClick={this.props.onSelect}
        filter={filter}
        filterFly={filterFly}
        active={activeFilter === filter}
      />);
    });
  }
  render() {
    return (
      <div className="filter-options">
        {this.renderFilterThumbs()}
      </div>
    );
  }
}

export default FilterOptions;
