import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <BrowserRouter className="navContainer">


      <div className="navbar">
      <Link to="/">
        <li className="navitem">Home</li>
      </Link>
      <div className="appNameContainer">
        <div className="appName">bored af</div>
        <div className="shadow"></div>
      </div>
      <Link to="/characters">
      <li className="navitem">Characters</li>
        </Link>
        <Link to="/houses">
        <li className="navitem">Houses</li>
      </Link>
      <Link to="login">
        <li className="navitem">Login/Sign Up</li>
      </Link>
</div>
    </BrowserRouter>
  );
};



export default NavBar;
