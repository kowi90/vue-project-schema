#!/usr/bin/env node

var lib = require('../lib/index.js');

const argv = require('yargs')
    .usage('Usage: $0 --json <json_to_parse> --supress <true|false>')
    .alias('j', 'json')
    .nargs('j', 1)
    .describe('j', 'The JSON Schema to parse')
    .demandOption(['j'])
    .alias('s', 'supress')
    .nargs('s', 1)
    .describe('s', 'Supress process messages.')
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright Gergo Kovacs 2018')
    .argv


lib.convertJSON(argv.j,process.cwd(), argv.s);
