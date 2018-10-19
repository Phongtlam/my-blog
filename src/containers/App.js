import React from 'react';

import SideBar from './SideBar';
import Main from './Main';
import { fetchAll } from '../utils/fetch';
import Modal from '../components/Modal';

import '../styles/App.scss';

const INITIAL_MODAL_DATA = {
  isOpen: false,
  message: '',
  confirmText: 'Confirm',
  rejectText: 'Cancel',
  callback: null,
  type: 'primary'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: [],
      blogData: [],
      modalData: INITIAL_MODAL_DATA
    };
    this._setHtml = this._setHtml.bind(this);
    this._loadModalData = this._loadModalData.bind(this);
  }

  componentDidMount() {
    Promise.all([fetchAll('portfolio'), fetchAll('post')]).then(
      responseArray => {
        this.setState({
          portfolioData: responseArray[0].sort((a, b) => a.order < b.order),
          blogData: responseArray[1]
        });
      }
    );
  }

  _loadModalData({ callback, cancelCallback, ...otherProps }) {
    this.setState({
      modalData: {
        ...INITIAL_MODAL_DATA,
        isOpen: true,
        resolver: () =>
          Promise.resolve(callback()).then(res => {
            this.setState(prevState => ({
              modalData: INITIAL_MODAL_DATA,
              portfolioData: res.portfolio
                ? prevState.portfolioData.filter(el => el._id !== res._id)
                : prevState.portfolioData,
              blogData: res.blog
                ? prevState.blogData.filter(el => el._id !== res._id)
                : prevState.blogData
            }));
          }),
        rejecter: () => {
          if (cancelCallback) {
            cancelCallback();
          }
          this.setState({
            modalData: INITIAL_MODAL_DATA
          });
        },
        ...otherProps
      }
    });
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
        ].sort((a, b) => a.order < b.order)
      }));
    } else {
      this.setState(prevState => ({
        [htmlType]: prevState[htmlType]
          .concat(htmlsData)
          .sort((a, b) => a.order < b.order)
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <Modal modalData={this.state.modalData} />
        <SideBar className="App-sidebar-container" />
        <Main
          className="App-content-container"
          setHtml={this._setHtml}
          portfolioData={this.state.portfolioData}
          blogData={this.state.blogData}
          loadModalData={this._loadModalData}
        />
      </div>
    );
  }
}

export default App;
