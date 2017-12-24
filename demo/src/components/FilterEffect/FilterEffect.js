import React, { Component } from 'react';
import './FilterEffect.css'
import _ from 'lodash';
import Slider, { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class FilterEffect extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value || props.effect.settings.map((set) => { return set.default }),
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.submitEffectValue = this.submitEffectValue.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const value = nextProps.value || nextProps.effect.settings.map((set) => { return set.default });
    this.setState({ value });
  }
  submitEffectValue() {
    this.props.onChange(this.props.name, this.state.value);
  }
  handleValueChange(index, value) {
    const newValue = [ ...this.state.value ];
    newValue[index] = value;

    this.setState({ value: newValue });
  }
  renderRangeSetting(setting, value, index) {
    return (<div key={index}>
      <div className="setting-data">{setting.name}</div>
      <Slider
        min={setting.range[0]}
        max={setting.range[1]}
        value={value}
        handle={handle}
        onChange={(val) => { this.handleValueChange(index, val); }}
        onAfterChange={this.submitEffectValue}
      />
    </div>);
  }
  renderSettings() {
    const { effect } = this.props;

    const values = effect.settings.map((setting, index) => {
      const val = this.state.value[index];
      if (setting.range) return this.renderRangeSetting(setting, val, index);
    });

    return (<div>{values}</div>);
  }
  render() {
    const { name } = this.props;

    return (
      <div className="filter-effect">
        <div className="effect-name">{_.startCase(name)}</div>
        {this.renderSettings()}
      </div>
    );
  }
}

export default FilterEffect;
