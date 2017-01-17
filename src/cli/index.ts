import * as program from 'commander';
import * as api from '../api';
import asciiLogo from './asciiLogo';
import {info, error} from '../util';





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

        if (name === 'start') {
            asciiLogo.split('\n').forEach(line => info(line));
        }

        try {
            // Execute the command with the appropriate arguments.
            info('STEM ' + nameUpper + ': STARTING....');
            await (api as any)[name].apply(api, args);
            info('STEM ' + nameUpper + ': COMPLETED.');
        }
        catch (err) {
            // If an error occurs, report it and terminate the process.
            error('STEM ' + nameUpper + ': FAILED.');
            error(err.toString());
            error(err.stack);
            process.exit(1);
        }
    };
    return runner;
}
