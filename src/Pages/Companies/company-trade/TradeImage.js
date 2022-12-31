import React, { Component } from 'react'

// import "../bootstrap3/css/bootstrap.min.scoped.css"
import '../bootstrap4/css/bootstrap.scoped.css';
import "../style.scoped.css"


export default class TradeImage extends Component {
  constructor(){
      super();
      this.state = {loaded: false};
  }
    render() {
        return (
          <>
            <img
            style={this.state.loaded ? {} : {display: 'none'}}
            src={this.props.imgSrc}
            onLoad={() => this.setState({loaded: true})}
            alt=""
          />
          </>
           
        )
    }
}
