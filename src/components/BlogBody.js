import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';

const converter = new showdown.Converter();

const BlogBody = props => (
  <ul className="App-blog-body">
    {props.blogHtml.map(blog => (
      <li
        className="single-blog"
        key={blog.date}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(blog.markdownTexts)
        }}
      />
    ))}
  </ul>
);

BlogBody.propTypes = {
  blogHtml: PropTypes.arrayOf(PropTypes.object)
};

BlogBody.defaultProps = {
  blogHtml: []
};

export default BlogBody;
