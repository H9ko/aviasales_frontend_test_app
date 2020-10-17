import React from 'react';
import './App.css';
import { ReactComponent as Logo } from '../assets/logo.svg';
import CheckBox from './CheckBox';
import ButtonGroup from './ButtonGroup';
import ContentItems from './ContentItems';

const transferOptions = [
  {
    text: 'Все',
    name: 'all',
  },
  {
    text: 'Без пересадок',
    name: 'none',
  },
  {
    text: '1 пересадка',
    name: '1transfer',
  },
  {
    text: '2 пересадки',
    name: '2transfer',
  },
  {
    text: '3 пересадки',
    name: '3transfer',
  },
];
function App() {
  return (
    <div className="page">
      <div className="header">
        <Logo />
      </div>
      <div className="main">
        <div className="main__aside">
          <div className="main__title">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
          {transferOptions.map(({ text, name }) => <CheckBox text={text} name={name} />)}
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
