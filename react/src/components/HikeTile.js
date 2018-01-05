import React from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const HikeTile = props => {

  let newHike = {
    trip_id: props.tripId,
    trail_id: props.trailId,
    rank: 99
  }

  let addHike = () => {
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

  return(
    <div>
      <button id="submit1" onClick={addHike}>{props.name}</button>
    </div>
  );
};

export default HikeTile;
