/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slices';
import styles from './CheckBox.module.css';

const CheckBox = ({ name }) => {
  const { checked, text } = useSelector((state) => state.filters.checkBoxs
    .find((el) => el.name === name));
  const dispatch = useDispatch();
  const handleChange = (e) => {
    console.log('handleChange -> e.target', e.target);
    dispatch(actions.changeCheckBox({ name: e.target.name, checked: e.target.checked }));
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
