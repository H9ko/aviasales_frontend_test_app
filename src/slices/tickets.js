/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import routes from '../routes';

export const getTickets = createAsyncThunk(
  'getTickets',
  async () => {
    const { data: { searchId } } = await Axios.get(routes.searchIdPath());
    console.log(searchId);
    const getPartTickets = () => Axios.get(routes.ticketsPath(searchId));

    const iter = async (end, acc) => {
      console.log('iter -> acc', acc);
      if (end) {
        return acc;
      }
      try {
        const { data: { tickets, stop } } = await getPartTickets();
        // return iter(stop, [...acc, ...tickets]);
        return tickets;
      } catch (error) {
        // return iter(false, acc);
        return acc;
      }
    };

    try {
      const tickets = iter(false, []);
      return tickets;
    } catch (error) {
      return error;
    }
  },
);
const slice = createSlice({
  name: 'tickets',
  initialState: [],
  reducers: {
    addChannel(state, { payload: { data: { attributes } } }) {
      state.entities.push(attributes);
    },
  },
  extraReducers: {
    [getTickets.fulfilled]: (state, { payload }) => {
      return payload;
    },
  },
});

export const asyncActions = { getSearhId: getTickets };
export const { actions } = slice;
export default slice.reducer;
