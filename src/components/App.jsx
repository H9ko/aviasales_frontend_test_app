import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../assets/logo.svg';
import CheckBox from './CheckBox';
import ButtonGroup from './ButtonGroup';
import ContentItems from './ContentItems';
import Pagination from './Pagination';

function App() {
  const transfers = useSelector((state) => state.tickets.conditions.transfers);
  const loading = useSelector((state) => state.tickets.loading);

  return (
    <div className="page">
      <div className="header">
        <Logo />
      </div>
      <div className="main">
        <div className="main__aside">
          <div className="main__title">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
          {transfers.map(({
            id, name, checked, text,
          }) => (
            <CheckBox
              key={id}
              name={name}
              checked={checked}
              text={text}
            />
          ))}
        </div>
        <div className="main__content">
          <ButtonGroup />
          <Pagination />
          {loading && (
          <div className="loader">
            <FontAwesomeIcon icon={faSpinner} size="6x" fixedWidth color="#2196F3" spin />
          </div>
          )}
          <ContentItems />
        </div>
      </div>
    </div>
  );
}

export default App;
