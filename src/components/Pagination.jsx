import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices';
import styles from './Pagination.module.css';

const Pagination = () => {
  const pages = useSelector((state) => state.tickets.pages);
  const currentPage = useSelector((state) => state.tickets.currentPage);
  const dispatch = useDispatch();
  const gethandleClick = (pageSymbol) => {
    switch (true) {
      case pageSymbol === '<<':
        return () => {
          dispatch(actions.setCurentPage(currentPage - 2));
          dispatch(actions.updateDisplayTickets());
        };
      case pageSymbol === '>>':
        return () => {
          dispatch(actions.setCurentPage(currentPage + 2));
          dispatch(actions.updateDisplayTickets());
        };
      case typeof pageSymbol === 'number':
        return () => {
          dispatch(actions.setCurentPage(pageSymbol));
          dispatch(actions.updateDisplayTickets());
        };
      default:
        console.log('error: undefined pageSymbol: ', pageSymbol);
    }
  };

  return (
    <ul className={styles.pagination}>
      {pages.map((page) => {
        const d = '';
        const className = cn(`x-reset-button ${styles.page_link}`, {
          [`${styles.active}`]: page === currentPage,
        });
        return (
          <li className={styles.page_item}>
            <button type="button" className={className} onClick={gethandleClick(page)}>{page}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
