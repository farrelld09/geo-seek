import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import TrailTile from '../components/TrailTile';
import { CountryDropdown } from 'react-country-region-selector';
import * as countries from '../Constants';

class IndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      trailinfo: [],
      city: 'Boulder, CO',
      country: 'United States',
      maxResults: 18,
      maxDistance: 20,
      countryCode: '',
      currentPage: 1,
      trailsPerPage: 9
    };
    this.handleClick = this.handleClick.bind(this);
    this.getTrails = this.getTrails.bind(this)
    this.flyer = this.flyer.bind(this)
    this.getCoordinates = this.getCoordinates.bind(this)
    this.handleChangeCity = this.handleChangeCity.bind(this)
    this.handleChangeCountry = this.handleChangeCountry.bind(this)
    this.handleChangeDistance = this.handleChangeDistance.bind(this)
    this.handleChangeResults = this.handleChangeResults.bind(this)
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    this.setState({
      trailinfo: []
    })
  }

  getCoordinates(event) {
    event.preventDefault()
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.city}.json?country=${this.state.countryCode}&access_token=pk.eyJ1IjoiZmFycmVsbGQwOSIsImEiOiJjamI0ZWVtdGc4Mm04MndyenRldW9wYzllIn0.djhxR3NXo9cTIOlCmHNLvQ`)
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
        longitude: body.features[0].geometry.coordinates[0],
        latitude: body.features[0].geometry.coordinates[1]
      })
      this.getTrails();
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getTrails() {
  fetch(`https://www.hikingproject.com/data/get-trails?lat=${this.state.latitude}&lon=${this.state.longitude}&maxDistance=${this.state.maxDistance}&maxResults=${this.state.maxResults}&key=200194560-fb9571a59c9153ab40e20ca3cd633ee7`)
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

  handleChangeCity(event) {
  this.setState({ city: event.target.value })
  }

  handleChangeDistance(event) {
  this.setState({ maxDistance: event.target.value })
  }

  handleChangeResults(event) {
  this.setState({ maxResults: event.target.value })
  }

  handleChangeCountry(val) {
    let countryCodes = countries.countries
    let index = Object.values(countryCodes).indexOf(val)
    let countryCode = Object.keys(countryCodes)[index]
    this.setState({countryCode: countryCode, country: val})
  }

  flyer(long, lat) {
    var start = [this.state.longitude, this.state.latitude];
    var end = [long, lat];
    var isAtStart = true;
    var target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    map.flyTo({
       center: target,
       zoom: 18,
       bearing: 0,
       speed: 3.5,
       curve: 1,
       easing: function (t) {
           return t;
         }
       })
    }

  render() {
    let indexOfLastTrail = this.state.currentPage * this.state.trailsPerPage
    let indexOfFirstTrail = indexOfLastTrail - this.state.trailsPerPage
    let currentTrails = this.state.trailinfo.slice(indexOfFirstTrail, indexOfLastTrail)
    const { country } = this.state;

    let returnedTrails = currentTrails.map(trail => {
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

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(this.state.trailinfo.length / this.state.trailsPerPage); i++) {
    if (this.state.currentPage === i) {
      pageNumbers.push(`[${i}]`);
    } else {
      pageNumbers.push(i);
    }
  }

  let renderPageNumbers = pageNumbers.map(number => {
    return(
      <button
        key={number}
        id={number}
        onClick={this.handleClick}
      >
        {number}
      </button>
    );
  });

    return (
      <div>
        <div className="container">
          <div className="row">
            {returnedTrails}
          </div>
          <div>
            {renderPageNumbers}
          </div>
        </div>
          <div className="container">
            <div className="row">
          <h1 id="findtrails">Find Trails</h1>
            <form onSubmit={this.getCoordinates}>
              <label htmlFor="city">CITY</label>
              <input type="text" name="text" value={this.state.city} onChange={this.handleChangeCity}/>
              <label>COUNTRY</label>
              <CountryDropdown value={country}
              onChange={(val) => this.handleChangeCountry(val)}/>
              <label htmlFor="maxDistance">MAX DISTANCE IN MILES</label>
              <input type="number" name="maxDistance" value={this.state.maxDistance} onChange={this.handleChangeDistance}/>
              <label htmlFor="maxResults">MAX NUMBER OF TRAILS</label>
              <input type="number" name="maxResults" value={this.state.maxResults} onChange={this.handleChangeResults}/>
              <input className="button" id="submit1" type="submit" value="Get Trails!"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexContainer;
