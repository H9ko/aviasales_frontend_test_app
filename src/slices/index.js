import { combineReducers } from '@reduxjs/toolkit';

import tickets, { actions as ticketsActions, getTickets } from './tickets';
import filters, { actions as filtersActions } from './filters';
// import channels, { actions as channelsActions, asyncActions as channelsAsyncActions } from './channels';
// import modals, { actions as modalsActions } from './modals';

export default combineReducers({
  tickets,
  filters,
  // channels,
  // modals,
});

const actions = {
  ...ticketsActions,
  ...filtersActions,
  // ...channelsActions,
  // ...modalsActions,
};

const asyncActions = {
  getTickets,
  // ...channelsAsyncActions,
};

export {
  actions,
  asyncActions,
};
