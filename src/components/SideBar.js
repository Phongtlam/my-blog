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
    linkTo: '/blog',
    routeName: 'Blog'
  },
  {
    linkTo: '/about',
    routeName: 'About'
  }
];

const externalRoutes = [
  {
    url: 'mailto:phongtlam@gmail.com',
    icon: 'fas fa-envelope'
  },
  {
    url: 'https://github.com/Phongtlam',
    icon: 'fab fa-github'
  },
  {
    url: 'https://www.linkedin.com/in/phongtlam/',
    icon: 'fab fa-linkedin-in'
  },
  {
    url: 'https://angel.co/phongtlam',
    icon: 'fab fa-angellist'
  },
  {
    url: 'https://soundcloud.com/phong-twitch-lam',
    icon: 'fab fa-soundcloud'
  }
];

const SideBar = props => (
  <div className={`${props.className} App-SideBar`}>
    <NavLink to="/">
      <h1>Phong Lam</h1>
    </NavLink>
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
    <div className="App-SideBar-external-group">
      {externalRoutes.map(route => (
        <a
          key={route.url}
          className="external-link"
          href={route.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={route.icon} />
        </a>
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
