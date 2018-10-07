import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import Admin from '../components/Admin';

const Routes = () => (
  <div>
    <Route path="/" component={App} />
    <Route path="/admin" component={Admin} />
  </div>
);

export default Routes;
