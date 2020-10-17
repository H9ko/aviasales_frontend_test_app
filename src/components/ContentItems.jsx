import React from 'react';
import { useSelector } from 'react-redux';
import ContentItem from './ContentItem';
import css from './ContentItems.module.css';

const ContentItems = () => {
  const tickets = useSelector((state) => state.tickets);
  const countTransfer = useSelector((state) => state.filters.checkBoxs
    .filter((checkBox) => checkBox.checked)
    .reduce((acc, { length }) => acc + length, 0));
  console.log('ContentItems -> countTransfer', countTransfer);
  const filteredTickets = tickets.filter((ticket) => ticket.segments[0].stops.length <= countTransfer
    && ticket.segments[1].stops.length <= countTransfer)
    .slice(0, 10);
  console.log('ContentItems -> filteredTickets', filteredTickets);
  return (
    <div className={css.group__items}>
      {filteredTickets.map((ticket) => <ContentItem ticket={ticket} />)}
    </div>
  );
};

export default ContentItems;
