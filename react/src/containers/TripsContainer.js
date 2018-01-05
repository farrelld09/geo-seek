import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import TripTile from '../components/TripTile';

class TripsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/trips`, {
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
        trips: body
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let trips = this.state.trips.map(trip => {
      return(
        <TripTile
          key={trip.id}
          id={trip.id}
          name={trip.name}
        />
      )
    }
  )

    return(
      <div>
        <h1 id="findtrails">My Trips</h1>
          <div className="container">
            <div className="row">
              {trips}
            </div>
          </div>
      </div>
    );
  }
}

export default TripsContainer;
