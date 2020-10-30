import { combineReducers } from '@reduxjs/toolkit';

import tickets, { actions as ticketsActions, asyncActions as ticketsAsyncActions } from './tickets';
import conditions, { actions as conditionsActions } from './conditions';

export default combineReducers({
  tickets,
  conditions,
});

const actions = {
  ...ticketsActions,
  ...conditionsActions,
};

const asyncActions = {
  ...ticketsAsyncActions,
};

export {
  actions,
  asyncActions,
};
