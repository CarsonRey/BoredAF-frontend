import React, { Component } from 'react';

class Filter extends Component {


  render(){
    return(
      <div className="filter">
        <div className="slidecontainer">
          <p>Free <input onChange={(event) => console.log(event.target.value)} type="range" min="0" max="100" value="" className="slider" id="myRange"/> Pricey</p>

        </div>
      </div>
    )
  }


}

export default Filter;
