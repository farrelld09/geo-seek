import React from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const TripTile = props => {

  return(
    <div>
      <h3 id="findtrails">{props.name}</h3>
    </div>

  );
};

export default TripTile;
