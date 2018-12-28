import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <BrowserRouter className="navContainer">


      <div className="navbar">

      <div className="appNameContainer">
        <div className="appName">bored af</div>
        <div className="shadow"></div>
      </div>
      {/* <Link to="/logout">
        <li className="navitem">Logout</li>
      </Link> */}
</div>
    </BrowserRouter>
  );
};



export default NavBar;
