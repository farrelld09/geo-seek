import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import IndexContainer from "./containers/IndexContainer"
import TrailTile from "./components/TrailTile";
import TrailShowContainer from "./containers/TrailShowContainer";
import UserShowContainer from "./containers/UserShowContainer"

const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={IndexContainer}/>
          <Route path='/users/:id' component={UserShowContainer}/>
          <Route path='/trails' component={IndexContainer}/>
          <Route path='/trails/:id' component={TrailShowContainer}/>
      </Router>
    </div>
  );
};

export default App;
