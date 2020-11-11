/* eslint-disable no-param-reassign */
import {
  createSlice, createAsyncThunk, createEntityAdapter, createSelector,
} from '@reduxjs/toolkit';
import Axios from 'axios';
import {
  filter, sortWith,
} from 'ramda';
import {
  getConditions, getPages, sorts,
} from '../utils';
import { conditions } from '../utils/data';
import routes from '../routes';

const ticketsAdapter = createEntityAdapter({});

export const getTickets = createAsyncThunk(
  'getTickets',
  async () => {
    const { data: { searchId } } = await Axios.get(routes.searchIdPath());
    const getPartTickets = () => Axios.get(routes.ticketsPath(searchId));

    const iter = async (end, acc) => {
      if (end) {
        return acc;
      }
      try {
        const { data: { tickets, stop } } = await getPartTickets();
        console.log('iter -> tickets', tickets);
        // return iter(stop, [...acc, ...tickets]); загрузка всего списка
        return tickets;
      } catch (error) {
        console.log('iter -> error', error);
        return iter(false, acc);
      }
    };

    try {
      const tickets = await iter(false, []);
      const ticketsWithId = tickets.map((ticket, index) => ({ ...ticket, id: index }));
      return ticketsWithId;
    } catch (error) {
      return error;
    }
  },

);

const slice = createSlice({
  name: 'tickets',
  initialState: ticketsAdapter.getInitialState({
    currentPage: 1,
    itemsPerPage: 10,
    loading: false,
    conditions,
  }),
  reducers: {
    setCurentPage(state, { payload }) {
      const page = payload;
      return {
        ...state,
        currentPage: page,
      };
    },
    setSortTickets(state, { payload }) {
      const sort = payload;
      state.conditions.sort = sort;
    },
    setChecked(state, { payload: { name, checked } }) {
      const transfers = (name === 'all')
        ? state.conditions.transfers.map((el) => ({ ...el, checked }))
        : state.conditions.transfers.map((el) => {
          if (el.name === 'all') {
            return { ...el, checked: false };
          }
          if (el.name === name) {
            return { ...el, checked };
          }
          return el;
        });
      const result = {
        ...state,
        conditions: {
          ...state.conditions,
          transfers,
        },
      };
      return result;
    },
  },
  extraReducers: {
    [getTickets.pending]: (state) => ({ ...state, loading: true }),
    [getTickets.fulfilled]: (state, { payload }) => {
      ticketsAdapter.setAll(state, payload);
      state.loading = false;
    },
  },
});
export const selectSortTickets = (state) => state.tickets.conditions.sort;
export const selectTransfersTickets = (state) => state.tickets.conditions.transfers;
export const selectLoadingTickets = (state) => state.tickets.loading;
export const selectItemsPerPage = (state) => state.tickets.itemsPerPage;
export const selectCurrentPage = (state) => state.tickets.currentPage;

export const {
  selectById: selectTicketsById,
  selectIds: selectTicketsIds,
  selectEntities: selectTicketsEntities,
  selectAll: selectAllTickets,
  selectTotal: selectTotalTickets,
} = ticketsAdapter.getSelectors((state) => state.tickets);

export const selectFilteredSortedTickets = createSelector(
  selectAllTickets,
  selectSortTickets,
  selectTransfersTickets,
  (tickets, sort, transfers) => {
    const filteredTickets = filter(getConditions(transfers), tickets);
    const sortedTickets = sortWith(sorts[sort], filteredTickets);
    return sortedTickets;
  },
);

export const selectCurrentPageTickets = createSelector(
  selectFilteredSortedTickets,
  selectCurrentPage,
  selectItemsPerPage,
  (tickets, currentPage, itemsPerPage) => {
    const startId = currentPage * itemsPerPage - itemsPerPage;
    const endId = currentPage * itemsPerPage;
    const currentDisplayTickets = tickets.slice(startId, endId);
    return currentDisplayTickets;
  },
);
export const selectTotalPage = createSelector(
  selectFilteredSortedTickets,
  selectItemsPerPage,
  (filteredSortedTickets, itemsPerPage) => Math.ceil(filteredSortedTickets.length / itemsPerPage),
);

export const selectPagesTickets = createSelector(
  selectCurrentPage,
  selectTotalPage,
  (currentPage, totalPage) => getPages(currentPage, totalPage),
);
export const asyncActions = { getTickets };
export const { actions } = slice;
export default slice.reducer;
