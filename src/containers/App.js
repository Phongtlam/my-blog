import React, { Component } from 'react';
import { fetchAllPosts } from '../utils/fetch';
import MarkDownFrom from '../components/MarkDownForm';

import '../styles/App.scss';
import BlogBody from '../components/BlogBody';

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
        <MarkDownFrom setBlogBody={this._setBlogBody} />
        <BlogBody blogHtml={this.state.blogHtml} />
      </div>
    );
  }
}

export default App;
