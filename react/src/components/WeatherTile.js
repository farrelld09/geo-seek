import React from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const WeatherTile = props => {

  let topFunction = () => {
    document.documentElement.scrollTop = 0;
  }

  return(
      <div className="two-thirds column">
        <div className="post-module animated bounceInDown weathertile">
          <h3 id="forecast">TRAIL FORECAST</h3>
            <h6 className="info">TEMPERATURE: {props.temp}</h6>
            <h6 className="info">FEELS LIKE: {props.feelslike}</h6>
            <img src={props.icon}/>
        </div>
      </div>
  );
};

export default WeatherTile;
