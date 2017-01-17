import * as program from 'commander';
//import api = require('../api');
import asciiLogo from './asciiLogo';
import {info} from '../util';





// Get current version from package.json.
let version = require('../../package.json').version;


// Configure CLI using commander.
program
    .version(version)
    .description('STEM command line interface.')

program
    .command('start')
    .description('Run the application by loading all STEMs.')
    .action(makeAction('start'));

program
    .command('build')
    .description('Build all STEMs incrementally.')
    .action(makeAction('build'));

program
    .command('*')
    .description('')
    .action(cmd => console.log("Unknown command '" + cmd + "'"));


// Parse the command line, executing the appropriate action.
let ranAction = false;
program.parse(process.argv);
if (!ranAction) program.help();


// Helper function.
function makeAction(name: string) {
    let nameUpper = name.toUpperCase();
    let runner = async function (...args: any[]) {
        ranAction = true;
        if (nameUpper === 'START') asciiLogo.split('\n').forEach(line => info(line));
        // try {
        //     // Execute the command with the appropriate arguments.
        //     info('---------- ' + nameUpper + ': STARTING ----------');
        //     await  api[name].apply(api, args);
        //     info('---------- ' + nameUpper + ': COMPLETED ----------');
        // }
        // catch (err) {
        //     // If an error occurs, report it and terminate the process.
        //     error('---------- ' + nameUpper + ': FAILED ----------', true);
        //     error(err.toString(), true);
        //     error(err.stack, true);
        //     process.exit(1);
        // }
args//TODO: remove...
    };
    return runner;
}
