import React from 'react';
import PropTypes from 'prop-types';
import ButtonIcon from '../components/ButtonIcon';
import { logIn } from '../utils/fetch';

import '../styles/Admin.scss';
import history from '../utils/history';

class Admin extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      adminUsername: '',
      adminPassword: '',
      displayMessage: ''
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(e) {
    if (e.target.id === 'admin-username') {
      this.setState({ adminUsername: e.target.value });
    } else {
      this.setState({ adminPassword: e.target.value });
    }
  }

  _onSubmit() {
    const { adminUsername, adminPassword } = this.state;
    const queryS = this.props.location.search;
    logIn({ username: adminUsername, password: adminPassword }, queryS).then(
      response => {
        if (!response.authorized) {
          this.setState({
            displayMessage: response.message
          });
        } else {
          history.push('/Home');
        }
      }
    );
  }

  render() {
    return (
      <form className="App-Admin">
        <label className="App-Admin-label" htmlFor="admin-username">
          Name:
          <input
            id="admin-username"
            type="text"
            value={this.state.adminUsername}
            onChange={this._onChange}
          />
        </label>
        <label className="App-Admin-label" htmlFor="admin-password">
          Password:
          <input
            id="admin-password"
            type="text"
            value={this.state.adminPassword}
            onChange={this._onChange}
          />
        </label>
        <ButtonIcon
          buttonType="primary"
          callback={this._onSubmit}
          iconName="fas fa-sign-in-alt"
        >
          Sign in
        </ButtonIcon>
        {this.state.displayMessage}
      </form>
    );
  }
}

export default Admin;
