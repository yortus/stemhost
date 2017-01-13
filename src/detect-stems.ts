import * as path from 'path';
import * as glob from 'glob';
import {error} from './util';
import StemInfo from './stem-info';





/**
 * Searches for STEMs under the given `appPath` and returns metadata about them.
 * STEMs are sought within the node_modules directory under `appPath` (at any
 * depth). A node module `mod` is a STEM iff `mod/stem` resolves to a module.
 */
export default function detectStems(appPath: string) {

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

    // TODO: doc...
    let stemPackages = stemPaths.map(stemPath => require(path.join(stemPath, 'package.json')));
    let stemNames = stemPackages.map(pkg => pkg.name);

    // TODO: gather more info...
    let stems = stemPackages.map((pkg, i) => {

        // NB: STEM dependencies must be in 'dependencies' (i.e. not peer, dev, or optional)
        let requires = Object.keys(pkg.dependencies || {}).filter(dep => stemNames.indexOf(dep) !== -1);

        // TODO: ...
        let stem = <StemInfo> {
            name: pkg.name,
            version: pkg.version,
            path: stemPaths[i],
            package: pkg,
            requires,
            requiredBy: null as any
        };
        return stem;
    });

    // TODO: ...
    stems.forEach(stem => {
        stem.requiredBy = stems.filter(p => p.requires.indexOf(stem.name) !== -1).map(p => p.name);
    });

    // Exit early if no STEMs found.
    if (stems.length === 0) {
        error(`No STEMs found. The directory ${appPath} does not appear to contain a STEM-based app.`);
    }

    // All done. Return the stem list.
    return stems;
}
