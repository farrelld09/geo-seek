import React, { Component } from 'react';
import TrailTile from "../components/TrailTile";
import Scrollchor from 'react-scrollchor';
import WeatherTile from '../components/WeatherTile';
import AddHike from '../components/AddHike';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import DropdownMenu from 'react-dd-menu';

class TrailShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailinfo: [],
      weatherinfo: [],
      userId: 0,
      userTrips: [],
      isMenuOpen: false
    }
    this.createPoint = this.createPoint.bind(this)
    this.flyer = this.flyer.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.getTrailData = this.getTrailData.bind(this)
    this.getTrips = this.getTrips.bind(this)
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.topFunction = this.topFunction.bind(this)
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

  topFunction() {
    document.documentElement.scrollTop = 0;
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
      this.topFunction();
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

  render() {

    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      align: 'left'
    };

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
          wind_string={forecast.wind_string}
          weather={forecast.weather}
          icon_url={forecast.icon_url}
        />
      )
    })

    let trips = this.state.userTrips.map(trip => {
      return(
        <AddHike
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
            {weather}
            <button id="submit1" onClick={this.toggle}>ADD TO TRIP</button>
            <button id="submit1" onClick={this.getWeather}>TRAIL FORECAST</button>
            <button id="submit1" onClick={this.flyer}>RE-PIN TRAILHEAD</button>
                <DropdownMenu {...menuOptions}>
                   {trips}
               </DropdownMenu>
              <p className="info">CITY: {this.state.trailinfo.location}<br/>
              SUMMARY: {this.state.trailinfo.summary}<br/>
              TRAIL LENGTH: {this.state.trailinfo.length} miles<br/>
              RATING: {this.state.trailinfo.stars}/5<br/>
              CONDITIONS: {this.state.trailinfo.conditionDetails}<br/>
              </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TrailShowContainer;
