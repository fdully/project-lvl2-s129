import program from 'commander';
import generateDifference from './genDiff';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) =>
    console.log(generateDifference(firstConfig, secondConfig, program.format)));

program.parse(process.argv);

export default program;
