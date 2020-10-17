import React from 'react';
import Flight from './Flight';
import css from './ContentItems.module.css';
import { ReactComponent as Logo } from '../assets/logo.svg';

const ContentItem = () => (
  <div className={css.item}>
    <div className={css.header}>
      <div className={css.price}> 13 400 Р</div>
      <div className={css.logo}>
        <Logo />
        Airlines
      </div>
    </div>
    <div>
      <Flight />
      <Flight />
    </div>
  </div>
);

export default ContentItem;
