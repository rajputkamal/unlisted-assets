import React, { Component } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

function ValuationConvertion(val) {
  var final_amt = val/1000000;
  if(final_amt >= 1000 ){
    final_amt = final_amt/1000;
    return final_amt + "B";
  }
  return final_amt + "M";
}
export default class PriceRangeSlider extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: { min: this.props.minVal, max: this.props.maxVal},
      finalRange:null,
    };
    this.completeChange = this.completeChange.bind(this);
  }
 
  
  completeChange= (val) =>{
    this.props.finalChange(val);
	};
  
    render() {
        return (
            <> 
            <div className="range-wrapper">
            <InputRange
        maxValue={this.props.maxVal}
        minValue={this.props.minVal}
        step={1000000}
        value={this.state.value ? this.state.value : 0}
        onChange={value => this.setState({ value })} 
        onChangeComplete={value => this.completeChange({ value })} 
        />
      
      <div className="value-range">
      <p>{ ValuationConvertion(this.state.value.min) }</p>
      <p>{ ValuationConvertion(this.state.value.max) }</p>
      </div>
            </div>     


            </>
        )
    }
}
