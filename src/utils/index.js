import {
  ascend, filter, includes, tap, map, pipe, pluck, prop, propEq, sum, range,
} from 'ramda';
// eslint-disable-next-line import/prefer-default-export
export const logR = (msg) => tap((x) => console.log(`${msg}`, x));
export const logImmer = (msg, state) => console.log(msg, JSON.stringify(state, null, 2));
const durationFlights = pipe(
  prop('segments'),
  map(prop('duration')),
  sum,
);
const isChecked = propEq('checked', true);

const createConditions = (transfers) => (ticket) => {
  const [flightTo, flightBack] = ticket.segments;
  const matсhWithTo = includes(flightTo.stops.length, transfers);
  const matchWithBack = includes(flightBack.stops.length, transfers);
  const matchWithAll = includes('all', transfers);
  return (matсhWithTo && matchWithBack) || matchWithAll;
};

export const getConditions = pipe(
  filter(isChecked),
  pluck('numberTransfers'),
  createConditions,
);

export const sorts = {
  cheapest: [ascend(prop('price'))],
  quickest: [ascend(durationFlights),
  ],
};

const getRange = (begin, end) => range(begin, end + 1);
export const getPages = (currentPage, totalPage) => {
  const firstPage = 1;
  const lastPage = totalPage;
  const neighbours = 2;
  const maxAvaliblePages = neighbours * 2 + 1;
  if (totalPage < maxAvaliblePages) {
    return range(firstPage, totalPage + 1);
  }

  const isLeftVisible = (firstPage + neighbours) < currentPage;
  const isRightVisible = currentPage < (totalPage - neighbours);
  if (!isLeftVisible && isRightVisible) {
    return [...getRange(1, maxAvaliblePages), '>>', lastPage];
  }
  if (isLeftVisible && !isRightVisible) {
    return [firstPage, '<<', ...getRange(currentPage - neighbours, totalPage)];
  }
  return [firstPage, '<<', ...getRange(currentPage - neighbours, currentPage + neighbours), '>>', lastPage];
};
