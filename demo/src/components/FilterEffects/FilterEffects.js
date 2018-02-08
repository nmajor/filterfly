import React, { Component } from 'react';
import './FilterEffects.css'
import _ from 'lodash';
import FilterEffect from '../FilterEffect/FilterEffect';

class FilterEffects extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleEffectChange = this.handleEffectChange.bind(this);
  }
  handleEffectChange(effect, settings) {
    const { filter, filterFly } = this.props;

    let filterObj = filter;

    if (typeof(filter) === 'string') {
      filterObj = filterFly.filters[filter];
    }

    const newFilter = { ...filterObj };

    newFilter[effect] = settings;

    this.props.onChange(newFilter);
  }
  renderEffects() {
    const { filter, filterFly } = this.props;

    let filterObj = filter;

    if (typeof(filter) === 'string') {
      filterObj = filterFly.filters[filter];
    }

    return _.map(filterFly.effects, (effect, name) => {
      if (effect.settings.length == 0) return null;

      return (<FilterEffect
        key={name}
        name={name}
        effect={effect}
        value={filterObj[name]}
        onChange={this.handleEffectChange}
      />);
    });
  }
  render() {
    return (
      <div style={{ width: "300px" }} className="filter-effects">
        {this.renderEffects()}
      </div>
    );
  }
}

export default FilterEffects;
