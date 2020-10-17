import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../assets/logo.svg';
import CheckBox from './CheckBox';
import ButtonGroup from './ButtonGroup';
import ContentItems from './ContentItems';

function App() {
  const checkBoxs = useSelector((state) => state.filters.checkBoxs);
  return (
    <div className="page">
      <div className="header">
        <Logo />
      </div>
      <div className="main">
        <div className="main__aside">
          <div className="main__title">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
          {checkBoxs.map(({ name }) => <CheckBox key={name} name={name} />)}
        </div>
        <div className="main__content">
          <ButtonGroup />
          <ContentItems />
        </div>
      </div>
    </div>
  );
}

export default App;
