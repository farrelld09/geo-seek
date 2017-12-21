import React, { Component } from 'react';
import TrailTile from "../components/TrailTile";
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

class TrailShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailinfo: []
    }
    this.createPoint = this.createPoint.bind(this)
    this.flyer = this.flyer.bind(this)
  }

  componentDidMount() {
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
    return(
      <div>
        <button id='fly' onClick={browserHistory.goBack}>Back</button>
        <h1>{this.state.trailinfo.name}</h1>
        <img id="tileImg" src={this.state.trailinfo.imgMedium}></img>
        <div className='row'>
          <div className='column medium-6'>
            <div id="showinfo">City: {this.state.trailinfo.location}</div>
            <div id="showinfo">Trail Length: {this.state.trailinfo.length}</div>
            <div id="showinfo">Rating: {this.state.trailinfo.stars}/5</div>
          </div>
          <div className="column medium-6">
            <div className="text-center">
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default TrailShowContainer;
