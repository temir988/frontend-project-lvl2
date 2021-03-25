import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Testing gendiff', () => {
  test('Basic 1 lvl json', () => {
    const result = fs.readFileSync(
      `${__dirname}/../__fixtures__/result1.txt`,
      'utf-8'
    );

    const filepath1 = `${__dirname}/../__fixtures__/file1.json`;
    const filepath2 = `${__dirname}/../__fixtures__/file2.json`;

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });
});
