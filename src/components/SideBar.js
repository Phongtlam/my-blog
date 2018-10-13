import React from 'react';
import PropTypes from 'prop-types';

const SideBar = props => (
  <div className={`${props.className} App-SideBar`}>Welcome to My Blog</div>
);

SideBar.propTypes = {
  className: PropTypes.string
};

SideBar.defaultProps = {
  className: ''
};

export default SideBar;
