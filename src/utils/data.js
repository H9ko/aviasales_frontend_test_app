/* eslint-disable import/prefer-default-export */
export const conditions = {
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
};
