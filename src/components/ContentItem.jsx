import React from 'react';
import Flight from './Flight';
import css from './ContentItems.module.css';

const ContentItem = ({ ticket }) => (
  <div className={css.item}>
    <div className={css.header}>
      <div className={css.price}>
        {`${new Intl.NumberFormat('ru-RU').format(ticket.price)} Р`}
      </div>
      <div className={css.logo}>
        <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="logo" />
      </div>
    </div>
    <div>
      <Flight key={0} flight={ticket.segments[0]} />
      <Flight key={1} flight={ticket.segments[1]} />
    </div>
  </div>
);

export default ContentItem;
