/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styles from './CheckBox.module.css';

const CheckBox = ({ name, text }) => {
  const [checked, setChecked] = useState(false);
  return (
      <label className={styles.check}>
        <input className={styles.check__input} type="checkbox" name={name} />
        <span className={styles.check__box} />
        <span className={styles.check__text}>{text}</span>
      </label>
  );
};

export default CheckBox;
