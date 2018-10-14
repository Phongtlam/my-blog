import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/SideBar.scss';

const routes = [
  {
    linkTo: '/',
    routeName: 'Home'
  },
  {
    linkTo: '/Blog',
    routeName: 'Blog'
  },
  {
    linkTo: '/About',
    routeName: 'About'
  }
];

const SideBar = props => (
  <div className={`${props.className} App-SideBar`}>
    <NavLink to="/">Phong Lam</NavLink>
    <p>
      I specialize in making beautiful software and user interfaces. I have a
      passion for all things science and chess AI. When not coding, I love
      reading, writing, listening to music or working out at the gym. Follow my
      journey as a developer or just send me a message to connect.
    </p>
    <div className="App-SideBar-router-group">
      {routes.map(route => (
        <NavLink
          exact={route.linkTo === '/'}
          to={route.linkTo}
          key={route.linkTo}
          className="route"
          activeClassName="active"
        >
          {route.routeName}
        </NavLink>
      ))}
    </div>
  </div>
);

SideBar.propTypes = {
  className: PropTypes.string
};

SideBar.defaultProps = {
  className: ''
};

export default SideBar;
