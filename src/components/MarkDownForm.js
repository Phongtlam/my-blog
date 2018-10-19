import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { stageFile, publishFile, editFile } from '../utils/fetch';
import '../styles/MarkDownForm.scss';
import ButtonIcon from './ButtonIcon';
import history from '../utils/history';
import { fileDataShape } from '../utils/propTypesShapes';

class MarkDownForm extends React.Component {
  static propTypes = {
    setHtmlBody: PropTypes.func,
    action: PropTypes.string,
    onMarkDownFormClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['portfolio', 'post']),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      state: PropTypes.shape(fileDataShape)
    }).isRequired
  };

  static defaultProps = {
    setHtmlBody: PropTypes.func,
    className: null,
    type: 'portfolio',
    action: null
  };

  constructor(props) {
    super(props);
    this.state = {
      markDownInput: '',
      markDownTitle: '',
      coverImgUrl: '',
      markDownDisplay: '',
      order: 0,
      isLargeSize: false,
      // eslint-disable-next-line react/no-unused-state
      internalKey: ''
    };

    this._onChangeInput = this._onChangeInput.bind(this);
    this._onStagingFile = this._onStagingFile.bind(this);
    this._onPublish = this._onPublish.bind(this);
    this._onCancelStaging = this._onCancelStaging.bind(this);
    this._onToggleFormSize = this._onToggleFormSize.bind(this);
    this._onResetMarkDownForm = this._onResetMarkDownForm.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.key !== state.internalKey &&
      props.location &&
      props.location.state
    ) {
      const { markdownTexts, title, coverImgUrl, order } = props.location.state;
      return {
        internalKey: props.key,
        markDownInput: markdownTexts,
        markDownTitle: title,
        coverImgUrl,
        order
      };
    }
    return null;
  }

  _onChangeInput(e, field) {
    const valueToSet = e.target.value;
    if (field === 'order') {
      const numValue = Number(valueToSet);
      this.setState({
        order: numValue
      });
    } else {
      this.setState({
        [field]: valueToSet
      });
    }
  }

  _onStagingFile() {
    const { markDownInput, markDownTitle, coverImgUrl, order } = this.state;
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
        coverImgUrl,
        order
      },
      this.props.type
    )
      .then(res => {
        this.setState({
          markDownDisplay: res.message
        });
        this._onResetMarkDownForm();
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  _onPublish() {
    const { markDownInput, markDownTitle, coverImgUrl, order } = this.state;
    let postAction = publishFile;
    let postBody = {};
    if (this.props.action === 'edit') {
      postAction = editFile;
      postBody = {
        _id: this.props.location.state._id,
        markdownTexts: markDownInput,
        title: markDownTitle,
        coverImgUrl,
        order
      };
    }
    postAction(postBody, this.props.type)
      .then(res => {
        if (res.portfolio) {
          this.props.setHtmlBody(
            this.props.type,
            res.portfolio,
            this.props.action === 'edit'
          );
        }
        this.setState({
          markDownDisplay: res.message
        });
        this._onResetMarkDownForm();
        history.goBack();
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
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

  _onResetMarkDownForm() {
    this.setState({
      markDownInput: '',
      markDownTitle: '',
      coverImgUrl: '',
      order: 0
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
            callback={() => {
              this.props.onMarkDownFormClose();
            }}
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
          <input
            onChange={e => this._onChangeInput(e, 'order')}
            value={this.state.order}
            type="number"
            className="header-input"
            placeholder="Order"
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
              className={classnames('staging-btn', {
                hidden: this.props.action === 'edit'
              })}
              callback={this._onStagingFile}
              iconName="fas fa-file-upload"
            >
              Stage Post
            </ButtonIcon>
            <ButtonIcon
              callback={this._onPublish}
              iconName={
                this.props.action === 'edit'
                  ? 'fas fa-save'
                  : 'fas fa-file-import'
              }
            >
              {this.props.action === 'edit' ? 'Save Edit' : 'Publish Post'}
            </ButtonIcon>
          </div>
          <ButtonIcon
            callback={this._onCancelStaging}
            iconName="fas fa-ban"
            buttonType="danger"
          >
            Cancel Staging
          </ButtonIcon>
        </div>
      </div>
    );
  }
}

export default MarkDownForm;
