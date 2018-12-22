import React, { Component } from 'react';

class Choice extends Component {


  render(){
    return(
      <div className="choice">
        <div className="bye choice-btn">
          <h4>BYE</h4>
        </div>
        <div className="try choice-btn">
          <h4>TRY</h4>
        </div>
      </div>
    )
  }


}

export default Choice;
