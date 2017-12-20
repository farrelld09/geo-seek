import React from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const TrailTile = props => {

  // let createPoint = () => {
  //   L.marker([props.long, props.lat]).addTo(map)
  // }

  let topFunction = () => {
      document.documentElement.scrollTop = 0;
  }

  let flyer = () => {
  props.flyer(props.long, props.lat);
  topFunction();
  }

  return(
      <div className="small-12 medium-4 columns">
        <h6 id="tileText">{props.trail.name}</h6>
        <img id="tileImg" src={props.trail.imgMedium}></img>
        <button id='fly' onClick={flyer}>Map it!</button>
      </div>
  );
};

export default TrailTile;
