import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Blog from './Blog';
import About from './About';
import Home from './Home';

const Main = props => (
  <main className={props.className}>
    <Switch>
      <Route exact path="/" render={() => <Home {...props} />} />
      <Route path="/Blog" render={() => <Blog {...props} />} />
      <Route path="/About" component={About} />
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
