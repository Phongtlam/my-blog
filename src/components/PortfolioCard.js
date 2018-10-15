import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';

import '../styles/PortfolioCard.scss';
import ButtonIcon from './ButtonIcon';

const converter = new showdown.Converter();

const PortfolioCard = ({
  onImageClick,
  cardData: { coverImgUrl, title, markdownTexts }
}) => (
  <div className="App-PortfolioCard">
    <div
      className="App-PortfolioCard-image-container"
      role="button"
      onClick={onImageClick}
      onKeyDown={onImageClick}
      tabIndex={0}
    >
      <img className="image" src={coverImgUrl} alt="cover" />
      <ButtonIcon
        callback={onImageClick}
        className="button-overlay"
        iconName="fas fa-expand-arrows-alt"
        iconSize="5x"
      />
    </div>
    <div className="content">
      <h3>{title}</h3>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(markdownTexts.split('<!--more-->')[0])
        }}
      />
    </div>
  </div>
);

PortfolioCard.propTypes = {
  onImageClick: PropTypes.func,
  cardData: PropTypes.shape({
    coverImgUrl: PropTypes.string,
    markdownTexts: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    _id: PropTypes.string,
    __v: PropTypes.number
  })
};

PortfolioCard.defaultProps = {
  onImageClick: PropTypes.func,
  cardData: {}
};

export default PortfolioCard;
