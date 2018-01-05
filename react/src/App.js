import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import IndexContainer from "./containers/IndexContainer"
import TrailTile from "./components/TrailTile";
import TrailShowContainer from "./containers/TrailShowContainer";
import TripsContainer from "./containers/TripsContainer";

const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={NavBar}>
          <IndexRoute  component={IndexContainer}/>
          <Route path='/trips' component={TripsContainer}/>
          <Route path='/trails' component={IndexContainer}/>
          <Route path='/trails/:id' component={TrailShowContainer}/>
        </Route>
      </Router>
    </div>
  );
};

export default App;
