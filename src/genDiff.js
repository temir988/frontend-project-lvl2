// @ts-check

import fs from 'fs';
import _ from 'lodash';

/**
 * @param {String} filepath
 * @return {Object}
 */
const getData = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

/**
 * @param {String} filepath1
 * @return {String}
 */
const genDiff = (filepath1, filepath2) => {
  let result = '{';
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = [...keys1, ...keys2].sort();
  const uniqKeys = new Set(keys);

  uniqKeys.forEach((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        result += `\n    ${key}: ${data1[key]}`;
      } else {
        result += `\n  - ${key}: ${data1[key]}`;
        result += `\n  + ${key}: ${data2[key]}`;
      }
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      result += `\n  - ${key}: ${data1[key]}`;
    } else if (!_.has(data1, key) && _.has(data2, key)) {
      result += `\n  + ${key}: ${data2[key]}`;
    }
  });

  return `${result} \n}`;
};

export default genDiff;
