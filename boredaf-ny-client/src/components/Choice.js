import React, { Component } from 'react';

class Choice extends Component {

  render(){
    return(
      <div className="choice">
        <div onClick={(e) => this.props.makeChoice(e.target.className.split(" ")[0])} className="bye choice-btn">
          <h4>BYE</h4>
        </div>
        <div className="settings popup">
          <div className="popuptext" id="myPopup">Add A New <br/> Activity!</div>
          <div onClick={(e)=> console.log(e.target)}  className="plus" onMouseEnter={(e)=> e.target.previousElementSibling.classList.toggle("showPop")} onMouseLeave={(e)=> e.target.previousElementSibling.classList.toggle("showPop")}>
          </div>
        </div>
        <div onClick={(e) => this.props.makeChoice(e.target.className.split(" ")[0])} className="try choice-btn">
          <h4>TRY</h4>
        </div>
      </div>
    )
  }


}

export default Choice;
