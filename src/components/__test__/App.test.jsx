import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from '../../slices';
import App from '../App';
import CheckBox from '../CheckBox';

test('renders learn react link', () => {
  const reducer = combineReducers(reducers);
  const preloadedState = {
      conditions: {
        transfers: [{
          text: '3 пересадки',
          name: '3transfer',
          checked: false,
          numberTransfers: 3,
        }],
      },
  };
  const store = configureStore({
    reducer: reducers,
    preloadedState,
  });

  render(<Provider store={store}><CheckBox  name={'3transfer'}/></Provider>);
});
