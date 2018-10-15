import React from 'react';
import Particles from 'react-particles-js';
import classnames from 'classnames';

import '../styles/Home.scss';
import MarkDownForm from '../components/MarkDownForm';
import ButtonIcon from '../components/ButtonIcon';
import HtmlParser from '../components/HtmlParser';
import { fetchAll } from '../utils/fetch';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMarkDownForm: false,
      portfolioHtml: []
    };
    this._onToggleMarkDownForm = this._onToggleMarkDownForm.bind(this);
    this._setPortfolioHtml = this._setPortfolioHtml.bind(this);
  }

  componentDidMount() {
    this._checkInitialPosts();
  }

  _checkInitialPosts() {
    if (this.state.portfolioHtml.length === 0) {
      fetchAll('portfolio').then(response => {
        this._setPortfolioHtml(response);
      });
    }
  }

  _onToggleMarkDownForm(isOpen) {
    this.setState({ openMarkDownForm: isOpen });
  }

  _setPortfolioHtml(html) {
    this.setState(prevState => ({
      portfolioHtml: prevState.portfolioHtml.concat(html)
    }));
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
          <MarkDownForm
            type="portfolio"
            onToggleMarkDownForm={this._onToggleMarkDownForm}
            setHtmlBody={this._setPortfolioHtml}
          />
        </div>
        <HtmlParser htmlStrings={this.state.portfolioHtml} />
      </div>
    );
  }
}

export default Home;
