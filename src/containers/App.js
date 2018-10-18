import React from 'react';

import SideBar from './SideBar';
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

  _setHtml(type, htmlsData, editMode = false) {
    const htmlType = type === 'portfolio' ? 'portfolioData' : 'blogData';
    if (editMode) {
      const indexToReplace = this.state[htmlType].findIndex(
        el => el._id === htmlsData._id
      );
      this.setState(prevState => ({
        [htmlType]: [
          ...prevState[htmlType].slice(0, indexToReplace),
          htmlsData,
          ...prevState[htmlType].slice(indexToReplace + 1)
        ]
      }));
    } else {
      this.setState(prevState => ({
        [htmlType]: prevState[htmlType].concat(htmlsData)
      }));
    }
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
