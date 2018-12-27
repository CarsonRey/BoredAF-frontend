import React, { Component } from 'react';

class Choice extends Component {


  render(){
    return(
      <div className="choice">
        <div onClick={(e) => this.props.makeChoice(e.target.className.split(" ")[0])} className="bye choice-btn">
          <h4>BYE</h4>
        </div>
        <div className="settings">
          <div className="plus"></div>
        </div>
        <div onClick={(e) => this.props.makeChoice(e.target.className.split(" ")[0])} className="try choice-btn">
          <h4>TRY</h4>
        </div>
      </div>
    )
  }


}

export default Choice;
