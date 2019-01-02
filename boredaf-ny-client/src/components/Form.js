import React, { Component } from 'react';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';
import { Link } from "react-router-dom";

class Form extends Component {

  state = {
    activity: '',
    link: '',
    category: '',
    saveOrNot: '',
    free: '',
    date: '',
    participants: '',
    learned: '',
    favorite_part: '',
    least_favorite: '',
    would_do_again: ''
  }

  handleChange = (e, ) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  newActivityFormHTML = () => {
    const options = ["Please Select", "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]
    return   <form onChange={(e)=> {this.handleChange(e)}} className="form">
      <div className="">new activity</div>
      <label htmlFor="activity">Activity </label>
        <p>Please start the activity with a command/ verb</p>
      <input  name="activity" className="input" type="text"/> <br/>

      <label htmlFor="link">Link </label>
        <p>(optional)</p>
      <input  name="link" className="input" type="text"/> <br/>

      <label htmlFor="category">Category </label> <br/>
      <select  name="category" id="">
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

      <Link to="/" >
        <div className="">cancel</div>
      </Link>

    </form>
  }

  returnActivityName = (activityId) => {
// (!!this.props.user === true) && console.log(`${this.props.user.activities.filter(activity => activity.id === activityId)[0]}`)


    return this.props.user && this.props.user.activities.filter(activity => activity.id === activityId)[0].activity
  }

  journalEntryFormHTML = () => {
    return <form onChange={(e)=> {this.handleChange(e)}} className="form">

      <label htmlFor="date">When did you... <br/> <span >{this.returnActivityName(this.props.activityId)}</span>?</label>
      <input  name="date" className="input" type="date"/>

      <label htmlFor="participants">Who were you with?</label>
      <input name="participants" className="input" type="text"/>

      <label htmlFor="learned">What did you learn?</label>
      <textarea name="learned" className="input" id="" cols="30" rows="10"/>

      <label htmlFor="favorite_part">Favorite part?</label>
      <input name="favorite_part" className="input" type="text"/>

      <label htmlFor="least_favorite">Least favorite?</label>
      <input name="least_favorite" className="input" type="text"/>

      <div onChange={(e)=> {this.handleChange(e)}} className="">
        <p>Would you do it again?</p>
        <div>No <input className="radio" type="radio" value={false} defaultChecked name="would_do_again"/></div>
        <div>Yes <input className="radio" type="radio" value={true} name="would_do_again"/></div>
      </div>

      <input  type="submit" value="Save and Edit Later"/>
      <input  type="submit" value="New Journal Entry"/>

      <Link to="/saved-activities" >
        <div className="">cancel</div>
      </Link>

    </form>
  }

  // when a user clicks on the button to write a journal, it should
  // set the state in app to the activity_id of the association that the user clicked
  // bring them to the route for newjournalEntry
  // that form will get the prop of user and a prop of the activity_id so that the form can search through the user, find that matching activity and display it for the form!

  renderForm = () => {
    return
  }

  render(){
  console.log("in form, the user is",this.props.user)
  console.log("in form, the activityid is",this.props.activityId)

    return(
        <React.Fragment>
          {this.props.context === "NewActivityContainer" ? this.newActivityFormHTML() : this.journalEntryFormHTML()}
      </React.Fragment>
    )
  }
}

export default Form;
