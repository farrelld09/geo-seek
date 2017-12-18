import React from 'react';
import {browserHistory, Link} from 'react-router';

const TrailTile = props => {
  return(
      <div className="small-12 medium-4 columns">
        <h6 id="tileText">{props.trail.name}</h6>
        <img id="tileImg" src={props.trail.imgMedium}></img>
      </div>
  );
};

export default TrailTile;
