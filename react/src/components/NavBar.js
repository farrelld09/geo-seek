import React from 'react';
import { Link, browserHistory } from 'react-router'

const NavBar = props => {
  return (
  <div className="container">
    <div className="row">
      <div className="column">
        <button id="submit1" onClick={browserHistory.goBack}> Back </button><Link to='/'><button id="submit1"> HOME </button></Link><Link to='/trips'><button id="submit1"> My Trips </button></Link><Link to='/#'><button id="submit1"> About </button></Link>
        { props.children }
      </div>
    </div>
  </div>
  )
}

export default NavBar;
