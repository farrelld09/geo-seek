import React, { Component } from 'react';
import MapGl, { Layer, Feature } from 'react-mapbox-gl'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
//   mapboxgl.accessToken = 'pk.eyJ1IjoiZmFycmVsbGQwOSIsImEiOiJjamI0ZWVtdGc4Mm04MndyenRldW9wYzllIn0.djhxR3NXo9cTIOlCmHNLvQ';
//   let map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9'
//   });
//   let nav = new mapboxgl.NavigationControl();
//   map.addControl(nav, 'top-left');
//
//   map.addControl(new mapboxgl.GeolocateControl({
//     positionOptions: {
//       enableHighAccuracy: true
//     },
//     trackUserLocation: true
//   })
// );

render () {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZmFycmVsbGQwOSIsImEiOiJjamI0ZWVtdGc4Mm04MndyenRldW9wYzllIn0.djhxR3NXo9cTIOlCmHNLvQ';
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
  });
  let nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');

  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
    return (

      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div id='map'>{map}</div>
          </div>
        </div>
      </div>
    )
  };
}

export default Map;
