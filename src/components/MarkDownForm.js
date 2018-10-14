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
      markDownDisplay: ''
    };

    this._onChange = this._onChange.bind(this);
    this._stagePost = this._stagePost.bind(this);
    this._publishPost = this._publishPost.bind(this);
    this._cancelStagePost = this._cancelStagePost.bind(this);
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
        this.setState({
          markDownDisplay: res.message
        });
      }
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
          <span className="text-display">{this.state.markDownDisplay}</span>
        </div>
        <textarea
          onChange={this._onChange}
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
