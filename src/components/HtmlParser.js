import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';

import '../styles/HtmlParser.scss';

const converter = new showdown.Converter();

const HtmlParser = props => (
  <ul className="App-blog-body">
    {props.htmlStrings.map(htmlString => (
      <li
        className="single-blog"
        key={htmlString.date}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(htmlString.markdownTexts)
        }}
      />
    ))}
  </ul>
);

HtmlParser.propTypes = {
  htmlStrings: PropTypes.arrayOf(PropTypes.object)
};

HtmlParser.defaultProps = {
  htmlStrings: []
};

export default HtmlParser;
