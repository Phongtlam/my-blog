import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonIcon from './ButtonIcon';

import '../styles/Modal.scss';

const Modal = ({
  className,
  modalData: {
    type,
    confirmText,
    rejectText,
    message,
    resolver,
    rejecter,
    isOpen
  }
}) => (
  <div
    className={classnames('App-Modal-wrapper', {
      hidden: !isOpen
    })}
  >
    <div className={classnames('App-Modal-content', className)}>
      <div className={classnames('header', type)}>
        <h2 className="header-message">{message}</h2>
      </div>
      <div className="button-group">
        <ButtonIcon
          buttonType="danger"
          className="button"
          iconName="fas fa-ban"
          callback={rejecter}
        >
          {rejectText}
        </ButtonIcon>
        <ButtonIcon
          buttonType="primary"
          className="button"
          iconName="far fa-check-circle"
          callback={resolver}
        >
          {confirmText}
        </ButtonIcon>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  className: PropTypes.string,
  modalData: PropTypes.shape({
    message: PropTypes.string,
    confirmText: PropTypes.string,
    rejectText: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'danger']),
    isOpen: PropTypes.bool
  })
};

Modal.defaultProps = {
  className: null,
  modalData: {
    isOpen: false,
    message: '',
    confirmText: 'Confirm',
    rejectText: 'Cancel',
    type: 'primary'
  }
};

export default Modal;
