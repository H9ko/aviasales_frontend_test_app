import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../assets/logo.svg';
import CheckBox from './CheckBox';
import ButtonGroup from './ButtonGroup';
import ContentItems from './ContentItems';
import { selectCurrentPageTickets, selectLoadingTickets, selectTransfersTickets } from '../slices/tickets';

function App() {
  const transfers = useSelector(selectTransfersTickets);
  console.log('App -> transfers', transfers);
  const loading = useSelector(selectLoadingTickets);
  const tickets = useSelector(selectCurrentPageTickets);
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
          {loading && (
          <div className="loader">
            <FontAwesomeIcon icon={faSpinner} size="6x" fixedWidth color="#2196F3" spin />
          </div>
          )}
          {!loading && tickets.length === 0
            ? <div className="x-text-centr"> По выбранным фильтрам совпадений нет</div>
            : <ContentItems tickets={tickets} />}
        </div>
      </div>
    </div>
  );
}

export default App;
