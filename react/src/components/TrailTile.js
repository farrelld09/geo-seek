import React from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const TrailTile = props => {
  let geojson = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [props.long, props.lat]
      },
      properties: {
        title: props.trail.name,
        description: props.summary
      }
    }

  let createPoint = () => {
  var el = document.createElement('div');
  el.className = 'marker';
  new mapboxgl.Marker(el)
  .setLngLat(geojson.geometry.coordinates)
  .addTo(map);
  }

  let topFunction = () => {
    document.documentElement.scrollTop = 0;
  }

  let flyer = () => {
  props.flyer(props.long, props.lat);
  topFunction();
  createPoint();
  }

  let newTrail = () => {
    fetch('/api/v1/trails', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(props.trail),
      headers: { 'Content-Type': 'application/json' }
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
      console.log("Mountains here we come!")
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return(
      <div className="small-12 medium-4 columns">
        <Link to={`/trails/${props.id}`} onClick={newTrail}><h6 id="tileText">{props.trail.name}</h6></Link>
        <img id="tileImg" src={props.trail.imgMedium}></img>
        <button id='fly' onClick={flyer}>Map it!</button>
      </div>
  );
};

export default TrailTile;
