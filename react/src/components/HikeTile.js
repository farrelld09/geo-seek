import React, { Component } from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

class HikeTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trail: []
    }
    this.lookUpTrail = this.lookUpTrail.bind(this)
    this.deleteHike = this.deleteHike.bind(this)
  }

  componentDidMount(){
    this.lookUpTrail();
  }

  lookUpTrail() {
    fetch(`/api/v1/trails/${this.props.trailId}`, {
    credentials: 'same-origin'
    })
    .then(response => {
    if (response.ok) {
      return response;
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
      error = new Error(errorMessage);
      throw(error);
    }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        trail: body.trail
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteHike() {
    fetch(`/api/v1/hikes/${this.props.id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert("Trail added to database!")
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      console.log("Hike Deleted!")
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render () {

  return(
    <div className="one-third column">
      <div id="tilecontainer" className="flip-container post-module animated bounceInUp">
          <div className="flipper">
            <div className="front">
             <img id="tileImg" src={this.state.trail.imgSqSmall}/>
            </div>
          <div className="back">
            <div className="centered">
             <Link to={`/trails/${this.state.trail.id}`}><p id="tileText">{this.state.trail.name}</p></Link>
            </div>
          </div>
         </div>
       </div>
       <button id="submit1" onClick={this.deleteHike}>Delete Hike</button>
     </div>
  );
}
};

export default HikeTile;
