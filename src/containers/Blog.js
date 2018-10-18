import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MarkDownForm from '../components/MarkDownForm';

import '../styles/Blog.scss';
import ButtonIcon from '../components/ButtonIcon';
import HtmlParser from '../components/HtmlParser';

class Blog extends React.Component {
  static propTypes = {
    blogData: PropTypes.arrayOf(PropTypes.object),
    setHtml: PropTypes.func
  };

  static defaultProps = {
    blogData: [],
    setHtml: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      openMarkDownForm: false
    };
    this._onToggleMarkDownForm = this._onToggleMarkDownForm.bind(this);
  }

  _onToggleMarkDownForm(isOpen) {
    this.setState({ openMarkDownForm: isOpen });
  }

  render() {
    return (
      <div className="App-Blog">
        <ButtonIcon
          className={classnames('create-new-blog-btn', {
            hidden: this.state.openMarkDownForm
          })}
          buttonType="primary"
          callback={() => this._onToggleMarkDownForm(true)}
          iconName="fas fa-plus"
        >
          Create
        </ButtonIcon>
        <div
          className={classnames('App-MarkDownForm-container', {
            hidden: !this.state.openMarkDownForm
          })}
        >
          <MarkDownForm
            onToggleMarkDownForm={this._onToggleMarkDownForm}
            setHtmlBody={this.props.setHtml}
            type="post"
          />
        </div>
        {/* <HtmlParser htmlStrings={this.props.blogData} /> */}
      </div>
    );
  }
}

export default Blog;
