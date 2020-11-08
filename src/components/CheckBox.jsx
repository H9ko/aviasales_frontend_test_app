/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../slices';
import styles from './CheckBox.module.css';

const CheckBox = ({ name, checked, text }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(actions.setChecked({ name: e.target.name, checked: e.target.checked }));
    dispatch(actions.updateDisplayTickets());
  };
  return (
    <label className={styles.check}>
      <input className={styles.check__input} checked={checked} type="checkbox" onChange={handleChange} name={name} />
      <span className={styles.check__box} />
      <span className={styles.check__text}>{text}</span>
    </label>
  );
};

export default CheckBox;
