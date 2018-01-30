import React, { Component } from 'react';
import {browserHistory, Link} from 'react-router';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import HikeTile from './HikeTile';
import DropdownMenu from 'react-dd-menu';

class TripTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hikes: [],
      isMenuOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

  componentDidMount() {
    fetch(`/api/v1/trips/${this.props.id}/hikes`, {
    credentials: 'same-origin'
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
      this.setState({
        hikes: body.hikes
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render () {

    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <button id="submit1" onClick={this.toggle}>{this.props.name}</button>,
      align: 'left'
    };

    let returnedHikes = this.state.hikes.map(hike => {
      return(
        <HikeTile
          key={hike.id}
          id={hike.id}
          trailId={hike.trail_id}
          tripId={this.props.id}
        />
      )
    })

  return(
    <div>
      <DropdownMenu {...menuOptions}>
        <div className="container">
          <div className="row">
            {returnedHikes}
          </div>
        </div>
     </DropdownMenu>
    </div>
  );
}
};

export default TripTile;
