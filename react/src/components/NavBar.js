import React from 'react';
import { Link, browserHistory } from 'react-router'
import BackButton from './BackButton'

const NavBar = props => {
  return(
  <div className="container">
    <div className="row">
      <div className="column">
        <button id="submit1" onClick={browserHistory.goBack}> Back </button><Link to='/'><button id="submit1"> HOME </button></Link><Link to='/trips'><button id="submit1"> Trips </button></Link>
        { props.children }
      </div>
    </div>
  </div>
  )
}

export default NavBar;
