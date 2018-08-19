const example = require('./example.json');
const MAX_TIMEOUT = 3000;
const P_BIAS = 32;

const mockServerRequest = (handler) => {
  const timeout = Math.max(
    10,
    Math.pow(Math.random(), P_BIAS) * MAX_TIMEOUT
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(handler());
    }, timeout);
  });
}

module.exports = {
  get: ({ perPage, offset }) => mockServerRequest(
    () => ({
      data: example.slice(offset, offset + perPage),
    })
  ),
  count: () => mockServerRequest(
    () => ({
      data: example.length,
    })
  ),
};
