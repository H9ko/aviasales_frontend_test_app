const host = 'https://cors-anywhere.herokuapp.com';
// const host = 'http://localhost:3050/';
const url = 'https://front-test.beta.aviasales.ru/';
export default {
  searchIdPath: () => [host, url, 'search'].join('/'),
  ticketsPath: (id) => [host, url, `tickets?searchId=${id}`].join('/'),
  // channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
