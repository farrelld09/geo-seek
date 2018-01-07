import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import TripTile from '../components/TripTile';

class TripsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      newTripName:''
    }
    this.onNameChange = this.onNameChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addTrip = this.addTrip.bind(this)
  }

  onNameChange(event) {
    this.setState({ newTripName: event.target.value });
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

  handleClearForm(event){
    this.setState({
      newTripName: ''
    });
  }

  addTrip (payload) {
    fetch('/api/v1/trips', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert("Trip added!")
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.handleClearForm();
      this.setState({trips: this.state.trips.concat(payload)})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      name: this.state.newTripName,
      user_id: this.state.trips[0].user_id
    };
    this.addTrip(formPayload);
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
              <form className="new-article-form callout" onSubmit={this.handleSubmit}>
                <label>NEW TRIP NAME:
                  <input
                    name='name'
                    type='text'
                    value={this.state.newTripName}
                    onChange={this.onNameChange}
                  />
                </label>
                <button id="submit1" value="Submit">ADD TRIP</button>
              </form>
            </div>
          </div>
      </div>
    );
  }
}

export default TripsContainer;
