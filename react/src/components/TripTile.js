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
      isMenuOpen: false,
      currentPage: 1,
      hikesPerPage: 3
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
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

    let indexOfLastHike = this.state.currentPage * this.state.hikesPerPage
    let indexOfFirstHike = indexOfLastHike - this.state.hikesPerPage
    let currentHikes = this.state.hikes.slice(indexOfFirstHike, indexOfLastHike)

    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <button id="submit1" onClick={this.toggle}>{this.props.name}</button>,
      align: 'left'
    };

    let returnedHikes = currentHikes.map(hike => {
      return(
        <HikeTile
          key={hike.id}
          id={hike.id}
          trailId={hike.trail_id}
        />
      )
    })

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.hikes.length / this.state.hikesPerPage); i++) {
      if (this.state.currentPage === i) {
        pageNumbers.push(`[${i}]`);
      } else {
        pageNumbers.push(i);
      }
    }

    let renderPageNumbers = pageNumbers.map(number => {
      return(
        <button
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
    });

  return(
    <div>
      <DropdownMenu {...menuOptions}>
        <div className="container">
          <div className="row">
            {returnedHikes}
          </div>
        <div>
          {renderPageNumbers}
        </div>
      </div>
     </DropdownMenu>
    </div>
  );
}
};

export default TripTile;
