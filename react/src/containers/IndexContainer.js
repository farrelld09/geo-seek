import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import TrailTile from '../components/TrailTile';

class IndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      trailinfo: []
    }
    this.getTrails = this.getTrails.bind(this)
    this.handleChangeLatitude = this.handleChangeLatitude.bind(this)
    this.handleChangeLongitude = this.handleChangeLongitude.bind(this)
    this.flyer=this.flyer.bind(this)
  }

  componentDidMount() {
    this.setState({
      trailinfo: []
    })
  }

  getTrails(event) {
    event.preventDefault()
  fetch(`https://www.hikingproject.com/data/get-trails?lat=${this.state.latitude}&lon=${this.state.longitude}&maxDistance=20&maxResults=10&key=200194560-fb9571a59c9153ab40e20ca3cd633ee7`)
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
      trailinfo: body.trails
    })
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChangeLatitude(event) {
  this.setState({ latitude: event.target.value })
  }

  handleChangeLongitude(event) {
  this.setState({ longitude: event.target.value })
  }

  flyer(long, lat) {
    var start = [-75.16, 39.95];
    var end = [long, lat];
    var isAtStart = true;
    var target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    map.flyTo({
       center: target,
       zoom: 9,
       bearing: 0,
       speed: 1,
       curve: 1,
       easing: function (t) {
           return t;
         }
       })
    }

  render () {
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    let returnedTrails = this.state.trailinfo.map(trail => {
      return (
        <TrailTile
          key={trail.id}
          id={trail.id}
          trail={trail}
          flyer={this.flyer}
          lat={trail.latitude}
          long={trail.longitude}
        />
      );
    });

    return (
      <div>
        <h1>Find Trails</h1>
        <form onSubmit={this.getTrails}>
          <label htmlFor="latitude">Latitude:</label>
          <input type="number" name="number" value={this.state.latitude} onChange={this.handleChangeLatitude}/>
          <label htmlFor="longitude">Longitude:</label>
          <input type="number" name="longitude" value={this.state.longitude} onChange={this.handleChangeLongitude}/>
          <input type="submit" value="Get Trails!"/>
        </form>
        <div className="rows">
         {returnedTrails}
        </div>
      </div>
    )
  }
}

export default IndexContainer;
