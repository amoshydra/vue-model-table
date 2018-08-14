const example = require('./example.json');
const MAX_TIMEOUT = 3000;
const P_BIAS = 32;

const getItem = ({ perPage, offset }) => {
  const timeout = Math.max(
    10,
    Math.pow(Math.random(), P_BIAS) * MAX_TIMEOUT
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(example.slice(offset, perPage));
    }, timeout);
  });
};

module.exports = {
  get: getItem,
};