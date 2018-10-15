import React from 'react';
import Particles from 'react-particles-js';
import classnames from 'classnames';

import '../styles/Home.scss';
import MarkDownForm from '../components/MarkDownForm';
import ButtonIcon from '../components/ButtonIcon';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMarkDownForm: false
    };
    this._onToggleMarkDownForm = this._onToggleMarkDownForm.bind(this);
  }

  _onToggleMarkDownForm(isOpen) {
    this.setState({ openMarkDownForm: isOpen });
  }

  render() {
    return (
      <div className="App-Home">
        <div className="App-Home-particles">
          <Particles
            params={{
              particles: {
                number: {
                  value: 160,
                  density: {
                    enable: false
                  }
                },
                color: {
                  value: '#000000'
                },
                size: {
                  value: 10,
                  random: true
                },
                move: {
                  direction: 'bottom',
                  out_mode: 'out'
                },
                line_linked: {
                  enable: false
                }
              }
            }}
          />
        </div>
        <ButtonIcon
          className={classnames('create-new-blog-btn', {
            hidden: this.state.openMarkDownForm
          })}
          type="primary"
          callback={() => this._onToggleMarkDownForm(true)}
          iconName="fas fa-plus"
        >
          Create
        </ButtonIcon>
        <div
          className={classnames('App-MarkDownForm-container', {
            hidden: !this.state.openMarkDownForm
          })}
        >
          <MarkDownForm onToggleMarkDownForm={this._onToggleMarkDownForm} />
        </div>
      </div>
    );
  }
}

export default Home;
