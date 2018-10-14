import React from 'react';

import BlogBody from '../components/BlogBody';
import MarkDownForm from '../components/MarkDownForm';
import { fetchAllPosts } from '../utils/fetch';

import '../styles/Blog.scss';
import ButtonIcon from '../components/ButtonIcon';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogHtml: [],
      openMarkDownForm: false
    };
    this._setBlogBody = this._setBlogBody.bind(this);
    this._onToggleMarkDownForm = this._onToggleMarkDownForm.bind(this);
  }

  componentDidMount() {
    this._checkInitialPosts();
  }

  _checkInitialPosts() {
    if (this.state.blogHtml.length === 0) {
      fetchAllPosts().then(response => {
        this._setBlogBody(response);
      });
    }
  }

  _setBlogBody(html) {
    this.setState(prevState => ({ blogHtml: prevState.blogHtml.concat(html) }));
  }

  _onToggleMarkDownForm(isOpen) {
    this.setState({ openMarkDownForm: isOpen });
  }

  render() {
    return (
      <div className="App-Blog">
        <ButtonIcon
          className="create-new-blog-btn"
          type="primary"
          callback={() => this._onToggleMarkDownForm(true)}
          iconName="fas fa-plus"
        >
          Create
        </ButtonIcon>
        {this.state.openMarkDownForm ? (
          <div className="App-MarkDownForm-container" draggable>
            <MarkDownForm
              onToggleMarkDownForm={this._onToggleMarkDownForm}
              setBlogBody={this._setBlogBody}
            />
          </div>
        ) : null}
        <BlogBody blogHtml={this.state.blogHtml} />
      </div>
    );
  }
}

export default Blog;