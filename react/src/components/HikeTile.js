import React from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const HikeTile = props => {

  let newHike = {
    trip_id: props.tripId,
    trail_id: props.trailId,
    rank: 99
  }
  // let addHike = (newHike) => {props.addHike(newHike)}

  return(

    <div>
      <button id="submit1" onClick={props.addHike()}>{props.name}</button>
    </div>
  );
};

export default HikeTile;
