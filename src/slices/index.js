import { combineReducers } from '@reduxjs/toolkit';

import tickets, { actions as ticketsActions, getTickets } from './tickets';
import displayConditions, { actions as displayConditionsActions } from './displayConditions';
// import channels, { actions as channelsActions, asyncActions as channelsAsyncActions } from './channels';
// import modals, { actions as modalsActions } from './modals';

export default combineReducers({
  tickets,
  displayConditions,
  // channels,
  // modals,
});

const actions = {
  ...ticketsActions,
  ...displayConditionsActions,
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
