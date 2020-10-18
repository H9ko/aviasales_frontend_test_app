/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'filters',
  initialState: {
    checkBoxs: [
      {
        text: 'Все',
        name: 'all',
        checked: true,
        countTransfer: 999,
      },
      {
        text: 'Без пересадок',
        name: 'none',
        checked: false,
        countTransfer: 0,
      },
      {
        text: '1 пересадка',
        name: '1transfer',
        checked: false,
        countTransfer: 1,
      },
      {
        text: '2 пересадки',
        name: '2transfer',
        checked: false,
        countTransfer: 2,
      },
      {
        text: '3 пересадки',
        name: '3transfer',
        checked: false,
        countTransfer: 3,
      },
    ],
  },
  reducers: {
    changeCheckBox: {
      reducer: (state, action) => {
        const curentBox = state.checkBoxs.find((el) => el.name === action.payload.name);
        curentBox.checked = action.payload.checked;
      },
      prepare: (payload) => ({ payload }),
    },
  },
});

// export const asyncActions = { getSearhId: getTickets };
export const { actions } = slice;
export default slice.reducer;
