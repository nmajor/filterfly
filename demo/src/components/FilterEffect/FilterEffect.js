import React, { Component } from 'react';
import { SliderPicker } from 'react-color';
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
  submitEffectValue(index, value) {
    const newValue = [ ...this.state.value ];
    newValue[index] = value;

    this.props.onChange(this.props.name, newValue);
    this.setState({ value: newValue });
  }
  handleValueChange(index, value) {
    const newValue = [ ...this.state.value ];
    newValue[index] = value;

    this.setState({ value: newValue });
  }
  renderRangeSetting(setting, value, index) {
    return (<div className="effect-setting" key={index}>
      <div>
        <span className="name">{setting.name}</span>
        <span className="value">{value}</span>
      </div>
      <Slider
        min={setting.range[0]}
        max={setting.range[1]}
        value={value}
        handle={handle}
        onChange={(val) => { this.handleValueChange(index, val); }}
        onAfterChange={(val) => { this.submitEffectValue(index, val); }}
      />
    </div>);
  }
  renderColorSetting(setting, value, index) {
    return (<div className="effect-setting" key={index}>
      <div>
        <span className="name">{setting.name}</span>
        <span className="value">{value}</span>
      </div>
      <SliderPicker
        color={value}
        onChange={(color) => { this.handleValueChange(index, color.hex); }}
        onChangeComplete={(color) => { this.submitEffectValue(index, color.hex); }}
      />
    </div>);
  }
  renderSettings() {
    const { effect } = this.props;

    const values = effect.settings.map((setting, index) => {
      const val = this.state.value[index];
      if (setting.range) {
        return this.renderRangeSetting(setting, val, index);
      } else if (setting.hexColor) {
        return this.renderColorSetting(setting, val, index);
      }

      return null;
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
