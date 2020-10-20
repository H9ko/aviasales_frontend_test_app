import React from 'react';
import { useSelector } from 'react-redux';
import * as R from 'ramda';
import ContentItem from './ContentItem';
import styles from './ContentItems.module.css';

const durationFlight = R.pipe(
  R.prop('segments'),
  R.map(R.prop('duration')),
  R.sum,
);

const sorts = {
  cheapest: [R.ascend(R.prop('price'))],
  quickest: [R.ascend(durationFlight),
  ],
};
const ContentItems = () => {
  const tickets = useSelector((state) => state.tickets.slice(0, 5));
  const checkBoxs = useSelector((state) => state.displayConditions.checkBoxs);
  const sort = useSelector((state) => state.displayConditions.sort);

  const isChecked = R.propEq('checked', true);
  const createConditions = (transfers) => (ticket) => {
    const mathInFirst = R.includes(ticket.segments[0].stops.length, transfers);
    const matchInSecond = R.includes(ticket.segments[1].stops.length, transfers);
    const matchDefaultMax = R.includes(999, transfers);
    return (mathInFirst && matchInSecond) || matchDefaultMax;
  };

  const getConditions = R.pipe(
    R.filter(isChecked),
    R.pluck('countTransfer'),
    createConditions,
  );
  const filteredTickets = R.filter(getConditions(checkBoxs), tickets);

  const sortedTickets = R.sortWith(sorts[sort], filteredTickets);

  return (
    <div className={styles.group__items}>
      {sortedTickets.map((ticket) => <ContentItem key={ticket.toString()} ticket={ticket} />)}
    </div>
  );
};

export default ContentItems;
