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
    const { onClick, filter, active } = this.props;

    return (
      <div className={`filter-option ${active ? 'active' : ''}`} onClick={this.handleClick}>
        <div className="name">{filter}</div>
        <div className="image">
          <img src={this.imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default FilterOption;
