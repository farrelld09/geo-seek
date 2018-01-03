import React, { Component } from 'react';
import TrailTile from "../components/TrailTile";
import Scrollchor from 'react-scrollchor';
import WeatherTile from '../components/WeatherTile';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

class TrailShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailinfo: [],
      weatherinfo: []
    }
    this.createPoint = this.createPoint.bind(this)
    this.flyer = this.flyer.bind(this)
    this.getWeather = this.getWeather.bind(this)
  }

  componentWillMount() {
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
        trailinfo: body
      });
      this.createPoint();
      this.flyer();
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
    debugger
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

  flyer(long, lat) {
    var start = [0, 0];
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

    return(
      <div>
        <div className="container">
          <div className="row">
            <h1 id="trailshowtitle">{this.state.trailinfo.name}</h1>
            <img id="showImage" src={trailpic}></img>
            <button onClick={this.getWeather}>Get Weather Conditions</button>
              <p className="info">City: {this.state.trailinfo.location}<br/>
              Trail Length: {this.state.trailinfo.length} miles<br/>
              Rating: {this.state.trailinfo.stars}/5<br/>
              For directions to trailhead, enter coordinates into map<br/>
              Latitude/Longitude: {this.state.trailinfo.latitude}/{this.state.trailinfo.longitude}<br/>
              </p>
              <div className="weather">
                {weather}
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrailShowContainer;
