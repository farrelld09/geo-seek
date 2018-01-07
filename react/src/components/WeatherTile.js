import React from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const WeatherTile = props => {

  return(
        <div className="post-module animated fadeInDown weathertile">
          <h3 id="forecast">TRAIL FORECAST</h3>
            <h6 className="info">TEMPERATURE: {props.temp}</h6>
            <h6 className="info">FEELS LIKE: {props.feelslike}</h6>
            <h6 className="info">WIND: {props.wind_string}</h6>
            <h6 className="info">CONDITIONS: {props.weather}</h6>
            <img src={props.icon_url}/>
          </div>
  );
};

export default WeatherTile;
