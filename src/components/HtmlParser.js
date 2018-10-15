import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import classnames from 'classnames';

import '../styles/HtmlParser.scss';

const converter = new showdown.Converter();

const HtmlParser = props => (
  <ul className={classnames('App-blog-body', props.className)}>
    {props.htmlData.map(htmlDatum => (
      <li
        className="single-blog"
        key={htmlDatum.date}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(htmlDatum.markdownTexts)
        }}
      />
    ))}
  </ul>
);

HtmlParser.propTypes = {
  className: PropTypes.string,
  htmlData: PropTypes.arrayOf(PropTypes.object)
};

HtmlParser.defaultProps = {
  className: undefined,
  htmlData: []
};

export default HtmlParser;
