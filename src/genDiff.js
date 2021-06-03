// @ts-check

import fs from 'fs';
import _ from 'lodash';
import path from 'path';

import { diffToString } from './diffToString.js';
import { parseFile } from './parsers.js';

/**
 * @param {String} filepath
 * @return {Object}
 */
const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');

/**
 * @param {String} filepath1
 * @return {String}
 */
const genDiff = (filepath1, filepath2) => {
  const ext = path.extname(filepath1).slice(1);

  const data1 = parseFile(ext, getFileData(filepath1));
  const data2 = parseFile(ext, getFileData(filepath2));

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = [...keys1, ...keys2].sort();
  const uniqKeys = new Set(keys);

  const diff = [];

  uniqKeys.forEach((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        diff.push({ key, value: data1[key], status: 'unmodified' });
      } else {
        diff.push({ key, value: data1[key], status: 'removed' });
        diff.push({ key, value: data2[key], status: 'added' });
      }
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      diff.push({ key, value: data1[key], status: 'removed' });
    } else if (!_.has(data1, key) && _.has(data2, key)) {
      diff.push({ key, value: data2[key], status: 'added' });
    }
  });

  const result = diffToString(diff);
  return result;
};

export default genDiff;
