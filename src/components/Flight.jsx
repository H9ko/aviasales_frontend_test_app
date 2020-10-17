import React from 'react';
import css from './Flight.module.css';

const Flight = () => (
  <div className={css.row}>
    <div className={css.column}>
      <div className={css.title}>MOW-NKT</div>
      <div className={css.content}>10:45 - 13:45</div>
    </div>
    <div className={css.column}>
      <div className={css.title}>В ПУТИ</div>
      <div className={css.content}>21ч 15м</div>
    </div>
    <div className={css.column}>
      <div className={css.title}>2 ПЕРЕСАДКИ</div>
      <div className={css.content}>HKJ,JNB</div>
    </div>
  </div>
);

export default Flight;
