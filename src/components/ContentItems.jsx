import React from 'react';
import ContentItem from './ContentItem';
import css from './ContentItems.module.css';

const ContentItems = () => (
  <div className={css.group__items}>
    <ContentItem />
    <ContentItem />
    <ContentItem />
  </div>
);

export default ContentItems;
