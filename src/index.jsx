import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './components/App';
import reducers, { actions, asyncActions } from './slices';

const app = () => {
  const preloadedState = {
  };

  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
  const { dispatch, getState } = store;
  store.subscribe(()=>{
    
  })
  dispatch(asyncActions.getTickets()).then(() => {
    dispatch(actions.setSortTickets(getState().tickets.conditions.sort));
    dispatch(actions.setCurentPage(1));
    dispatch(actions.updateDisplayTickets());
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};
app();
