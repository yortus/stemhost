import * as fs from 'fs';
import * as path from 'path';





/**
 * Returns the names of all STEMs found in the given application directory. STEMs may be
 * located at the top-level under either 'node_modules' or 'stem_sources', or under both.
 */
export default function getStemNames(appPath: string) {

    // Identify all STEM sources found. These are located by convention at the top-level under <appPath>/stem_sources.
    let stemSourcesPath = path.join(appPath, 'stem_sources');
    let fromStemSources = fs.existsSync(stemSourcesPath) ? fs.readdirSync(stemSourcesPath) : [];

    // Identify all stem modules found. These are top-level node modules that have a resolveable '<name>/stem' module.
    let nodeModulesPath = path.join(appPath, 'node_modules');
    let fromNodeModules = fs.existsSync(nodeModulesPath) ? fs.readdirSync(nodeModulesPath) : [];
    fromNodeModules = fromNodeModules.filter(name => {
        try {
            if (name === '.bin') return false; // TODO: unfortunate corner case... there is a .bin/stem. Tidy this up somehow?
            require.resolve(path.join(appPath, 'node_modules', name, 'stem'));
            return true;
        }
        catch (ex) {
            return false;
        }
        
    });

    // Merge the two lists and return the sorted result.
    let stemNames = fromStemSources.reduce(
        (stemNames, name) => {
            if (stemNames.indexOf(name) === -1) {
                stemNames.push(name);
            }
            return stemNames;
        },
        fromNodeModules.slice()
    );
    stemNames.sort();
    return stemNames;
}
