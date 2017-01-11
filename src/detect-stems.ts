import * as path from 'path';
import * as glob from 'glob';
import {logger} from './util';
import StemInfo from './stem-info';





// TODO: should we really log inside this function? Pass in optional logger?





/** Return basic information about all detected STEMs. */
export default function detectStems(appPath: string) {

    logger.info('Searching for STEMs....');

// TODO: revise comment
    // Locate all the STEMs. Each direct subfolder of appPath which
    // contains a 'structable.json' file is considered to be a STEM.

    // TODO: note that this is over-strict, since a file like 'my-module.js' inside node_modules is also a valid module (no dir, no package.json)
    let allModulePaths = glob.sync(path.join(appPath, 'node_modules/**/package.json')).map(fn => fn.slice(0, -12));

    // TODO: doc...
    let stemPaths = allModulePaths.filter(modulePath => {
        try {
            require.resolve(path.join(modulePath, 'stem'));
            return true;
        }
        catch (ex) {
            return false;
        }
    });

    // TODO: gather more info...
    let stems = stemPaths.map(stemPath => {
        let pkg = require(path.join(stemPath, 'package.json'));
        let stem: StemInfo = {
            name: pkg.name,
            version: pkg.version,
            path: stemPath,
            package: pkg,
            dependencies: Object.keys(pkg.dependencies || {}) // TODO: what about devDeps, optDevs, peerDeps?
        };
        return stem;
    });

    // Exit early if no STEMs found.
    if (stems.length === 0) {
        logger.error('No STEMs found. The current working directory does not appear to be a structable app.');
    }

    // All done. Return the stem list.
    return stems;
}
