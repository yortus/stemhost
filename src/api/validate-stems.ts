import * as path from 'path';
import * as glob from 'glob';
import * as semver from 'semver';
import {StemInfoWithDeps} from './stem-info';





/** Ensure all detected STEMs pass validation checks. */
export default function validateStems(appPath: string, stems: StemInfoWithDeps[]) {

    // Ensure every STEM is found at the top-level within node_modules. This is a
    // conservative requirement that simplifies subsequent code. It could be relaxed later.
    let nonTopStems = findNonTopLevelStemModules(appPath);
    if (nonTopStems.length > 0) {
        throw new Error(`STEMs must be installed at the top-level of node_modules. Non-top-level STEMs found at ${nonTopStems}`);
    }

    // Ensure all STEM-dependencies are resolveable and match the semver requirement of all their dependers.
    stems.forEach(stem => {
        stem.requires!.forEach(depName => {

            let reqVersion = stem.package.dependencies[depName];
            let dep = stems.find(stem => stem.name === depName);

            // TODO: this *should* additionally check that the dependency can be require()d from the stem's location
            if (!dep) {
                throw new Error(`STEM '${stem.name}': cannot resolve dependency '${depName}'. STEM not found.`);
            }

            if (!semver.satisfies(dep.version, reqVersion)) {
                throw new Error(`STEM '${stem.name}': cannot resolve dependency '${depName}'. Version mismatch (required: ${reqVersion}, actual: ${dep.version}).`);
            }
        });
    });
}





// TODO: find and report errors for any STEMs found under node_modules *below* the top-level...
function findNonTopLevelStemModules(appPath: string) {
    let modulePaths = glob.sync(path.join(appPath, 'node_modules/**/node_modules/*/package.json')).map(p => p.slice(0, -12));
    modulePaths = modulePaths.filter(modulePath => {
        try {
            require.resolve(path.join(modulePath, 'stem'));
            return true;
        }
        catch (err) {
            return false;
        }
    });
    return modulePaths;
}
