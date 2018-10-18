import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import classnames from 'classnames';

import '../styles/HtmlParser.scss';
import { fileDataShape } from '../utils/propTypesShapes';

const converter = new showdown.Converter();

const HtmlParser = ({ className, location: { state } }) => (
  <div
    className={classnames('App-HtmlParser', className)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: converter.makeHtml(state.markdownTexts)
    }}
  />
);

HtmlParser.propTypes = {
  className: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.shape(fileDataShape)
  }).isRequired
};

HtmlParser.defaultProps = {
  className: null
};

export default HtmlParser;
