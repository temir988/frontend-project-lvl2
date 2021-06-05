import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let result;

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFileSync = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

beforeAll(() => {
  result = readFileSync('result1.txt');
});

describe('Testing gendiff', () => {
  test('Basic 1 level json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });

  test('Basic 1 level yaml', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });
});
