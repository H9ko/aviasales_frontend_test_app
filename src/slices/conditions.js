/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { assoc } from 'ramda';

const slice = createSlice({
  name: 'conditions',
  initialState: {
    transfers: [
      {
        id: 1,
        text: 'Все',
        name: 'all',
        checked: true,
        numberTransfers: 'all',
      },
      {
        id: 2,
        text: 'Без пересадок',
        name: 'none',
        checked: false,
        numberTransfers: 0,
      },
      {
        id: 3,
        text: '1 пересадка',
        name: '1transfer',
        checked: false,
        numberTransfers: 1,
      },
      {
        id: 4,
        text: '2 пересадки',
        name: '2transfer',
        checked: false,
        numberTransfers: 2,
      },
      {
        id: 5,
        text: '3 пересадки',
        name: '3transfer',
        checked: false,
        numberTransfers: 3,
      },
    ],
    sort: 'cheapest',
  },
  reducers: {
    setChecked(state, { payload: { name, checked } }) {
      const curentBox = state.transfers.find((el) => el.name === name);
      curentBox.checked = checked;
    },
    setSort(state, { payload }) {
      const updatedState = assoc('sort', payload, state);
      return updatedState;
    },
  },
});

// export const asyncActions = { getSearhId: getTickets };
export const { actions } = slice;
export default slice.reducer;
