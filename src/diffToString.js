const statusSymbols = {
  unmodified: ' ',
  added: '+',
  removed: '-',
};

/**
 * @param {Object}
 * @return {String}
 */
const diffToString = (diff) => {
  const result = diff.reduce((acc, { key, value, status }) => {
    const newAcc = `${acc}
  ${statusSymbols[status]} ${key}: ${value}`;
    return newAcc;
  }, '');
  return `{${result}\n}`;
};

export default diffToString;
