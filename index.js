import program from 'commander';
import genDiff from './src/genDiff';

program
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);

export default genDiff;
