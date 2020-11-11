import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices';
import styles from './Pagination.module.css';
import { selectPagesTickets } from '../slices/tickets';

const Pagination = () => {
  const pages = useSelector(selectPagesTickets);
  console.log('Pagination -> pages', pages);
  const currentPage = useSelector((state) => state.tickets.currentPage);
  const dispatch = useDispatch();
  const gethandleClick = (pageSymbol) => {
    switch (true) {
      case pageSymbol === '<<':
        return () => {
          dispatch(actions.setCurentPage(currentPage - 2));
        };
      case pageSymbol === '>>':
        return () => {
          dispatch(actions.setCurentPage(currentPage + 2));
        };
      case typeof pageSymbol === 'number':
        return () => {
          dispatch(actions.setCurentPage(pageSymbol));
        };
      default:
        console.log('error: undefined pageSymbol: ', pageSymbol);
    }
  };

  return (
    <ul className={styles.pagination}>
      {pages.map((page) => {
        const className = cn(`x-reset-button ${styles.page_link}`, {
          [`${styles.active}`]: page === currentPage,
        });
        return (
          <li key={page} className={styles.page_item}>
            <button type="button" className={className} onClick={gethandleClick(page)}>{page}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
