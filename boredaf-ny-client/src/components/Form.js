import React, { Component } from 'react';
import { BrowserRouter, Link } from "react-router-dom";

class Form extends Component {

  state = {
    activity: '',
    link: '',
    category: '',
    saveOrNot: '',
    free: ''
  }

  handleChange = (e, ) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
  console.log(this.state.free)
    const options = ["Please Select", "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]

    return(
      <BrowserRouter>
        <React.Fragment>
          <div className="">new activity</div>
          <form className="form">

          <label htmlFor="activity">Activity </label>
            <p>Please start the activity with a command/ verb</p>
          <input onChange={(e)=> {this.handleChange(e)}} name="activity" className="input" type="text"/> <br/>

          <label htmlFor="link">Link </label>
            <p>(optional)</p>
          <input onChange={(e)=> {this.handleChange(e)}} name="link" className="input" type="text"/> <br/>

          <label htmlFor="category">Category </label> <br/>
          <select onChange={(e)=> {this.handleChange(e)}} name="category" id="">
            {options.map((option) => <option key={option} value={option.toLowerCase()}  >{option}</option>)}
          </select> <br/>

          {/* <label htmlFor="participants">Participants </label>
              <p>Minmum amount of participants is 1!</p>
          <input className="input" name="participants" type="number"/> */}

          <div  onChange={(e)=> {this.handleChange(e)}} className="">
            <p>Would you like to save this to your activities?</p>
            <div>No <input  className="radio" type="radio"  value={false} defaultChecked name="saveOrNot"/></div>
            <div>Yes <input  className="radio" type="radio"  value={true} name="saveOrNot"/></div>
          </div> <br/>

          <div onChange={(e)=> {this.handleChange(e)}} className="">
            <p>Is this activity free?</p>
            <div>No <input className="radio" type="radio" value={false} defaultChecked name="free"/></div>
            <div>Yes <input className="radio" type="radio" value={true} name="free"/></div>
          </div> <br/>

          <input className="input" type="submit" value="Add Activity"/> <br/>

          <Link to="/" onClick={()=> this.props.backToActivities()}>
            <div className="">cancel</div>
          </Link>

        </form>
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default Form;
