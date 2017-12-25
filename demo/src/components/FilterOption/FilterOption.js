import React, { Component } from 'react';
import './FilterOption.css'

class FilterOption extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      imageLoaded: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { onClick, filter } = this.props;

    onClick(filter);
  }
  render() {
    const { filterFly, filter } = this.props;

    const res = filterFly.filterImage(filter);
    const url = filterFly.toDataURL(res);

    return (
      <div className="filter-option" onClick={this.handleClick}>
        <img src={url} alt="" />
      </div>
    );
  }
}

export default FilterOption;
