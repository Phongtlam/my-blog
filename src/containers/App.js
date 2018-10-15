import React from 'react';

import SideBar from '../components/SideBar';
import Main from './Main';
import { fetchAll } from '../utils/fetch';

import '../styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: [],
      blogData: []
    };
    this._setHtml = this._setHtml.bind(this);
  }

  componentDidMount() {
    Promise.all([fetchAll('portfolio'), fetchAll('post')]).then(
      responseArray => {
        this.setState({
          portfolioData: responseArray[0],
          blogData: responseArray[1]
        });
      }
    );
  }

  _setHtml(type, htmls) {
    const htmlType = type === 'portfolio' ? 'portfolioData' : 'blogData';
    this.setState(prevState => ({
      [htmlType]: prevState[htmlType].concat(htmls)
    }));
  }

  render() {
    return (
      <div className="App">
        <SideBar className="App-sidebar-container" />
        <Main
          className="App-content-container"
          setHtml={this._setHtml}
          portfolioData={this.state.portfolioData}
          blogData={this.state.blogData}
        />
      </div>
    );
  }
}

export default App;
