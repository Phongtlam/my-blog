import React from 'react';
import Particles from 'react-particles-js';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import '../styles/Home.scss';
import MarkDownForm from '../components/MarkDownForm';
import ButtonIcon from '../components/ButtonIcon';
import HtmlParser from '../components/HtmlParser';
import PortfolioCard from '../components/PortfolioCard';
import { fileDataShape } from '../utils/propTypesShapes';
import history from '../utils/history';

class Home extends React.Component {
  static propTypes = {
    portfolioData: PropTypes.arrayOf(PropTypes.shape(fileDataShape)),
    setHtml: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }).isRequired
  };

  static defaultProps = {
    portfolioData: [],
    setHtml: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpenMarkDownEdit: false
    };

    this._onOpenMarkDownEdit = this._onOpenMarkDownEdit.bind(this);
  }

  _onOpenMarkDownEdit(isOpen) {
    this.setState({ isOpenMarkDownEdit: isOpen });
  }

  render() {
    const { portfolioData, location } = this.props;
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
          className={classnames('header-btn', {
            hidden: location.pathname !== '/Home'
          })}
          buttonType="primary"
          callback={() => {
            history.push(`${location.pathname}/create`);
          }}
          iconName="fas fa-plus"
        >
          Create
        </ButtonIcon>
        <Switch>
          <Route
            path="/Home/create"
            render={routeProps => (
              <MarkDownForm
                buttonType="portfolio"
                {...routeProps}
                setHtmlBody={this.props.setHtml}
                onMarkDownFormClose={history.goBack}
              />
            )}
          />
          <Route
            path="/Home/:portfolio_id"
            render={routeProps => (
              <React.Fragment>
                <ButtonIcon
                  className={classnames('header-btn', {
                    hidden: this.state.isOpenMarkDownEdit
                  })}
                  callback={() => {
                    history.push(`${routeProps.location.pathname}/edit`, {
                      ...location.state
                    });
                    this._onOpenMarkDownEdit(true);
                  }}
                  buttonType="primary"
                  iconName="fas fa-edit"
                >
                  Edit
                </ButtonIcon>
                <ButtonIcon
                  className={classnames({
                    hidden: this.state.isOpenMarkDownEdit
                  })}
                  buttonType="primary"
                  callback={() => {
                    history.goBack();
                  }}
                  iconName="fas fa-chevron-left"
                >
                  Back
                </ButtonIcon>
                <MarkDownForm
                  className={classnames({
                    hidden: !this.state.isOpenMarkDownEdit
                  })}
                  type="portfolio"
                  action="edit"
                  setHtmlBody={this.props.setHtml}
                  onMarkDownFormClose={() => {
                    this._onOpenMarkDownEdit();
                    history.goBack();
                  }}
                  {...routeProps}
                />
                <HtmlParser {...routeProps} />
              </React.Fragment>
            )}
          />
        </Switch>
        <div
          className={classnames({
            hidden:
              location.pathname !== '/Home/create' &&
              location.pathname !== '/Home'
          })}
        >
          {portfolioData.map(datum => (
            <PortfolioCard
              key={datum._id}
              cardData={datum}
              onOpenMarkDownEdit={() => {
                this._onOpenMarkDownEdit(true);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
