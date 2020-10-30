import {
  ascend, filter, includes, map, pipe, pluck, prop, propEq, sortWith, sum,
} from 'ramda';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ContentItems.module.css';
import Flight from './Flight';

const durationFlights = pipe(
  prop('segments'),
  map(prop('duration')),
  sum,
);
const isChecked = propEq('checked', true);

const createConditions = (transfers) => (ticket) => {
  const [flightTo, flightBack] = ticket.segments;
  const matсhWithTo = includes(flightTo.stops.length, transfers);
  const matchWithBack = includes(flightBack.stops.length, transfers);
  const matchWithAll = includes('all', transfers);
  return (matсhWithTo && matchWithBack) || matchWithAll;
};

const getConditions = pipe(
  filter(isChecked),
  pluck('numberTransfers'),
  createConditions,
);

const sorts = {
  cheapest: [ascend(prop('price'))],
  quickest: [ascend(durationFlights),
  ],
};

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
  const tickets = useSelector((state) => state.tickets.data.slice(0, 5));
  const transfers = useSelector((state) => state.conditions.transfers);
  const sort = useSelector((state) => state.conditions.sort);

  const filteredTickets = filter(getConditions(transfers), tickets);
  const sortedTickets = sortWith(sorts[sort], filteredTickets);

  return (
    <div className={styles.group__items}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {sortedTickets.map((ticket, index) => <ContentItem key={`${ticket.price}${index}`} ticket={ticket} />)}
    </div>
  );
};

export default ContentItems;
