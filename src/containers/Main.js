import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Blog from './Blog';
import About from './About';
import Home from './Home';
import Admin from './Admin';

const Main = props => (
  <main className={props.className}>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/Home" />} />
      <Route
        path="/Home"
        render={routeProps => (
          <Home {...Object.assign({}, props, routeProps)} />
        )}
      />
      <Route
        path="/Blog"
        render={routeProps => (
          <Blog {...Object.assign({}, props, routeProps)} />
        )}
      />
      <Route path="/About" component={About} />
      <Route path="/Admin" component={Admin} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  </main>
);

Main.propTypes = {
  className: PropTypes.string
};

Main.defaultProps = {
  className: 'App-content-container'
};

export default Main;
