import React, { Component } from 'react';
import TrailTile from "../components/TrailTile";
import Scrollchor from 'react-scrollchor';
import WeatherTile from '../components/WeatherTile';
import HikeTile from '../components/HikeTile';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

class TrailShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailinfo: [],
      weatherinfo: [],
      userId: 0,
      userTrips: [],
      tripMenuClicked: false
    }
    this.createPoint = this.createPoint.bind(this)
    this.flyer = this.flyer.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.getTrailData = this.getTrailData.bind(this)
    this.getTrips = this.getTrips.bind(this)
    this.addHike = this.addHike.bind(this)
    this.showTrips = this.showTrips.bind(this)
  }

  componentDidMount () {
    this.getTrailData();
    this.getTrips();
  }

  getTrailData() {
    fetch(`/api/v1/trails/${this.props.params.id}`, {
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
        trailinfo: body.trail
      });
      this.createPoint();
      this.flyer();
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addHike(newHike) {
    fetch('/api/v1/hikes', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(newHike),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert("Hike added!")
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getTrips() {
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
        userTrips: body
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getWeather(event) {
    event.preventDefault()
    let latitude = this.state.trailinfo.latitude
    let longitude = this.state.trailinfo.longitude
    fetch(`http://api.wunderground.com/api/25ce28b936883239/conditions/q/${latitude},${longitude}.json`)
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
        weatherinfo: [body.current_observation]
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  createPoint() {
  var geojson = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [this.state.trailinfo.longitude,
            this.state.trailinfo.latitude]
        },
        properties: {
          title: this.state.trailinfo.name,
          description: this.state.trailinfo.summary
        }
      }
  var el = document.createElement('div');
  el.className = 'marker';
  new mapboxgl.Marker(el)
  .setLngLat(geojson.geometry.coordinates)
  .addTo(map);
  }

  flyer() {
    var start = [0,0];
    var end = [this.state.trailinfo.longitude,
      this.state.trailinfo.latitude];
    var isAtStart = true;
    var target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    map.flyTo({
       center: target,
       zoom: 12,
       bearing: 0,
       speed: 3.5,
       curve: 1,
       easing: function (t) {
           return t;
         }
       })
    }

    showTrips() {
      if (this.state.tripMenuClick == false) {
        this.setState({tripMenuClick: true});
      } else {
        this.setState({tripMenuClick: false});
      }
    }

  render() {

    let tripMenu

    if (this.state.tripMenuClick) {
      tripMenu = "visible";
    } else {
      tripMenu = "invisible"
    }

    let trailpic
    if (this.state.trailinfo.imgMedium == '') {
      trailpic = 'https://image.flaticon.com/icons/svg/281/281517.svg'
    } else {
      trailpic = this.state.trailinfo.imgMedium
    }

    let weather = this.state.weatherinfo.map(forecast =>{
      return(
        <WeatherTile
          feelslike={forecast.feelslike_string}
          temp={forecast.dewpoint_string}
          icon={forecast.icon_url}
        />
      )
    })

    let trips = this.state.userTrips.map(trip => {
      return(
        <HikeTile
          key={trip.id}
          tripId={trip.id}
          name={trip.name}
          trailId={this.state.trailinfo.id}
          addHike={this.addHike}
        />
      )
    })

    return(
      <div>
        <div className="container">
          <div className="row">
            <h1 id="trailshowtitle">{this.state.trailinfo.name}</h1>
            <img id="showImage" src={trailpic}></img>
            <button id="submit1" onClick={this.showTrips}>ADD TO TRIP</button>
            <button id="submit1" onClick={this.getWeather}>GET WEATHER CONDITIONS</button>
            <button id="submit1" onClick={this.flyer}>RE-PIN TRAILHEAD</button>
              <div id={tripMenu}>
                {trips}
              </div>
              <p className="info">CITY: {this.state.trailinfo.location}<br/>
              TRAIL LENGTH: {this.state.trailinfo.length} miles<br/>
              RATING: {this.state.trailinfo.stars}/5<br/>
              </p>
              <div className="weather">
                {weather}
              </div>
              <h3 id="trailshowtitle">My Trips</h3>
              {/* <div id="tripMenu">
                {trips}
              </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default TrailShowContainer;
