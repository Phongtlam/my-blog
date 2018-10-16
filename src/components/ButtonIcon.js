import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../styles/ButtonIcon.scss';

const ButtonIcon = ({
  className,
  callback,
  iconName,
  iconSize = 'lg',
  type = 'normal',
  children
}) => (
  <button
    className={classnames('App-ButtonIcon', type, className)}
    type="button"
    onClick={() => callback()}
  >
    <i className={classnames('icon', iconName, `fa-${iconSize}`)} />
    {children ? <span className="text">{children}</span> : null}
  </button>
);

ButtonIcon.propTypes = {
  callback: PropTypes.func.isRequired,
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
  children: PropTypes.string,
  type: PropTypes.oneOf([
    'normal',
    'primary',
    'danger',
    'borderless',
    'borderless-danger'
  ])
};

ButtonIcon.defaultProps = {
  className: '',
  iconSize: 'lg',
  type: 'normal',
  children: null
};

export default ButtonIcon;
