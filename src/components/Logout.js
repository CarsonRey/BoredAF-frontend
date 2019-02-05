import React from 'react';
// import { Link , Redirect} from "react-router-dom";

const Logout = (props) => {
  return(
    <div className="logoutContainer">
      <div className="logout" onClick={() => props.logout()}>Logout</div>
    </div>

  )
}

export default Logout;
