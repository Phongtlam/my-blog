import React, { Component } from 'react';
import { fetchAllPosts } from '../utils/fetch';
import MarkDownForm from '../components/MarkDownForm';

import BlogBody from '../components/BlogBody';
import SideBar from '../components/SideBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogHtml: []
    };
    this._setBlogBody = this._setBlogBody.bind(this);
  }

  componentDidMount() {
    fetchAllPosts().then(response => {
      this._setBlogBody(response);
    });
  }

  _setBlogBody(html) {
    this.setState(prevState => ({ blogHtml: prevState.blogHtml.concat(html) }));
  }

  render() {
    return (
      <div className="App">
        <SideBar className="App-sidebar-container" />
        <div className="App-content-container">
          <MarkDownForm setBlogBody={this._setBlogBody} />
          <BlogBody blogHtml={this.state.blogHtml} />
        </div>
      </div>
    );
  }
}

export default App;
