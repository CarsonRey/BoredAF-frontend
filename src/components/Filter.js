import React, { Component } from 'react';

class Filter extends Component {

  state = {
    dropdown: 'All'
  }

  changeDropdown = (e) => {
    this.setState({
      dropdown: e.target.value
    })
  }

  changeFilter = (e) => {
    e.target.parentElement.classList.toggle("show")
    this.props.changeFilter(this.state.dropdown.toLowerCase())
  }

  render(){
    const options = ["All", "Free", "Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]
    console.log("in filter the state is", this.state.dropdown)
    return(
      <div className="filter">

        <div className="tab">

          <div className="dropdown">
            <button className="dropbtn" onClick={(e)=> e.target.nextElementSibling.classList.toggle('show')}>{this.state.dropdown}
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content" id="myDropdown">
              {options.map((option) => <button key={option} className="tablinks" value={option} onMouseEnter={this.changeDropdown} onClick={this.changeFilter} >{option}</button>)}
            </div>
          </div>
          {/* <button className="tablinks" onClick={(event) => console.log(event.target.value)} value="nearby">Nearby</button> */}
        </div>

      </div>
    )
  }


}

export default Filter;
