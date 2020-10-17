import React from 'react';
import css from './ButtonGroup.module.css';

const ButtonGroup = () => (
  <div className={css.btn_group}>
    <div className={css.btn}>САМЫЙ ДЕШЕВЫЙ</div>
    <div className={css.btn}>САМЫЙ БЫСТРЫЙ</div>
  </div>
);

export default ButtonGroup;
