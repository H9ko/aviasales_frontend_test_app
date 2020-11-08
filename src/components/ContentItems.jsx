import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ContentItems.module.css';
import Flight from './Flight';

const ContentItem = ({ ticket }) => (
  <div className={styles.item}>
    <div className={styles.header}>
      <div className={styles.price}>
        {`${new Intl.NumberFormat('ru-RU').format(ticket.price)} Р`}
      </div>
      <div className={styles.logo}>
        <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="logo" />
      </div>
    </div>
    <div>
      <Flight key={0} flight={ticket.segments[0]} />
      <Flight key={1} flight={ticket.segments[1]} />
    </div>
  </div>
);

const ContentItems = () => {
  const tickets = useSelector((state) => state.tickets.currentDisplayTickets);
  console.log(tickets);
  return (
    <div className={styles.group__items}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {tickets.map((ticket, index) => <ContentItem key={`${ticket.price}${index}`} ticket={ticket} />)}
    </div>
  );
};

export default ContentItems;
