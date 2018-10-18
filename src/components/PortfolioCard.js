import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';

import '../styles/PortfolioCard.scss';
import ButtonIcon from './ButtonIcon';
import { fileDataShape } from '../utils/propTypesShapes';
import history from '../utils/history';

const converter = new showdown.Converter();

const _onImageClick = (projectTitle, projectData) => {
  history.push(`/Home/${projectTitle.split(' ').join('')}`, { ...projectData });
};

const _onEdit = (projectTitle, projectData) => {
  history.push(`/Home/${projectTitle.split(' ').join('')}/edit`, {
    ...projectData
  });
};

const PortfolioCard = ({
  onOpenMarkDownEdit,
  cardData,
  cardData: { coverImgUrl, title, markdownTexts }
}) => (
  <div className="App-PortfolioCard">
    <div
      className="App-PortfolioCard-image-container"
      role="button"
      onClick={() => {
        _onImageClick(title, cardData);
      }}
      onKeyDown={() => {
        _onImageClick(title, cardData);
      }}
      tabIndex={0}
    >
      <img className="image" src={coverImgUrl} alt="cover" />
      <ButtonIcon
        callback={() => {}}
        className="button-overlay"
        iconName="fas fa-expand-arrows-alt"
        iconSize="5x"
        type="borderless"
      />
    </div>
    <div className="content">
      <ButtonIcon
        className="action-button"
        callback={() => {
          onOpenMarkDownEdit();
          _onEdit(title, cardData);
        }}
        iconName="fas fa-edit"
        type="borderless"
      />
      <ButtonIcon
        className="action-button"
        callback={() => {
          // _routeToProject(title, cardData);
        }}
        iconName="fas fa-trash-alt"
        type="borderless-danger"
      />
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
  cardData: PropTypes.shape(fileDataShape),
  onOpenMarkDownEdit: PropTypes.func
};

PortfolioCard.defaultProps = {
  cardData: {},
  onOpenMarkDownEdit: PropTypes.func
};

export default PortfolioCard;
