import { combineReducers } from '@reduxjs/toolkit';

import tickets, { actions as ticketsActions, asyncActions as ticketsAsyncActions } from './tickets';

export default combineReducers({
  tickets,
});

const actions = {
  ...ticketsActions,
};

const asyncActions = {
  ...ticketsAsyncActions,
};

export {
  actions,
  asyncActions,
};
