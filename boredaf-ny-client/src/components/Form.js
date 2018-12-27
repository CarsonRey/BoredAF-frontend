import React, { Component } from 'react';

class Form extends Component {



  render(){

    const options = ["Please Select", "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]
    
    return(
      <form action="">
        <label htmlFor="">Activity </label>
        <input type="text"/> <br/>
        <label htmlFor="category">Category </label>
        <select name="category" id="">
          {options.map((option) => <option value={option.toLowerCase()}  >{option}</option>)}
        </select> <br/>
        <label htmlFor="participants">Participants </label>
        <input name="participants" type="number"/>
      </form>
    )
  }
}

export default Form;
