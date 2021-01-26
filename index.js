import program from 'commander';
import genDiff from './src/genDiff.js';

const run = () => {
  program
    .version('0.0.2')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      const res = genDiff(filepath1, filepath2);
      console.log(res);
    });

  program.parse(process.argv);
};

export default run;
