import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component{


    numberSaved = () => {
      // if number saved is zero toggle noneSaved
      let number = this.props.user.user_activities.filter(association => association.tried === false || association.tried === null).length
      return number
    }

    returnSavedBubble = () => {
      if (this.props.user){
        if (this.numberSaved() === 0){
          return  <div className="noneSaved">{localStorage.length === 0 && this.numberSaved()}</div>
        } else if (this.numberSaved() > 0) {
          return <div className={ this.props.user ? "numberSavedLoggedIn" : "numberSaved"}>{this.numberSaved()}</div>
        }
      }
    }



  render(){

  return (
    <div className="navContainer">

      <Link className="link" to="/journal">
        <div className="navitem">journal</div>
      </Link>

      <div className="navbar">

      <div className="appNameContainer">
        <div className="appName">bored af</div>
        <div className="shadow"></div>
      </div>

      </div>

      <Link className="link" to="/saved-activities">
        <div className="navitem">saved</div>
        {this.returnSavedBubble()}
      </Link>
    </div>
  );
}
};





export default NavBar;
