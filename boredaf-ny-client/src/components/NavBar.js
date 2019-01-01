import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component{
  render(){
    // console.log("the current container is ", this)
  return (
    <div className="navContainer">

      <Link className="link" to="/nearby">
        <div className="navitem">nearby</div>
      </Link>

      <div className="navbar">

      <div className="appNameContainer">
        <div className="appName">bored af</div>
        <div className="shadow"></div>
      </div>

      </div>

      <Link className="link" to="/saved-activities">
        <div className="navitem">saved</div>
        <div className="numberSaved">{this.props.user && this.props.user.user_activities.filter(association => association.tried === false || association.tried === null).length}</div>
      </Link>
    </div>
  );
}
};



export default NavBar;
