import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { stageFile, publishFile } from '../utils/fetch';
import '../styles/MarkDownForm.scss';
import ButtonIcon from './ButtonIcon';

class MarkDownForm extends React.Component {
  static propTypes = {
    setHtmlBody: PropTypes.func,
    onToggleMarkDownForm: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(['portfolio', 'post'])
  };

  static defaultProps = {
    setHtmlBody: PropTypes.func,
    onToggleMarkDownForm: PropTypes.func,
    className: null,
    type: 'portfolio'
  };

  constructor(props) {
    super(props);
    this.state = {
      markDownInput: '',
      markDownDisplay: '',
      markDownTitle: '',
      coverImgUrl: '',
      isLargeSize: false
    };

    this._onChangeInput = this._onChangeInput.bind(this);
    this._onStagingFile = this._onStagingFile.bind(this);
    this._onPublish = this._onPublish.bind(this);
    this._onCancelStaging = this._onCancelStaging.bind(this);
    this._onToggleFormSize = this._onToggleFormSize.bind(this);
  }

  _onChangeInput(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  _onStagingFile() {
    const { markDownInput, markDownTitle, coverImgUrl } = this.state;
    if (
      markDownInput.length === 0 ||
      markDownTitle.length === 0 ||
      coverImgUrl.length === 0
    ) {
      this.setState({
        markDownDisplay:
          markDownInput.length === 0
            ? 'There is nothing to stage'
            : `Missing ${markDownTitle.length === 0 ? 'title' : 'image cover'}`
      });
      return;
    }
    stageFile(
      {
        date: new Date(),
        markdownTexts: markDownInput,
        title: markDownTitle,
        coverImgUrl
      },
      this.props.type
    )
      .then(res => {
        this.setState({
          markDownInput: '',
          markDownDisplay: res.message,
          markDownTitle: '',
          coverImgUrl: ''
        });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  _onPublish() {
    publishFile({ data: 'publish' }, this.props.type).then(res => {
      if (res.blogPost) {
        this.props.setHtmlBody(this.props.type, res.blogPost);
      }
      this.setState({
        markDownDisplay: res.message,
        markDownInput: '',
        markDownTitle: '',
        coverImgUrl: ''
      });
      this.props.onToggleMarkDownForm();
    });
  }

  _onCancelStaging() {
    stageFile({
      cancel: 'cancel staging'
    }).then(res => {
      this.setState({
        markDownDisplay: res.message
      });
    });
  }

  _onToggleFormSize() {
    this.setState(prevState => ({ isLargeSize: !prevState.isLargeSize }));
  }

  render() {
    return (
      <div
        className={classnames('App-MarkDownForm', this.props.className, {
          'small-size': this.state.isLargeSize
        })}
      >
        <div className="header">
          <ButtonIcon
            className="markdownform-btn"
            callback={this.props.onToggleMarkDownForm}
            iconName="fas fa-times"
            iconSize="2x"
          />
          <ButtonIcon
            className="markdownform-btn"
            callback={this._onToggleFormSize}
            iconName={
              this.state.isLargeSize
                ? 'fas fa-expand'
                : 'fas fa-window-minimize'
            }
            iconSize="2x"
          />
          <input
            onChange={e => this._onChangeInput(e, 'markDownTitle')}
            value={this.state.markDownTitle}
            className="header-input"
            placeholder="Title goes here"
          />
          <input
            onChange={e => this._onChangeInput(e, 'coverImgUrl')}
            value={this.state.coverImgUrl}
            className="header-input"
            placeholder="Cover Img url"
          />
          <span className="text-display">{this.state.markDownDisplay}</span>
        </div>
        <textarea
          placeholder="Markdown body"
          onChange={e => this._onChangeInput(e, 'markDownInput')}
          value={this.state.markDownInput}
          className="text-area"
        />
        <div className="button-group">
          <div className="left">
            <ButtonIcon
              className="staging-btn"
              callback={this._onStagingFile}
              iconName="fas fa-file-upload"
            >
              Stage Post
            </ButtonIcon>
            <ButtonIcon callback={this._onPublish} iconName="fas fa-save">
              Publish Post
            </ButtonIcon>
          </div>
          <ButtonIcon
            callback={this._onCancelStaging}
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
