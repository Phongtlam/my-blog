import React from 'react';
import Particles from 'react-particles-js';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import '../styles/Home.scss';
import MarkDownForm from '../components/MarkDownForm';
import ButtonIcon from '../components/ButtonIcon';
import HtmlParser from '../components/HtmlParser';
import PortfolioCard from '../components/PortfolioCard';

class Home extends React.Component {
  static propTypes = {
    portfolioData: PropTypes.arrayOf(PropTypes.object),
    setHtml: PropTypes.func
  };

  static defaultProps = {
    portfolioData: [],
    setHtml: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      openMarkDownForm: false,
      portfolioIndex: undefined
    };

    this._onPortfolioCardClick = this._onPortfolioCardClick.bind(this);
    this._onToggleMarkDownForm = this._onToggleMarkDownForm.bind(this);
  }

  _onToggleMarkDownForm(isOpen) {
    this.setState({ openMarkDownForm: isOpen });
  }

  _onPortfolioCardClick(index) {
    this.setState({
      portfolioIndex: index
    });
  }

  render() {
    const { portfolioData, setHtml } = this.props;
    const { openMarkDownForm, portfolioIndex } = this.state;
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
            hidden: openMarkDownForm
          })}
          type="primary"
          callback={() => this._onToggleMarkDownForm(true)}
          iconName="fas fa-plus"
        >
          Create
        </ButtonIcon>
        <ButtonIcon
          className={classnames({
            hidden: portfolioIndex === undefined
          })}
          type="primary"
          callback={() => this._onPortfolioCardClick(undefined)}
          iconName="fas fa-chevron-left"
        />
        <div
          className={classnames('App-MarkDownForm-container', {
            hidden: !openMarkDownForm
          })}
        >
          <MarkDownForm
            type="portfolio"
            onToggleMarkDownForm={this._onToggleMarkDownForm}
            setHtmlBody={setHtml}
          />
        </div>
        <div
          className={classnames({
            hidden: portfolioIndex !== undefined
          })}
        >
          {portfolioData.map((datum, index) => (
            <PortfolioCard
              key={datum._id}
              onImageClick={() => this._onPortfolioCardClick(index)}
              cardData={datum}
            />
          ))}
        </div>
        {portfolioIndex !== undefined && (
          <HtmlParser htmlData={[portfolioData[portfolioIndex]]} />
        )}
      </div>
    );
  }
}

export default Home;
