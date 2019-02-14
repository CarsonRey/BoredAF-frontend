import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
class Choice extends Component {

  render(){

    // console.log("in choice, the activity is ", this.props.activity)
    return(
      <div className="choice">

        <div onClick={(e) => this.props.makeChoice(e.target.className.split(" ")[0])} className="bye choice-btn choice-item">
          <h4>BYE</h4>
        </div>

        <div className="settings popup">
          {localStorage.bored ? <div className="popuptext" id="myPopup">Add A New <br/> Activity!</div> : <div className="popuptext" id="myPopup">Sign in to <br/> add activities!</div>}
          <div onClick={() => localStorage.bored ? this.props.newActivityForm() : <Redirect to="/login"/>}  className="plus choice-item" onMouseEnter={(e)=> e.target.previousElementSibling.classList.toggle("showPop")} onMouseLeave={(e)=> e.target.previousElementSibling.classList.toggle("showPop")}>
          </div>
        </div>

        <div onClick={(e) => this.props.makeChoice(e.target.className.split(" ")[0], this.props.activity)} className="try choice-btn choice-item">
          <h4>TRY</h4>
        </div>

      </div>
    )
  }


}

export default Choice;
