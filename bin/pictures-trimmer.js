#!/usr/bin/env node

const { program } = require('commander');
const { CLIHandler } = require('../lib/cli-handler');
const { ArgsParser } = require('./args-parser');
const {
  availableExtentions,
} = require('../lib/constants/available-extentions');

program
  .description('Trim pictures around a subject by color')
  .requiredOption('-c, --color <hex or rgb color>', 'Color to trim around')
  .option(
    '-i, --input <extention>',
    'Input pictures extention to trim in case of directory path, comma separated',
    availableExtentions
  )
  .option('-p, --path <path>', 'Path to the input file / directory', './')
  .option('-v, --verbose', 'Increase verbosity', false)
  .option(
    '-s, --saveas',
    'If false owerwrite current file, else create a copy',
    false
  )
  .option('-r, --range', 'Range to apply to the trim', 0);

program.parse();

const opts = program.opts();
var { color, input, path, range } = opts;

color = ArgsParser.parseColor(color);
input = ArgsParser.parseInput(input);
range = ArgsParser.parseRange(range);
ArgsParser.parsePath(path);

new CLIHandler(
  color,
  input,
  opts.path,
  opts.verbose,
  opts.saveas,
  range
).trimPictures();
