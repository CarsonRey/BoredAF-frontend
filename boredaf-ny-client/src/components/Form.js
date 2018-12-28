import React, { Component } from 'react';
import { BrowserRouter, Link } from "react-router-dom";

class Form extends Component {

  render(){

    const options = ["Please Select", "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]

    return(
      <BrowserRouter>
        <React.Fragment>
          <div className="formName">new activity</div>
          <form className="form">

          <label htmlFor="">Activity </label>
            <p>Please start the activity with a command/ verb</p>
          <input className="input" type="text"/> <br/>

          <label htmlFor="category">Category </label> <br/>
          <select name="category" id="">
            {options.map((option) => <option value={option.toLowerCase()}  >{option}</option>)}
          </select> <br/>

          <label htmlFor="participants">Participants </label>
              <p>Minmum amount of participants is 1!</p>
          <input className="input" name="participants" type="number"/>

          <div className="">
            <p>Would you like to save this to your activities?</p>
            <div>No <input className="radio" type="radio" value="No" defaultChecked name="option"/></div>
            <div>Yes <input className="radio" type="radio" value="Yes" name="option"/></div>
          </div> <br/>

          <input className="input" type="submit" value="Add Activity"/> <br/>

          <Link to="/" onClick={()=> this.props.backToActivities()}>
            <div className="navitem">cancel</div>
          </Link>

        </form>
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default Form;
