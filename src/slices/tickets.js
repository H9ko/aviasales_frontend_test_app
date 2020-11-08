/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import Axios from 'axios';
import {
  filter, sortWith,
} from 'ramda';
import {
  getConditions, getPages, logImmer, sorts,
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
    currentDisplayTickets: [],
    currentPage: 1,
    pages: [],
    totalPage: 0,
    itemsPerPage: 10,
    loading: false,
    conditions,
  }),
  reducers: {
    updateDisplayTickets(state) {
      const {
        totalPage, itemsPerPage, entities, currentPage,
      } = state;
      const startId = currentPage * itemsPerPage - itemsPerPage;
      const endId = currentPage * itemsPerPage;
      const currentDisplayTicketsIds = state.ids.slice(startId, endId);
      const currentDisplayTickets = currentDisplayTicketsIds.map((id) => entities[id]);
      const pages = getPages(currentPage, totalPage);

      return {
        ...state,
        pages,
        currentDisplayTickets,
      };
    },
    setCurentPage(state, { payload }) {
      const page = payload;
      return {
        ...state,
        currentPage: page,
      };
    // ****** Тут после выполнения должна вызываться  dispatch(updateDisplayTickets())
    },

    // функция которая должна быть но приходится дублировать ее код внутри других
    // updateTickets(state, { payload }) {
    //   const {
    //     ids, entities, conditions: { transfers },
    //   } = state;
    //   const sort = payload;
    //   const tickets = ids.map((id) => entities[id]);
    //   const filteredTickets = filter(getConditions(transfers), tickets);
    //   const sortedTickets = sortWith(sorts[sort], filteredTickets);
    //   ticketsAdapter.setAll(state, sortedTickets);
    //   ******** после выполнения должна вызываться  dispatch(updateDisplayTickets())
    // },
    setSortTickets(state, { payload }) {
      const {
        ids, entities, conditions: { transfers },
      } = state;
      const sort = payload;
      const tickets = ids.map((id) => entities[id]);
      const filteredTickets = filter(getConditions(transfers), tickets);
      const sortedTickets = sortWith(sorts[sort], filteredTickets);
      ticketsAdapter.setAll(state, sortedTickets);
      // После сортировки весь массив данных обновлется в функции которая должна просто установить новый флаг сортировки
      // Хочу  после исполнения setSortTickets автоматом тригернуть dispatch(updateTickets())
      state.conditions.sort = sort;
    },
    setChecked(state, { payload: { name, checked } }) {
      const curentBox = state.conditions.transfers.find((el) => el.name === name);
      curentBox.checked = checked;
    },
  },
  extraReducers: {
    [getTickets.pending]: (state) => ({ ...state, loading: true }),
    [getTickets.fulfilled]: (state, { payload }) => {
      // Шаг 1 здесь я получил общий массив данных и мне нужно их записать.
      //  Но запишутся они неотсортированные. Это стация инициализации. Поэтому вызов происходит так
      // dispatch(asyncActions.getTickets()).then(() => {
      //   dispatch(actions.setSortTickets(getState().tickets.conditions.sort));
      //   dispatch(actions.setCurentPage(1));
      //   dispatch(actions.updateDisplayTickets());
      // });
      // Хочется  убрать вот этоу последовательность ручных вызывов

      ticketsAdapter.setAll(state, payload);
      state.totalPage = Math.ceil(payload.length / state.itemsPerPage);
      state.loading = false;
    },
  },
});

export const {
  selectById: selectTicketsById,
  selectIds: selectTicketsIds,
  selectEntities: selectTicketsEntities,
  selectAll: selectAllTickets,
  selectTotal: selectTotalTickets,
} = ticketsAdapter.getSelectors((state) => state.tickets);

export const asyncActions = { getTickets };
export const { actions } = slice;
export default slice.reducer;
