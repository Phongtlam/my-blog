import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Blog from './Blog';
import About from './About';
import Home from './Home';
import Admin from './Admin';

const Main = props => (
  <main className={props.className}>
    <Switch>
      <Route exact path="/" render={() => <Home {...props} />} />
      <Route path="/blog" render={() => <Blog {...props} />} />
      <Route path="/about" component={About} />
      <Route path="/admin" component={Admin} />
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
