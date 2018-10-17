import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';

import '../styles/HtmlParser.scss';
import { fileDataShape } from '../utils/propTypesShapes';

const converter = new showdown.Converter();

const HtmlParser = ({ location: { state } }) => (
  <div
    className="App-HtmlParser"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: converter.makeHtml(state.markdownTexts)
    }}
  />
);

HtmlParser.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.shape(fileDataShape)
  }).isRequired
};

export default HtmlParser;
