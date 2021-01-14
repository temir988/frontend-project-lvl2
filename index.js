import program from 'commander';
import genDiff from './src/genDiff.js';

program
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);

console.log(`format: ${program.format}`);

export default genDiff;
