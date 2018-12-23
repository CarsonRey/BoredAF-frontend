import React, { Component } from 'react';

class Choice extends Component {


  render(){
    return(
      <div onChange className="choice">
        <div onClick={(e) => console.log(e.target.className.split(" ")[0])} className="bye choice-btn">
          <h4>BYE</h4>
        </div>
        <img src="src/settings.png" alt="Activity Settings"/>
        {/* <p>Activity Settings</p> */}
        <div onClick={(e) => console.log(e.target.className.split(" ")[0])} className="try choice-btn">
          <h4>TRY</h4>
        </div>
      </div>
    )
  }


}

export default Choice;
