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
      console.log("Mountains here we come!")
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  let trailpic

  if (props.trail.imgMedium == '') {
    trailpic = 'https://image.flaticon.com/icons/svg/281/281517.svg'
  } else {
    trailpic = props.trail.imgMedium
  }

  return(
      <div className="one-third column" onClick={props.renderShow}>
        <div id="tilecontainer" className="post-module animated bounceInUp">
          <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
	            <div className="flipper">
		            <div className="front">
			           <img id="tileImg" src={trailpic}/>
		            </div>
		          <div className="back">
                <div className="centered">
                 <Link to={`/trails/${props.id}`} onClick={newTrail}><p id="tileText">{props.trail.name}</p></Link>
                </div>
              </div>
		         </div>
	         </div>
        </div>
      </div>
  );
};

export default TrailTile;
