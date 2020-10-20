import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reducers, { asyncActions } from './slices';

const app = () => {
  const preloadedState = {
  };

  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
  const { dispatch } = store;
  dispatch(asyncActions.getTickets());
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};
app();
