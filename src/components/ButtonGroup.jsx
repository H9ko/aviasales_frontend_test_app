import React from 'react';
import { useDispatch } from 'react-redux';
import css from './ButtonGroup.module.css';
import { asyncActions } from '../slices';

const ButtonGroup = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(asyncActions.getTickets());
  };
  return (
    <div className={css.btn_group}>
      <button type="button" className={css.btn} onClick={handleClick}>САМЫЙ ДЕШЕВЫЙ</button>
      <div className={css.btn}>САМЫЙ БЫСТРЫЙ</div>
    </div>
  );
};

export default ButtonGroup;
