import React, { Component } from 'react';

class Filter extends Component {

  state = {
    dropdown: 'All'
  }

  changeDropdown = (e) => {
    this.setState({
      dropdown: e.target.value
    })
    // want a method that will pass back the value of the state in filter to change the state in activity container
    console.log(e.target.value)
  }


  render(){
    const options = ["All", "Free", "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]

    return(
      <div className="filter">

        <div className="tab">

          <div className="dropdown">
            <button className="dropbtn" onClick={(e)=> e.target.nextElementSibling.classList.toggle('show')}>{this.state.dropdown}
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content" id="myDropdown">
              {options.map((option) => <button className="tablinks" value={option} onClick={this.changeDropdown} >{option}</button>)}
            </div>
          </div>
          <button className="tablinks" onClick={(event) => console.log(event.target.name)} name="nearby">Nearby</button>
        </div>

      </div>
    )
  }


}

export default Filter;
