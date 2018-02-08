import React, { Component } from 'react';
import './FilterOption.css'

class FilterOption extends Component {
  constructor(props, context) {
    super(props, context);

    const { filterFly, filter } = props;
    const res = filterFly.filterImage(filter);
    const url = filterFly.toDataURL(res);
    this.imageUrl = url;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, filter } = this.props;

    onClick(filter);
  }
  render() {
    return (
      <div className="filter-option" onClick={this.handleClick}>
        <img src={this.imageUrl} alt="" />
      </div>
    );
  }
}

export default FilterOption;
