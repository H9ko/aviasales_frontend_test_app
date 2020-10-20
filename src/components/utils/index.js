import * as R from 'ramda';
// eslint-disable-next-line import/prefer-default-export
export const logR = (msg) => R.tap((x) => console.log(`${msg}`, x));
export const logImmer = (msg, state) => console.log(msg, JSON.stringify(state, null, 2));
