/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import { actions } from '../slices';
import styles from './CheckBox.module.css';

const CheckBox = ({ name }) => {
  const checkBoxs = useSelector((state) => state.displayConditions.checkBoxs);
  const { checked, text } = R.find(R.propEq('name', name))(checkBoxs);
  const dispatch = useDispatch();
  const handleChange = (e) => {
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
