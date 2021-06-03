import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let result;
const fixturesPath = `${__dirname}/../__fixtures__`;

beforeAll(() => {
  result = fs.readFileSync(`${fixturesPath}/result1.txt`, 'utf-8');
});

describe('Testing gendiff', () => {
  test('Basic 1 level json', () => {
    const filepath1 = `${fixturesPath}/file1.json`;
    const filepath2 = `${fixturesPath}/file2.json`;

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });

  test('Basic 1 level yaml', () => {
    const filepath1 = `${fixturesPath}/file1.yaml`;
    const filepath2 = `${fixturesPath}/file2.yaml`;

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });
});
