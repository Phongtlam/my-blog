import React from 'react';
import PropTypes from 'prop-types';
import { stagePost, publishPost } from '../utils/fetch';
import '../styles/MarkDownForm.scss';
import ButtonIcon from './ButtonIcon';

class MarkDownForm extends React.Component {
  static propTypes = {
    setBlogBody: PropTypes.func,
    onToggleMarkDownForm: PropTypes.func
  };

  static defaultProps = {
    setBlogBody: PropTypes.func,
    onToggleMarkDownForm: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      markDownInput: '',
      markDownDisplay: '',
      blogTitle: ''
    };

    this._onChangeTextarea = this._onChangeTextarea.bind(this);
    this._onChangeTitle = this._onChangeTitle.bind(this);
    this._stagePost = this._stagePost.bind(this);
    this._publishPost = this._publishPost.bind(this);
    this._cancelStagePost = this._cancelStagePost.bind(this);
  }

  _onChangeTextarea(e) {
    this.setState({ markDownInput: e.target.value });
  }

  _onChangeTitle(e) {
    this.setState({ blogTitle: e.target.value });
  }

  _stagePost() {
    const { markDownInput, blogTitle } = this.state;
    if (markDownInput.length === 0 || blogTitle.length === 0) {
      this.setState({
        markDownDisplay:
          markDownInput.length === 0
            ? 'There is nothing to stage'
            : 'Missing title'
      });
      return;
    }
    stagePost({
      date: new Date(),
      markdownTexts: markDownInput,
      blogTitle
    })
      .then(res => {
        this.setState({
          markDownInput: '',
          markDownDisplay: res.message
        });
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
      this.setState({
        markDownDisplay: res.message
      });
    });
  }

  _cancelStagePost() {
    stagePost({
      cancel: 'cancel staging'
    }).then(res => {
      this.setState({
        markDownDisplay: res.message
      });
    });
  }

  render() {
    return (
      <div className="App-MarkDownForm">
        <div className="header">
          <ButtonIcon
            className="close-markdownform-btn"
            callback={this.props.onToggleMarkDownForm}
            iconName="fas fa-times"
            iconSize="2x"
          />
          <input
            onChange={this._onChangeTitle}
            value={this.state.blogTitle}
            className="title-input"
          />
          <span className="text-display">{this.state.markDownDisplay}</span>
        </div>
        <textarea
          onChange={this._onChangeTextarea}
          value={this.state.markDownInput}
          className="text-area"
        />
        <div className="button-group">
          <div className="left">
            <ButtonIcon
              className="staging-btn"
              callback={this._stagePost}
              iconName="fas fa-file-upload"
            >
              Stage Post
            </ButtonIcon>
            <ButtonIcon callback={this._publishPost} iconName="fas fa-save">
              Publish Post
            </ButtonIcon>
          </div>
          <ButtonIcon
            callback={this._cancelStagePost}
            iconName="fas fa-ban"
            type="danger"
          >
            Cancel Staging
          </ButtonIcon>
        </div>
      </div>
    );
  }
}

export default MarkDownForm;
