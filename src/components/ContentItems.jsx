import React from 'react';
import { useSelector } from 'react-redux';
import * as R from 'ramda';
import ContentItem from './ContentItem';
import styles from './ContentItems.module.css';

const ContentItems = () => {
  const tickets = useSelector((state) => state.tickets);
  const checkBoxs = useSelector((state) => state.filters.checkBoxs);
  const testTickets = tickets.slice(0, 5);
  const isChecked = R.propEq('checked', true);
  const createCondition = (el) => (ticket) => (el.length
    === ticket.segments[0].stops.length && el.length
    === ticket.segments[1].stops.length) || el.length === 999;
  const getUnionCondition = R.pipe(
    R.filter(isChecked),
    R.map(createCondition),
    R.anyPass(),
  );
  const filteredTickets = R.filter(getUnionCondition(checkBoxs), testTickets);

  return (
    <div className={styles.group__items}>
      {filteredTickets.map((ticket) => <ContentItem key={ticket.toString()} ticket={ticket} />)}
    </div>
  );
};

export default ContentItems;
