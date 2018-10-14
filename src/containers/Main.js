import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Blog from './Blog';
import About from './About';
import Home from './Home';

const Main = props => (
  <main className={props.className}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Blog" component={Blog} />
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
