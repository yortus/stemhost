import * as path from 'path';
import * as semver from 'semver';
import {error} from './util';
import StemInfo from './stem-info';





/** Ensure all detected STEMs pass validation checks. */
export default function validateStems(appPath: string, stems: StemInfo[]) {

    // Ensure every STEM is a singleton with no duplicates.
    let counts = stems.reduce(
        (counts, stem) => {
            counts[stem.name] = (counts[stem.name] || 0) + 1;
            return counts;
        },
        {} as {[name: string]: number}
    );
    let duplicateNames = Object.keys(counts).filter(name => counts[name] > 1);
    if (duplicateNames.length > 0) {
        error(`Duplicate STEM name(s) detected: ${duplicateNames.join(', ')}`);
    }

    // Ensure every STEM is found at the top-level within node_modules. This is a conservative
    // requirement that simplifies subsequent code. It could be relaxed later.
    stems.forEach(stem => {
        let actual = path.join(stem.path, 'stem');
        let expected = path.join(appPath, 'node_modules', stem.name, 'stem');
        if (actual !== expected) error(`STEM '${stem.name}': must be at the top-level in node_modules, but was found at ${stem.path}.`);
    });

    // Ensure all STEM-dependencies are resolveable and match the semver requirement of all their dependers.
    stems.forEach(stem => {
        stem.requires.forEach(depName => {

            let reqVersion = stem.package.dependencies[depName];
            let dep = stems.find(stem => stem.name === depName);

            // TODO: this *should* additionally check that the dependency can be require()d from the stem's location
            if (!dep) {
                error(`STEM '${stem.name}': cannot resolve dependency '${depName}'. STEM not found.`);
                return; // redundant, but satisfies TypeScript's CFA
            }

            if (!semver.satisfies(dep.version, reqVersion)) {
                error(`STEM '${stem.name}': cannot resolve dependency '${depName}'. Version mismatch (required: ${reqVersion}, actual: ${dep.version}).`);
            }
        });
    });
}
