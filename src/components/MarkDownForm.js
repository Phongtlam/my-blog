import React from 'react';
import PropTypes from 'prop-types';
import { stagePost, publishPost } from '../utils/fetch';

class MarkDownFrom extends React.Component {
  static propTypes = {
    setBlogBody: PropTypes.func
  };

  static defaultProps = {
    setBlogBody: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      markDownInput: ''
    };

    this._onChange = this._onChange.bind(this);
    this._stagePost = this._stagePost.bind(this);
    this._publishPost = this._publishPost.bind(this);
  }

  _onChange(e) {
    this.setState({ markDownInput: e.target.value });
  }

  _stagePost() {
    if (this.state.markDownInput.length === 0) {
      return;
    }
    stagePost({
      date: new Date(),
      markdownTexts: this.state.markDownInput
    })
      .then(() => {
        this.setState({ markDownInput: '' });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  _publishPost() {
    publishPost({ data: 'publish' }).then(res => {
      if (res.blogPost) {
        this.props.setBlogBody(res.blogPost);
      }
    });
  }

  render() {
    return (
      <div className="App-markdown-form">
        <textarea
          onChange={this._onChange}
          value={this.state.markDownInput}
          className="text-area"
        />
        <button type="button" onClick={this._stagePost}>
          Stage Post
        </button>
        <button type="button" onClick={this._publishPost}>
          Publish Post
        </button>
      </div>
    );
  }
}

export default MarkDownFrom;
